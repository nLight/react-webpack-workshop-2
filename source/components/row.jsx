var React = require("react");
var Cell  = require("./cell.jsx").Cell;

module.exports.Row = React.createClass({
  render: function() {
    var cells = this.props.cells.map(function(cell, i){
      return <Cell key={"cell_" + i}
                   value={cell}
                   getCellVal={this.props.getCellVal}
                   onValueChange={this.props.onCellValueChange.bind(null, i)} />;
    }, this);

    return (
      <tr>
        { cells }
      </tr>
    );
  }
});
