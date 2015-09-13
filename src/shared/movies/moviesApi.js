(function(module, require){
    'use strict';
    module.exports = MoviesApi;

    var q = require('q');

    var lastId = 0;
    var movies = [
        {id: ++lastId, title: 'Avengers: Age of Ultron', rating: 7.8, image:'./images/avengers_aou.jpg', description:"When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans."},
        {id: ++lastId, title: 'Mission: Impossible - Rogue Nation', rating: 7.5, image:'./images/mi_rn.jpg', description:"Ethan and team take on their most impossible mission yet, eradicating the Syndicate - an International rogue organization as highly skilled as they are, committed to destroying the IMF."},
        {id: ++lastId, title: 'Alice Through the Looking Glass', rating: 8.2, image:'./images/alice_lg.jpg', description:"Nineteen-year-old Alice returns to the magical world from her childhood adventure, where she reunites with her old friends and learns of her true destiny: to end the Red Queen's reign of terror."}
    ];
    var fakeProcessTime = 500;

    function MoviesApi(){
        var self = this;

        self.getMovies = function(){
            var deferred = q.defer();
            setTimeout(function(){
                deferred.resolve(movies);
            }, fakeProcessTime);
            return deferred.promise;
        };
    }

}(module, require));