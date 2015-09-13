(function(require, module){
    'use strict';
    module.exports = Bootstrapper;

    var angioc = require('angioc');

    var TodoBootstrapper = require('./todo/bootstrapper');
    var MoviesBootstrapper = require('./movies/bootstrapper');

    function Bootstrapper(){
        var self = this;
        var todoBootrapper = new TodoBootstrapper();
        var moviesBootstrapper = new MoviesBootstrapper();

        self.boot = function(params){
            todoBootrapper.boot(params);
            moviesBootstrapper.boot(params);
            registerCommons();
        };

        function registerCommons(){
            registerSingleton('dispatcher', require('./dispatcher'), []);
            registerSingleton('about',  require('./components/about.react.jsx'), []);
            registerSingleton('header', require('./components/header.react.jsx'), []);
            registerSingleton('routes', require('./components/routes.react.jsx'), ['template', 'todoApp', 'about', 'movieApp']);
            registerSingleton('siteMap', require('./components/siteMap.react.jsx'), []);
            registerSingleton('template', require('./components/template.react.jsx'), ['siteMap', 'header']);
        }

        function registerSingleton(name, func, dependencyNames){
            angioc.register(name, func).asClass().asSingleton().withDependencies(dependencyNames);
        }
    }

}(require, module));