import getHeadings from "./codes";
export default function Kmap({ variables, KmapArray }) {
  const rows = 2 ** parseInt(variables / 2);
  const columns = 2 ** (variables - parseInt(variables / 2));
  let grayColum = getHeadings(columns);
  let grayRow = getHeadings(rows);
  let tdWidth = 5;
  let delta = 1;
  let leftStyling = (100 - (parseInt(columns) * tdWidth + delta + tdWidth)) / 2;
  leftStyling = leftStyling > 0 ? leftStyling : 0;

  let rowStyle = {
    position: "absolute",
    top: "70vh",
    left: `${leftStyling}vw`,
  };
  let columnStyle = {
    position: "absolute",
    top: "65vh",
    left: `${leftStyling + tdWidth + delta}vw`,
  };
  let gridStyle = {
    position: "absolute",
    top: "70vh",
    left: `${leftStyling + tdWidth + delta}vw`,
  };
  let KmapGrid = [];
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {}
  }
  function printHeadingColumns(n) {
    let data = grayColum;
    let html = [];
    for (let i = 0; i < data.length; i++) {
      html.push(<td key={i}>{data[i]}</td>);
    }
    return <tr>{html}</tr>;
  }
  function printHeadingRows(n) {
    let data = grayRow;
    let html = [];
    for (let i = 0; i < data.length; i++) {
      html.push(
        <tr key={i}>
          <td>{data[i]}</td>
        </tr>
      );
    }
    return html;
  }
  function printGridColumns(n) {
    let html = [];
    for (let i = 0; i < n; i++) {
      html.push(<td key={"col" + i}>0</td>);
    }
    return html;
  }
  function printGrid(m, n) {
    let html = [];
    for (let i = 0; i < m; i++) {
      html.push(<tr key={"row" + i}>{printGridColumns(n)}</tr>);
    }
    return html;
  }
  return (
    <>
      <table id="columnLabels" style={columnStyle}>
        <thead>{printHeadingColumns(columns)}</thead>
      </table>
      <table id="rowLabels" style={rowStyle}>
        <thead>{printHeadingRows(rows)}</thead>
      </table>
      <table id="theGrid" style={gridStyle}>
        <tbody>{printGrid(rows, columns)}</tbody>
      </table>
    </>
  );
}
