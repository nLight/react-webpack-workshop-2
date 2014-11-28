var React = require("react");
var classNames = require('classnames');

module.exports.Cell = React.createClass({
  getInitialState: function() {
    return {
      focused: false
    };
  },

  evalFormula: function(formula) {
    var match,
        a,
        b;

    // =sum(0) Sum column with index 0
    match = /=(sum|mul)\((\d+)\)/.exec(formula);
    if (match) {
      return this.props.getCol(match[2]).reduce(function(accu, curr) {
        return {
          sum: this.evalFormula(accu) + this.evalFormula(curr),
          mul: this.evalFormula(accu) * this.evalFormula(curr)
        }[match[1]];
      }.bind(this));
    }

    // =sum(0:0,0:1)
    match = /=(sum|mul)\((\d+):(\d+)\,(\d+):(\d+)\)/.exec(formula);
    if (match) {
      a = this.evalFormula(this.props.getCellVal(match[2], match[3]));
      b = this.evalFormula(this.props.getCellVal(match[4], match[5]));

      return {
        sum: a + b,
        mul: a * b
      }[match[1]];
    }


    return parseFloat(formula, 10);
  },

  isFormula: function() {
    var value = this.props.value;
    return /^=/.test(value.toString());
  },

  getValue: function() {
    var value = this.props.value;

    if (this.isFormula() && !this.state.focused) {
      return this.evalFormula(value);
    }
    else if (this.isFormula() || value === "") {
      return value;
    }
    else {
      return parseFloat(value, 10);
    }
  },

  setFocus: function(){
    this.setState({focused: true});
  },

  unsetFocus: function(){
    this.setState({focused: false});
  },

  render: function() {
    var cellClass = classNames({
      formulaCell: this.isFormula()
    });
    return (
      <td><input className={cellClass}
                 value={this.getValue()}
                 onChange={this.props.onValueChange}
                 onFocus={this.setFocus}
                 onBlur={this.unsetFocus} /></td>
    );
  }
});
