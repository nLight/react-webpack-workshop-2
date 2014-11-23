var React = require("react");
var Row = require("./row.jsx").Row;

module.exports.Excel = React.createClass({
  getInitialState: function() {
    return {
      rows: [[""]]
    };
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
