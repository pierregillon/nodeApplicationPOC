(function(module, require){
    'use strict';
    module.exports = About;

    var React = require('react');

    function About(){
        return React.createClass({
            render: function () {
                return (
                    <div>
                        <h2>About</h2>
                        <p>Ergo ego senator inimicus, si ita vultis, homini, amicus esse,
                            sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias,
                            depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum
                            ego omnium meorum consiliorum atque factorum exempla semper ex summorum
                            hominum consiliis atque factis mihi censuerim petenda.</p>

                       <p>Ut enim quisque sibi plurimum confidit et ut quisque maxime virtute et
                           sapientia sic munitus est, ut nullo egeat suaque omnia in se ipso posita
                           iudicet, ita in amicitiis expetendis colendisque maxime excellit. Quid enim?
                           Africanus indigens mei? Minime hercule! ac ne ego quidem illius; sed ego admiratione
                           quadam virtutis eius, ille vicissim opinione fortasse non nulla, quam de
                           meis moribus habebat, me dilexit; auxit benevolentiam consuetudo. Sed quamquam
                           utilitates multae et magnae consecutae sunt, non sunt tamen ab earum spe causae
                           diligendi profectae.</p>
                    </div>
                );
            }
        });
    }
}(module, require));