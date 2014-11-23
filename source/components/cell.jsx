var React = require("react");

module.exports.Cell = React.createClass({
  render: function() {
    return (
      <td><input value={this.props.value} /></td>
    );
  }
});
