require('bootstrap/dist/css/bootstrap.css');
require('./styles/main.css');

var ReactDOM = require("react-dom");
var React = require("react");
var Spreadsheet = require("./components/spreadsheet.jsx").Spreadsheet;

ReactDOM.render(
  <Spreadsheet />,
  document.getElementById('content')
);
