(function(window){
    'use strict';

    function Ioc(){
        var self = this;
        var registry = {};

        self.registerClass = function(dependencyName, value){
            if(registry.hasOwnProperty(dependencyName)){
                throw new Error('The dependency "' + dependencyName +'" is already registered.');
            }
            if(typeof value !== 'function'){
                throw new Error('"registerClass" should only take function to register.');
            }
            registry[dependencyName] = {constructor: value, instance: undefined};
        };
        self.registerInstance = function(name, value){
            if(registry.hasOwnProperty(name)){
                throw new Error('The dependency "' + name +'" is already registered.');
            }
            if(typeof value !== 'object'){
                throw new Error('"registerInstance" should only take object to register.');
            }
            registry[name] = {constructor: undefined, instance: value};
        };

        self.resolve = function(dependencyNames, callback){
            var dependencies = [];
            dependencyNames.forEach(function(dependencyName){
               dependencies.push(self.getInstance(dependencyName));
            });
            callback.apply(this, dependencies);
        };
        self.getInstance = function(dependencyName){
            var dependencyInformation = registry[dependencyName];
            if(dependencyInformation === undefined){
                throw new Error('Unknown dependency "'+dependencyName+'".');
            }
            if(!dependencyInformation.instance){
                dependencyInformation.instance = createInstance(dependencyInformation.constructor);
            }
            return dependencyInformation.instance;
        };
        self.getClass = function(className){
            var dependencyInformation = registry[className];
            if(dependencyInformation === undefined){
                throw new Error('Unknown class name "'+className+'".');
            }
            return dependencyInformation.constructor;
        };
        self.classes = function(a, b){
            if(typeof a === 'function'){
                var classNames = getParamNames(a);
                getClasses(classNames, a);
            }
            else{
                getClasses(a, b);
            }
        };
        self.instances = function(a, b){
            if(typeof a === 'function'){
                var classNames = getParamNames(a);
                self.resolve(classNames, a);
            }
            else{
                self.resolve(a, b);
            }
        };

        // ----- Internal logic

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        function getParamNames(func) {
            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
            if(result === null)
                result = [];
            return result;
        }

        function getClasses(classNames, callback){
            var classes = [];
            classNames.forEach(function(className){
                classes.push(self.getClass(className));
            });
            callback.apply(this, classes);
        }

        function createInstance(constructor){
            var dependencies = [];
            if(constructor.$dependencies){
                constructor.$dependencies.forEach(function(dependencyName){
                    dependencies.push(self.getInstance(dependencyName));
                });
            }
            dependencies.forEach(function(dep){
                constructor = constructor.bind(this, dep);
            });
            return new constructor();
        }
    }

    window.iocClass = Ioc;
    window.ioc = new Ioc();
}(window));