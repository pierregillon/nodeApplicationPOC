(function(angular){
    'use strict';

    angular
        .module('poc', []);

}(angular));
(function(angular){
    angular
        .module('poc')
        .controller('homeController', HomeController);

    HomeController.$inject = [];

    function HomeController(){
        this.text = 'Hello world guys !';
    }

}(angular));