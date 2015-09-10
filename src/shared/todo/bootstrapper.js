(function(require, module){
    'use strict';
    module.exports = Bootstrapper;

    var angioc = require('angioc');

    function Bootstrapper(){
        var self = this;

        self.boot = function(){
            registerSingleton('todoActions', require('./todoActions'), ['dispatcher', 'todoDataService']);
            registerSingleton('todoAdd', require('./components/todoAdd.react.jsx'), ['todoActions', 'todoStore']);
            registerSingleton('todoApp', require('./components/todoApp.jsx'), ['todoActions', 'todoList', 'todoAdd']);
            registerSingleton('todoList', require('./components/todoList.react.jsx'), ['todoItem', 'todoStore', 'todoActions']);
            registerSingleton('todoItem', require('./components/todoItem.react.jsx'), ['todoStore']);
            registerSingleton('todoStore', require('./todoStore'), ['dispatcher']);
            registerSingleton('todoDataService', require('./todoDataService'), []);
        };

        function registerSingleton(name, func, dependencyNames){
            angioc.register(name, func).asClass().asSingleton().withDependencies(dependencyNames);
        }
    }

}(require, module));