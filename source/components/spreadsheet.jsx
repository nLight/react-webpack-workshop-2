var React = require("react");
var _ = require("underscore");
var Row = require("./row.jsx").Row;
var update = require("react-addons-update");

module.exports.Spreadsheet = React.createClass({
  getInitialState: function() {
    return {
      rows: [[""]]
    };
  },

  addRow: function() {
    var numCols,
        newRow,
        newState;

    numCols = this.state.rows[0].length;
    newRow = _.range(numCols).map(function(){
      return "";
    });

    newState = update(this.state, {
      rows: {$push: [newRow]}
    });

    this.setState(newState);
  },

  addColumn: function() {
    var newState = update(this.state, {
      rows: {
        $apply: function(rows) {
          var _rows = rows.map(function(row){
            var updatedRow = update(row, {
              $push: [""]
            });
            return updatedRow;
          });
          return _rows;
        }
      }
    });

    this.setState(newState);
  },

  render: function() {
    var rows = this.state.rows.map(function(row, i){
      return <Row key={"row_" + i} cells={row} />;
    });

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button className="btn btn-default navbar-btn" onClick={this.addRow}>Add row</button>
              <button className="btn btn-default navbar-btn" onClick={this.addColumn}>Add column</button>
            </div>
          </div>
        </nav>
        <table className="table table-bordered">
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    );
  }
});
