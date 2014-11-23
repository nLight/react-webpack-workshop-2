var React = require("react");
var Cell  = require("./cell.jsx").Cell;

module.exports.Row = React.createClass({
  render: function() {
    return (
      <tr>
        <Cell />
      </tr>
    );
  }
});
