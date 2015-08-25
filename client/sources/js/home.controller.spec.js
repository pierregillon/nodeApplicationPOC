describe('A home controller', function(){
    var homeController;

    beforeEach(module('poc'));
    beforeEach(inject(function(_$controller_){
        homeController = _$controller_('homeController', { $scope: {} });
    }));

    it('should be defined.', function(){
        expect(homeController).toBeDefined();
    });

    it('should have a property text.', function(){
        expect(homeController.text).toBeDefined();
    });
});