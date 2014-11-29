var _ = require("underscore");
var React = require("react/lib/ReactWithAddons");
var Row = require("./row.jsx").Row;

module.exports.Excel = React.createClass({
  getInitialState: function() {
    return {
      activeSheetIndex: 0,
      sheets: [
        [[10, 23, "=sum(0:0,0:1)"]]
      ],
    };
  },

  addSheet: function() {
    var newState,
        newSheet;

    newSheet = [[""]];

    newState = React.addons.update(this.state, {
      sheets: {
        $push: [newSheet]
      }
    });

    this.setState(newState);
  },

  addRow: function() {
    var sheet = this.getActiveSheet(),
        numCols,
        newRow,
        newState,
        query;

    numCols = sheet[0].length;
    newRow = _.range(numCols).map(function(){
      return "";
    });

    query = { sheets: {} };
    query.sheets[this.state.activeSheetIndex] = {
      $push: [newRow],
    };

    newState = React.addons.update(this.state, query);

    this.setState(newState);
  },

  addColumn: function() {
    var sheet = this.getActiveSheet(),
        newState,
        query;

    query = { sheets: {} };
    query.sheets[this.state.activeSheetIndex] = {
      $apply: function(rows) {
        var _rows = rows.map(function(row){
          var updatedRow = React.addons.update(row, {
            $push: [""]
          });
          return updatedRow;
        });
        return _rows;
      }
    };

    newState = React.addons.update(this.state, query);

    this.setState(newState);
  },

  onDataChange: function(row, cell, event) {
    /*
      Object key should be an index of array, an integer
      But we can't specify it as {row: {cell: {$set: value}}} in javascript
      So we need to use [] interface
    */
    var sheet = this.getActiveSheet(),
        query = { sheets: {} };
        query.sheets[this.state.activeSheetIndex] = {};
        query.sheets[this.state.activeSheetIndex][row] = {};
        query.sheets[this.state.activeSheetIndex][row][cell] = {$set: event.target.value};

    var newState = React.addons.update(this.state, query);

    this.setState(newState);
  },

  getCellVal: function(row, col) {
    var value,
        sheet = this.getActiveSheet(),
        _row  = parseInt(row, 10),
        _col  = parseInt(col, 10);

    try {
      value = sheet[_row][_col];
    } catch(err) {};

    return value;
  },

  getCol: function(col) {
    var sheet = this.getActiveSheet(),
        value = [],
        _col = parseInt(col, 10);

    try {
      sheet.map(function(row){
        var _value = row[_col];
        if(_value) {
          value.push(_value);
        }
      }, this);

    } catch(err) {};

    return value;
  },

  getActiveSheet: function() {
    return this.state.sheets[this.state.activeSheetIndex];
  },

  activateSheet: function(index) {
    var newState = React.addons.update(this.state, {activeSheetIndex: {$set: index}});
    this.setState(newState);
  },

  render: function() {

    var sheet = this.getActiveSheet();

    var sheets = this.state.sheets.map(function(sheet, i){
      var sheetClass = React.addons.classSet({
        active: i == this.state.activeSheetIndex
      });

      return(
        <li key={"sheet_" + i} role="presentation" className={sheetClass}>
          <a href="#" onClick={this.activateSheet.bind(null, i)}>Sheet {i+1}</a>
        </li>
      );
    }, this);

    var rows  = sheet.map(function(row, i){
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
              <button className="btn btn-default navbar-btn" onClick={this.addSheet}>Add sheet</button>
              <button className="btn btn-default navbar-btn add-row-button" onClick={this.addRow}>Add row</button>
              <button className="btn btn-default navbar-btn" onClick={this.addColumn}>Add column</button>
            </div>
          </div>
        </nav>
        <ul className="nav nav-tabs">
          { sheets }
        </ul>
        <table className="table table-bordered">
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    );
  }
});
