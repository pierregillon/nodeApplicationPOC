var expect = require('chai').expect;
var ServerComponent = require('./serverComponent');

describe('A server component', function(){
    it('should be defined.', function(){
        expect(ServerComponent).to.not.be.undefined;
    });
});