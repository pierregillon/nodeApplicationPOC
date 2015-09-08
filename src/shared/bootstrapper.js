(function(require, module){
    'use strict';
    module.exports = Bootstrapper;

    var angioc = require('angioc');

    function Bootstrapper(){
        var self = this;

        self.boot = function(){
            registerSingleton('todoActions', require('./actions/todoActions'), ['dispatcher', 'todoDataService']);
            registerSingleton('about',  require('./components/about.react.jsx'), []);
            registerSingleton('header', require('./components/header.react.jsx'), []);
            registerSingleton('routes', require('./components/routes.react.jsx'), ['template', 'todoApp', 'about']);
            registerSingleton('siteMap', require('./components/siteMap.react.jsx'), []);
            registerSingleton('template', require('./components/template.react.jsx'), ['siteMap', 'header']);
            registerSingleton('todoAdd', require('./components/todoAdd.react.jsx'), ['todoActions']);
            registerSingleton('todoApp', require('./components/todoApp.jsx'), ['todoList', 'todoAdd']);
            registerSingleton('todoList', require('./components/todoList.react.jsx'), ['todoItem', 'todoStore', 'todoActions']);
            registerSingleton('todoItem', require('./components/todoItem.react.jsx'), []);
            registerSingleton('todoStore', require('./stores/todoStore'), ['dispatcher']);
            registerSingleton('dispatcher', require('./dispatcher'), []);
            registerSingleton('todoDataService', require('./services/todoDataService'), []);
        };

        function registerSingleton(name, func, dependencyNames){
            angioc.register(name, func).asClass().asSingleton().withDependencies(dependencyNames);
        }
    }

}(require, module));