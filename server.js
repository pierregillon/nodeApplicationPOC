(function(process, require){
    var ServerComponent = require('./server/serverComponent');

    var port = process.env.PORT || 1337;
    var component = new ServerComponent();
    component.start(port);
    process.on('SIGINT', function() {
        component.stop();
        process.exit();
    });
}(process, require));