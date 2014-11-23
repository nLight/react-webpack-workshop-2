var React = require("react");
var Row = require("./row.jsx").Row;
var update = require("react-addons-update");

module.exports.Spreadsheet = React.createClass({
  getInitialState: function() {
    return {
      rows: [[""]]
    };
  },

  addRow: function() {
    var newState = update(this.state, {
      rows: {$push: [[""]]}
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
