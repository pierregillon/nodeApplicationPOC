(function(module, require){
    'use strict';
    module.exports = ServerComponent;

    var express = require('express');

    function ServerComponent(){
        var self = this;
        var server;

        self.start = function(port){
            var app = express();

            app.use(express.static('./client/dist'));

            server = app.listen(port, function () {
                console.log('Server listening on port %s ...', port);
            });
        };
        self.stop = function(){
            server.close();
            console.log('Server stopped.');
        };
    }

}(module, require));