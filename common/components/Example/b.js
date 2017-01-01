import React from 'react';
import ReactDOM from 'react-dom';


// To get started with this tutorial running your own code, simply remove
// the script tag loading scripts/example.js and start writing code here.
var Hello = React.createClass({
  render: function() {
    return (
       <div>
        <h1>Hello World</h1>
        <p>This is some text</p>
       </div>
    )
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('container')
);
