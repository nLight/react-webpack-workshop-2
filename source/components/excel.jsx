var React = require("react");
var Row = require("./row.jsx").Row;

module.exports.Excel = React.createClass({
  render: function() {
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
            <Row />
          </tbody>
        </table>
      </div>
    );
  }
});
