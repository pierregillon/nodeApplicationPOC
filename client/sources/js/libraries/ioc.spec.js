(function(){
    'use strict';

    describe('Ioc', function(){

        var ioc;

        beforeEach(function(){
            ioc = new iocClass();
        });

        it('should instance when function have been registered.', function(){
            var MyClass = function(){
                this.myMethod = function(){
                    return 'hello world';
                };
            };

            ioc.registerClass('test', MyClass);
            ioc.resolve(['test'], function(test){
                expect(test).toBeDefined;
                expect(test.myMethod()).toEqual('hello world');
            })
        });

        it('should instance when instance have been registered.', function(){
            var instance = {};
            ioc.registerInstance('test', instance);
            ioc.resolve(['test'], function(test){
                expect(test).toEqual(instance);
            })
        });

        it('should inject dependencies.', function(){
            MyClass.$dependencies = ['dep1'];
            function MyClass(dep1){
                this.myMethod = function(){
                    return dep1.text;
                };
            }

            ioc.registerClass('test', MyClass);
            ioc.registerInstance('dep1', {text: 'hello world'});
            ioc.resolve(['test'], function(test){
                expect(test).toBeDefined;
                expect(test.myMethod()).toEqual('hello world');
            })
        });

        it('returns same instances.', function(){
            var MyClass = function(){
                this.myMethod = function(){
                    return 'hello world';
                };
            };
            var instance1 = 1;
            var instance2 = 2;

            ioc.registerClass('test', MyClass);
            ioc.resolve(['test'], function(test){instance1 = test});
            ioc.resolve(['test'], function(test){instance2 = test});
            expect(instance1).toEqual(instance2);
        });

        it('can return class', function(){
            function MyClass(){            }

            ioc.registerClass('test', MyClass);
            var MyClass2 = ioc.getClass('test');

            expect(MyClass).toEqual(MyClass2);
        })
    });

}());