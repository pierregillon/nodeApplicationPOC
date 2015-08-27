(function(React, document){
    'use strict';

    var HomeController = React.createClass({
        render: function() {
            return <div>Hello {this.props.name}</div>;
        }
    });

    React.render(<HomeController name="John" />, document.getElementById('root'));
}(React, document));