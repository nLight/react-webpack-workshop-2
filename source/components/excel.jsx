var _ = require("underscore");
var React = require("react/lib/ReactWithAddons");
var Row = require("./row.jsx").Row;

module.exports.Excel = React.createClass({
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

    newState = React.addons.update(this.state, {
      rows: {$push: [newRow]}
    });

    this.setState(newState);
  },

  addColumn: function() {
    var newState = React.addons.update(this.state, {
      rows: {
        $apply: function(rows) {
          var _rows = rows.map(function(row){
            var updatedRow = React.addons.update(row, {
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
