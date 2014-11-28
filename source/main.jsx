require('bootstrap/dist/css/bootstrap.css');
require('./styles/main.less');

var React = require("react/lib/ReactWithAddons");
var Excel = require("./components/excel.jsx").Excel;

React.render(
  <Excel />,
  document.getElementById('content')
);
