from lymph.core.monitoring.global_metrics import RUsageMetrics, GeventMetrics, GarbageCollectionMetrics


class Aggregator(object):

    def __init__(self, *getters, **tags):
        self._metrics_getters = [
            RUsageMetrics(),
            GarbageCollectionMetrics(),
            GeventMetrics(),
        ] + list(getters)
        self._tags = tags

    @classmethod
    def from_config(cls, config):
        tags = config.get_raw('tags', {})
        return cls(**tags)

    def add(self, getter):
        self._metrics_getters.append(getter)

    def add_tags(self, **tags):
        self._tags.update(tags)

    def get_metrics(self):
        for getter in self._metrics_getters:
            for metrics in getter():
                for name, value, tags in metrics:
                    tags.update(self._tags)
                    yield name, value, tags
