var React = require("react");

module.exports.Spreadsheet = React.createClass({
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
          </tbody>
        </table>
      </div>
    );
  }
});
