var React = require("react");
var Cell  = require("./cell.jsx").Cell;

module.exports.Row = React.createClass({
  propTypes: {
    cells: React.PropTypes.array.isRequired,
    getCellVal: React.PropTypes.func.isRequired,
    getCol: React.PropTypes.func.isRequired,
    onCellValueChange: React.PropTypes.func.isRequired
  },

  render: function() {
    var cells = this.props.cells.map(function(cell, i){
      return <Cell key={"cell_" + i}
                   value={cell}
                   getCellVal={this.props.getCellVal}
                   getCol={this.props.getCol}
                   onValueChange={this.props.onCellValueChange.bind(null, i)} />;
    }, this);

    return (
      <tr>
        { cells }
      </tr>
    );
  }
});
