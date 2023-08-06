import copy
import datetime

import fedmsg.meta
import fedmsg.consumers
import statscache.utils

import logging
log = logging.getLogger("fedmsg")

class StatsConsumer(fedmsg.consumers.FedmsgConsumer):
    """
    This consumer class propagates copies of incoming messages to the producers
    to cache for later processing.
    """
    topic = '*'
    config_key = 'statscache.consumer.enabled'

    def __init__(self, *args, **kwargs):
        """ Instantiate the consumer and a default list of buckets """
        log.debug("statscache consumer initializing")
        super(StatsConsumer, self).__init__(*args, **kwargs)
        # From now on, incoming messages will be queued. The backlog of
        # fedmsg traffic that was missed while offline therefore extends
        # from some unknown point(s) in the past until now.
        end_backlog = datetime.datetime.now()

        fedmsg.meta.make_processors(**self.hub.config)

        # Instantiate plugins
        self.plugins = statscache.utils.init_plugins(self.hub.config)
        log.info("instantiated plugins: " +
            ', '.join([plugin.ident for plugin in self.plugins]))

        # Create any absent database tables (were new plugins installed?)
        uri = self.hub.config['statscache.sqlalchemy.uri']
        statscache.utils.create_tables(uri)
        session = statscache.utils.init_model(uri)

        # Read configuration values
        epoch = self.hub.config['statscache.consumer.epoch']
        profile = self.hub.config['statscache.datagrepper.profile']

        # Compute pairs of plugins and the point up to which they are accurate
        plugins_by_age = []
        for (age, plugin) in sorted([
                                        (plugin.latest(session) or epoch,
                                         plugin)
                                        for plugin in self.plugins
                                    ],
                                    key=lambda (age, _): age):
            if len(plugins_by_age) > 0 and plugins_by_age[-1][0] == age:
                plugins_by_age[-1][1].append(plugin)
            else:
                plugins_by_age.append((age, [plugin]))

        # Retroactively process missed fedmsg traffic
        # Using the pairs of plugins and associated age, query datagrepper for
        # missing fedmsg traffic for each interval starting on the age of one
        # set of plugins and ending on the age of the next set of plugins.
        # This way, we can generate the least necessary amount of network
        # traffic without reverting all plugins back to the oldest age amongst
        # them (which would mean throwing away *all* data if a new plugin were
        # ever added).
        self.plugins = [] # readd as we enter period where data is needed
        plugins_by_age_iter = iter(plugins_by_age) # secondary iterator
        next(plugins_by_age_iter) # drop the first item, we don't need it
        for (start, plugins) in plugins_by_age:
            self.plugins.extend(plugins) # Reinsert plugins
            (stop, _) = next(plugins_by_age_iter, (end_backlog, None))
            log.info(
                "consuming historical fedmsg traffic from {} up to {}"
                .format(start, stop)
            )
            # Delete any partially completed rows, timestamped at start
            for plugin in self.plugins:
                plugin.revert(start, session)
            for messages in statscache.utils.datagrep(start,
                                                      stop,
                                                      profile=profile):
                for plugin in self.plugins:
                    for message in messages:
                        plugin.process(copy.deepcopy(message))
                    plugin.update(session)

        # Launch worker threads
        # Note that although these are intentionally not called until after
        # backprocessing, the reactor isn't even run until some time after this
        # method returns. Regardless, it is a desired behavior to not start the
        # worker threads until after backprocessing, as that phase is
        # computationally intensive. If the worker threads were running during
        # backprocessing, then there would almost certainly be high processor
        # (read: GIL) contention. Luckily, statscache tends to sit idle during
        # normal operation, so the worker threads will have a good opportunity
        # to catch up.
        for plugin in self.plugins:
            log.info("launching workers for {!r}".format(plugin.ident))
            plugin.launch(session)

        log.debug("statscache consumer initialized")

    def consume(self, raw_msg):
        """ Receive a message and enqueue it onto each bucket """
        topic, msg = raw_msg['topic'], raw_msg['body']
        log.info("Got message %r", topic)
        for plugin in self.plugins:
            plugin.process(copy.deepcopy(msg))

    def stop(self):
        log.info("Cleaning up StatsConsumer.")
        super(StatsConsumer, self).stop()
