var React = require("react");
var Cell  = require("./cell.jsx").Cell;

module.exports.Row = React.createClass({
  render: function() {
    var cells = this.props.cells.map(function(cell, i){
      return <Cell key={"cell_" + i} value={cell} />;
    });

    return (
      <tr>
        { cells }
      </tr>
    );
  }
});
