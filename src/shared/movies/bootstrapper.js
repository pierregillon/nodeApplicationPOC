(function(require, module){
    'use strict';
    module.exports = Bootstrapper;

    var angioc = require('angioc');

    function Bootstrapper(){
        var self = this;

        self.boot = function(){
            registerSingleton('movieApp', require('./movieApp.jsx'), ['movieActions', 'movieList']);
            registerSingleton('movieList', require('./movieList.jsx'), ['movieStore']);
            registerSingleton('movieStore', require('./movieStore'), ['movieActions', 'movieDataService']);
            registerSingleton('movieDataService', require('./movieDataService'), []);
            registerSingleton('movieActions', require('./movieActions'), []);
        };

        function registerSingleton(name, func, dependencyNames){
            angioc.register(name, func).asClass().asSingleton().withDependencies(dependencyNames);
        }
    }

}(require, module));