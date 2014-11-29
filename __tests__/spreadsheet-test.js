jest.dontMock("../source/components/spreadsheet.jsx");
jest.dontMock("underscore");

describe("Add row", function(){
  it("adds a row on click", function(){
    var React = require("react");
    var TU = require('react-addons-test-utils');
    var Spreadsheet = require("../source/components/spreadsheet.jsx").Spreadsheet;
    var Row = require("../source/components/row.jsx").Row;

    var rows,
        button,
        spreadsheet;

    spreadsheet = TU.renderIntoDocument(
      <Spreadsheet />
    );

    rows = TU.scryRenderedComponentsWithType(spreadsheet, Row);

    // One row by default
    expect(rows.length).toBe(1);

    button = TU.findRenderedDOMComponentWithClass(spreadsheet, 'add-row-button');
    TU.Simulate.click(button);

    rows = TU.scryRenderedComponentsWithType(spreadsheet, Row);
    expect(rows.length).toBe(2);
  });
});
