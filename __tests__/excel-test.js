jest.dontMock("../source/components/excel.jsx");
jest.dontMock("underscore");

describe("Add row", function(){
  it("adds a row on click", function(){
    var React = require("react/addons");
    var Excel = require("../source/components/excel.jsx").Excel;
    var AddRowButton = require("../source/components/excel.jsx").AddRowButton;
    var Row = require("../source/components/row.jsx").Row;
    var TU = React.addons.TestUtils;

    var rows,
        buttonComponent,
        button,
        excel;

    excel = TU.renderIntoDocument(
      <Excel />
    );

    rows = TU.scryRenderedComponentsWithType(excel, Row);

    // One row by default
    expect(rows.length).toBe(1);

    // Actual Test
    buttonComponent = TU.findRenderedComponentWithType(excel, AddRowButton);
    button = TU.findRenderedDOMComponentWithTag(buttonComponent, 'button');
    TU.Simulate.click(button);

    rows = TU.scryRenderedComponentsWithType(excel, Row);
    expect(rows.length).toBe(2);
  });
});
