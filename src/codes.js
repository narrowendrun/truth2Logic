///////////////////////////////////////////
function generateBinaryCodes(n) {
  let output = [];
  for (let i = 0; i < n; i++) {
    output.push(i.toString(2));
  }
  let len = output[output.length - 1].length;
  for (let i = 0; i < n; i++) {
    let element = output[i];
    for (let j = 0; j < element.length; j++) {
      if (element.length < len) {
        element = "0".repeat(len - element.length) + element;
        output[i] = element;
      }
    }
  }
  return output;
}

function generateGrayCodes(array) {
  let output = [];
  for (let i = 0; i < array.length; i++) {
    let binary = array[i].split("");
    let gray = [];
    gray[0] = binary[0];
    for (let j = 1; j < binary.length; j++) {
      gray[j] = (parseInt(binary[j]) + parseInt(binary[j - 1])) % 2;
    }
    output.push(gray.join(""));
  }
  return output;
}

export function getHeadings(n) {
  return generateGrayCodes(generateBinaryCodes(n));
}

////////////////////////////////////////////
export function generateKmapGrid(KmapArray, columns) {
  let KmapGrid = [];
  let flipper = 0; //if flipper is 1, the placeHolder will be reversed
  for (let i = 0; i < KmapArray.length; i += columns) {
    let placeHolder = KmapArray.slice(i, i + columns);
    if (flipper == 1) {
      placeHolder = placeHolder.reverse();
    }
    placeHolder = placeHolder.map((i) => (isNaN(i) ? "x" : i));
    KmapGrid.push(placeHolder);
    flipper = +!flipper;
  }
  return KmapGrid;
}

///////////////////////////////////////////
function init(expression, variables) {
  const output = expression.split("\n").map((i) => i.split(":")[1]);
  const simplify = output;
  let grayCode = getHeadings(2 ** parseInt(variables));
  let indexArray = [];
  for (let i = 0; i < grayCode.length; i++) {
    indexArray.push(parseInt(grayCode[i], 2));
  }
  let kMapArray = [];
  for (let i = 0; i < indexArray.length; i++) {
    kMapArray.push(parseInt(output[indexArray[i]]));
  }
  return kMapArray;
}

///////////////////////////////////////////
let indexArray = [];
let indexSet = new Set();
function bfs(grid, i, j) {
  if (i < 0) {
    i = grid.length - 1;
  }
  if (j < 0) {
    j = grid[i].length - 1;
  }
  if (i > grid.length - 1) {
    i = 0;
  }
  if (j > grid[i].length - 1) {
    j = 0;
  }
  if (grid[i][j] != 1) return;
  grid[i][j] = 2;
  indexSet.add([i, j]);
  bfs(grid, i + 1, j);
  bfs(grid, i - 1, j);
  bfs(grid, i, j + 1);
  bfs(grid, i, j - 1);
}

export function kMapAlgo(grid) {
  indexArray = [];
  indexSet.clear(); // Clear set before processing grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1 && !indexSet.has([i, j])) {
        bfs(grid, i, j);
        // console.log(indexSet);
        indexArray.push([...indexSet]); // Deep copy to avoid mutation
        indexSet.clear(); // Clear set after processing island
      }
    }
  }
  return Array.from(indexArray);
}
///////////////////////////////////////////

export function changeCellValue(m, i, KmapGrid) {
  let bit = KmapGrid[m][i];
  KmapGrid[m][i] = !+bit;
}

///////////////////////////////////////////

function isOfValidLength(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
// function makeAdjacentGroup(group, boundary) {
//   let interim = [group[0]];
//   let output = [];
//   for (let i = 1; i < group.length + 1; i++) {
//     if (group[i] - group[i - 1] == 1) {
//       interim.push(group[i]);
//     } else {
//       output.push(interim);
//       interim = [group[i]];
//     }
//   }
//   let mergeIndex1 = 0;
//   let mergeIndex2 = 0;
//   for (const coord in output) {
//     if (output[coord].includes(0)) {
//       mergeIndex1 = coord;
//     }
//     if (output[coord].includes(boundary)) {
//       mergeIndex2 = coord;
//     }
//   }
//   if (mergeIndex1 != mergeIndex2) {
//     // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
//     // console.log(`indexes to be merged ${mergeIndex1}, ${mergeIndex2}`)
//     // console.log(output)
//     // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
//     let mergedCoords = [];
//     let merge1 = output[mergeIndex1];
//     output.splice(mergeIndex1, 1);
//     let merge2 = [];
//     if (mergeIndex2 > mergeIndex1) {
//       merge2 = output[mergeIndex2 - 1];
//       output.splice(mergeIndex2 - 1, 1);
//     } else {
//       merge2 = output[mergeIndex2];
//       output.splice(mergeIndex2, 1);
//     }
//     mergedCoords = merge1.concat(merge2);
//     mergedCoords.sort();
//     output.push(mergedCoords);
//   }
//   output.sort();
//   return output;
// }
// function extractAdjacent(group, boundary) {
//   let adjacentGroups = {};
//   for (const coord in group) {
//     let corresponding_coord = group[coord];
//     corresponding_coord.sort();
//     if (
//       corresponding_coord.length - 1 ==
//       corresponding_coord[corresponding_coord.length - 1] -
//         corresponding_coord[0]
//     ) {
//       adjacentGroups[coord] = [];
//       adjacentGroups[coord].push(corresponding_coord);
//     } else {
//       let splitGroups = makeAdjacentGroup(corresponding_coord, boundary);
//       if (splitGroups) {
//         adjacentGroups[coord] = splitGroups;
//       }
//     }
//   }
//   return adjacentGroups;
// }
// function groupByCoordinates(Allcoords, uniqueCoords, choice) {
//   const groupedCoords = {};
//   for (const coord of uniqueCoords) {
//     groupedCoords[coord] = [];
//   }
//   for (const [xCoord, yCoord] of Allcoords) {
//     if (choice == "y") {
//       groupedCoords[yCoord].push(xCoord);
//     }
//     if (choice == "x") {
//       groupedCoords[xCoord].push(yCoord);
//     }
//   }
//   return groupedCoords;
// }

// export function mappablePoints(group, choice, boundary) {
//   let coordinatesSet = new Set(); //set of cordinates of choice
//   let output = {};
//   //console.log(`........................................................`);
//   for (let i = 0; i < group.length; i++) {
//     coordinatesSet.clear();
//     for (let j = 0; j < group[i].length; j++) {
//       coordinatesSet.add(group[i][j][1]);
//     }

//     // console.log(`for group ${i + 1}: `);
//     // console.log(group[i]);
//     // console.log(`unique ${choice}-coordinate set is : `);
//     // console.log(coordinatesSet);
//     // console.log();

//     let groupedCoords = groupByCoordinates(group[i], coordinatesSet, choice);
//     console.log(`groupedCoords : `);
//     console.log(groupedCoords);
//     let extractedCoords = extractAdjacent(groupedCoords, boundary);
//     console.log(`adjacency computed :`);
//     console.log(extractedCoords);
//     for (const key in Object.keys(extractedCoords)) {
//       if (Object.keys(output).includes(key)) {
//         console.log(`key clash at ${key}`);
//         console.log("output value");
//         console.log(output[key]);
//         console.log("extractedcoord value");
//         console.log(extractedCoords[key]);
//       }
//     }
//     output = { ...output, ...extractedCoords };
//     coordinatesSet.clear();
//   }
//   console.log(`........................................................`);
//   return output;
// }
