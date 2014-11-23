var React = require("react");
var _ = require("underscore");
var Row = require("./row.jsx").Row;
var update = require("react-addons-update");

module.exports.Spreadsheet = React.createClass({
  getInitialState: function() {
    return {
      rows: [[10, 23, "=sum(0:0,0:1)"]]
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

  onDataChange: function(row, cell, event) {
    /*
      Object key should be an index of array, an integer
      But we can't specify it as {row: {cell: {$set: value}}} in javascript
      So we need to use [] interface
    */
    var query = {};
        query[row] = {};
        query[row][cell] = {$set: event.target.value};

    var newState = update(this.state, { rows: query });

    this.setState(newState);
  },

  getCellVal: function(row, col) {
    var value,
        _row = parseInt(row, 10),
        _col = parseInt(col, 10);

    try {
      value = this.state.rows[_row][_col];
    } catch(err) {};

    return value;
  },

  getCol: function(col) {
    var value = [],
        _col = parseInt(col, 10);

    try {
      this.state.rows.map(function(row){
        var _value = row[_col];
        if(_value) {
          value.push(_value);
        }
      }, this);

    } catch(err) {};

    console.log(value);

    return value;
  },

  render: function() {
    var rows = this.state.rows.map(function(row, i){
      return <Row key={"row_" + i}
                  cells={row}
                  getCellVal={this.getCellVal}
                  getCol={this.getCol}
                  onCellValueChange={this.onDataChange.bind(null, i)} />;
    }, this);

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
