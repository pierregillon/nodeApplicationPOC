(function(ioc){
    'use strict';

    describe('A todostore', function(){
        var todoStore;

        beforeEach(function(){
           todoStore = ioc.getInstance('TodoStore');
        });

        it('should be defined', function(){
            expect(todoStore).toBeDefined();
        });

        it('should have a method "addChangeListener" defined', function(){
            expect(todoStore.addChangeListener).toBeDefined();
        });
    });

}(ioc));