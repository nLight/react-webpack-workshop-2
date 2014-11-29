jest.dontMock("../source/components/spreadsheet.jsx");
jest.dontMock("underscore");

describe("Add row", function(){
  it("adds a row on click", function(){
    var React = require("react");
    var TU = require('react-addons-test-utils');
    var Spreadsheet = require("../source/components/spreadsheet.jsx").Spreadsheet;
    var AddRowButton = require("../source/components/spreadsheet.jsx").AddRowButton;
    var Row = require("../source/components/row.jsx").Row;

    var rows,
        buttonComponent,
        button,
        spreadsheet;

    spreadsheet = TU.renderIntoDocument(
      <Spreadsheet />
    );

    rows = TU.scryRenderedComponentsWithType(spreadsheet, Row);

    // One row by default
    expect(rows.length).toBe(1);

    // Actual Test
    buttonComponent = TU.findRenderedComponentWithType(spreadsheet, AddRowButton);
    button = TU.findRenderedDOMComponentWithTag(buttonComponent, 'button');
    TU.Simulate.click(button);

    rows = TU.scryRenderedComponentsWithType(spreadsheet, Row);
    expect(rows.length).toBe(2);
  });
});
