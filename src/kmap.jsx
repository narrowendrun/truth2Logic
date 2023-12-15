import { useEffect } from "react";
import { useState } from "react";
import {
  getHeadings,
  generateKmapGrid,
  kMapAlgo,
  mappablePoints,
  changeCellValue,
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
  let groupStyle2 = { top: `${rows * 5 + 92.5}vh` };

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
  const [refreshGrid, setRefreshGrid] = useState(0);
  let indices = kMapAlgo(generateKmapGrid(KmapArray, columns));
  let output = "";
  for (let i = 0; i < indices.length; i++) {
    output += `\n group ${i + 1} at `;
    for (let j = 0; j < indices[i].length; j++) {
      output += `(${indices[i][j]}) `;
    }
  }
  console.log("indices: ");
  console.log(indices);
  let verticallyAdjPoints = mappablePoints(indices, "y", columns - 1);
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
  function printGridColumns(n, m, data) {
    let html = [];
    for (let i = 0; i < n; i++) {
      html.push(
        <td
          key={"col" + i}
          style={{ backgroundColor: data[i] == 1 ? "greenyellow" : "white" }}
          // onClick={() => {
          //   const newData = [...data]; // Copy the data
          //   newData[i] = newData[i] === 0 ? 1 : 0; // Flip the bit
          //   // Update KmapGrid with the new data
          //   KmapGrid[m][i] = newData[i];
          //   setRefreshGrid((prev) => (prev === 0 ? 1 : 0));
          // }}
        >
          {data[i]}
        </td>
      );
    }
    return html;
  }
  function printGrid(m, n) {
    let html = [];
    for (let i = 0; i < m; i++) {
      html.push(<tr key={"row" + i}>{printGridColumns(n, i, KmapGrid[i])}</tr>);
    }
    return html;
  }
  // useEffect(() => {
  //   console.log("changed kMapGrid");
  //   document.getElementById("theGrid").innerHTML = printGrid(rows, columns);
  // }, [refreshGrid]);
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
      <div className="container output" style={groupStyle2}>
        {/* {Object.keys(verticallyAdjPoints).map((key) => (
          <span key={key}>
            column
            {key}:{" "}
            {verticallyAdjPoints[key].map((item) => (
              <span key={`${key}-${item.join(",")}`}>
                {item.join(", ")}
                <br />
              </span>
            ))}
          </span>
        ))} */}
      </div>
    </>
  );
}
