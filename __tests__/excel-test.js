jest.dontMock("../source/components/excel.jsx");
jest.dontMock("underscore");

describe("Add row", function(){
  it("adds a row on click", function(){
    var React = require("react/addons");
    var Excel = require("../source/components/excel.jsx").Excel;
    var Row = require("../source/components/row.jsx").Row;
    var TU = React.addons.TestUtils;

    var rows,
        button,
        excel;

    excel = TU.renderIntoDocument(
      <Excel />
    );

    rows = TU.scryRenderedComponentsWithType(excel, Row);

    // One row by default
    expect(rows.length).toBe(1);

    button = TU.findRenderedDOMComponentWithClass(excel, 'add-row-button');
    TU.Simulate.click(button);

    rows = TU.scryRenderedComponentsWithType(excel, Row);
    expect(rows.length).toBe(2);
  });
});
