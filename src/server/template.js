(function(require, module){
    'use strict';

    var fs = require("fs");
    var path = require("path");
    var q = require('q');

    function Template(target) {
        var self = this;

        self.render = function (data) {
            var deferred = q.defer();
            var fullPath = path.resolve(__dirname, target);
            fs.readFile(fullPath, {encoding: "utf8"}, function (err, template) {
                if (err) {
                    deferred.reject(err);
                }
                else{
                    var rendered = template.replace(/\{\{yield:([a-z0-9_]+)\}\}/g, function (match, property) {
                        return data[property];
                    });
                    deferred.resolve(rendered);
                }
            });
            return deferred.promise;
        };
    }

    module.exports = Template;

}(require, module));