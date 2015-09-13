(function(require, module){
    'use strict';
    module.exports = Bootstrapper;

    var angioc = require('angioc');

    function Bootstrapper(){
        var self = this;

        self.boot = function(params){
            registerSingleton('movieApp', require('./movieApp.jsx'), ['movieActions', 'movieList']);
            registerSingleton('movieList', require('./movieList.jsx'), ['movieStore', 'movieItem']);
            registerSingleton('movieItem', require('./movieItem.jsx'), []);
            registerSingleton('movieStore', require('./movieStore'), ['movieActions', 'movieDataService']);
            registerSingleton('movieActions', require('./movieActions'), []);

            if(params.mode == 'SERVER'){ // In server mode we register directly the api and not the data service.
                registerSingleton('movieDataService', require('./moviesApi'), []);
            }
            else {
                registerSingleton('movieDataService', require('./movieDataService'), []);
            }
        };

        function registerSingleton(name, func, dependencyNames){
            angioc.register(name, func).asClass().asSingleton().withDependencies(dependencyNames);
        }
    }

}(require, module));