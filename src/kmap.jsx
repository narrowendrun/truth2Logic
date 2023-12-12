import {
  getHeadings,
  generateKmapGrid,
  kMapAlgo,
  mappablePoints,
} from "./codes";
export default function Kmap({ variables, KmapArray }) {
  const rows = 2 ** parseInt(variables / 2);
  const columns = 2 ** (variables - parseInt(variables / 2));
  let grayColum = getHeadings(columns);
  let grayRow = getHeadings(rows);
  let tdWidth = 5;
  let delta = 1;
  let leftStyling = (100 - (parseInt(columns) * tdWidth + delta + tdWidth)) / 2;
  leftStyling = leftStyling > 0 ? leftStyling : 0;
  let groupStyle = { top: `${rows * 5 + 77.5}vh` };

  let rowStyle = {
    position: "absolute",
    top: "72.5vh",
    left: `${leftStyling + delta}vw`,
  };
  let columnStyle = {
    position: "absolute",
    top: "65vh",
    left: `${leftStyling + tdWidth + delta}vw`,
  };
  let gridStyle = {
    position: "absolute",
    top: "72.5vh",
    left: `${leftStyling + tdWidth + delta}vw`,
  };

  ////////////////////////////////////////////////////////////
  let KmapGrid = generateKmapGrid(KmapArray, columns);
  let indices = kMapAlgo(generateKmapGrid(KmapArray, columns));
  let output = "";
  for (let i = 0; i < indices.length; i++) {
    output += `\n group ${i + 1} at `;
    for (let j = 0; j < indices[i].length; j++) {
      output += `(${indices[i][j]}) `;
    }
  }
  let verticallyAdjPoints = mappablePoints(indices, "y");
  console.log("vertical points : ");
  console.log(verticallyAdjPoints);
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
  function printGridColumns(n, data) {
    let html = [];
    for (let i = 0; i < n; i++) {
      if (data[i] == 1) {
        html.push(
          <td key={"col" + i} style={{ backgroundColor: "greenyellow" }}>
            {data[i]}
          </td>
        );
      } else {
        html.push(<td key={"col" + i}>{data[i]}</td>);
      }
    }
    return html;
  }
  function printGrid(m, n) {
    let html = [];
    for (let i = 0; i < m; i++) {
      html.push(<tr key={"row" + i}>{printGridColumns(n, KmapGrid[i])}</tr>);
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
      <br />
      <div className="container output" style={groupStyle}>
        <p>
          <span id="arrayOutput">{output}</span>
          <br />
          <span id="arrayOutput2"></span>
        </p>
      </div>
    </>
  );
}
