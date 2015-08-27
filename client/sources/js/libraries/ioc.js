(function(window){
    'use strict';

    function Ioc(){
        var self = this;
        var registry = {};

        self.registerSingleton = function(dependencyName, value){
            if(registry.hasOwnProperty(dependencyName)){
                throw new Error('The dependency "' + dependencyName +'" is already registered.');
            }
            if(typeof value === 'object'){
                registry[dependencyName] = {constructor: undefined, instance: value};
            }
            else{
                registry[dependencyName] = {constructor: value, instance: undefined};
            }
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

        // ----- Internal logic

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