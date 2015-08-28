(function(ioc) {
    'use strict';

    ioc.registerSingleton('EventPublisher', EventPublisher);

    function EventPublisher() {
        var self = this;

        self.eventRegistry = {};

        return {
            publish: publish,
            on: on
        };

        function publish(event) {
            self.eventRegistry[event.name].forEach(function (callback) {
                callback(event);
            });
        }

        function on(eventName, action) {
            if (self.eventRegistry[eventName] === undefined) {
                self.eventRegistry[eventName] = [];
            }
            self.eventRegistry[eventName].push(action);
        }
    }
})(ioc);