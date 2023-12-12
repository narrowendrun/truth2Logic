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
function init(expression,variables) {
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
  return kMapArray
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
        console.log(indexSet)
        indexArray.push([...indexSet]); // Deep copy to avoid mutation
        indexSet.clear(); // Clear set after processing island
      }
    }
  }
  return Array.from(indexArray);
}

///////////////////////////////////////////

function isOfValidLength(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
function makeAdjacentGroup(group) {
  let boundary = 8 - 1;
  let interim = [group[0]];
  let output = [];
  for (let i = 1; i < group.length + 1; i++) {
    if (group[i] - group[i - 1] == 1) {
      interim.push(group[i]);
    } else {
      output.push(interim);
      interim = [group[i]];
    }
  }
  let mergeIndex1 = 0;
  let mergeIndex2 = 0;
  for (const coord in output) {
    if (output[coord].includes(0)) {
      mergeIndex1 = coord;
    }
    if (output[coord].includes(boundary)) {
      mergeIndex2 = coord;
    }
  }
  if (mergeIndex1 != mergeIndex2) {
    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    // console.log(`indexes to be merged ${mergeIndex1}, ${mergeIndex2}`)
    // console.log(output)
    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    let mergedCoords = [];
    let merge1 = output[mergeIndex1];
    output.splice(mergeIndex1, 1);
    let merge2 = [];
    if (mergeIndex2 > mergeIndex1) {
      merge2 = output[mergeIndex2 - 1];
      output.splice(mergeIndex2 - 1, 1);
    } else {
      merge2 = output[mergeIndex2];
      output.splice(mergeIndex2, 1);
    }
    mergedCoords = merge1.concat(merge2);
    mergedCoords.sort();
    output.push(mergedCoords);
  }
  output.sort();
  return output;
}
function extractAdjacent(group) {
  let adjacentGroups = {};
  for (const coord in group) {
    let corresponding_coord = group[coord];
    corresponding_coord.sort();
    if (
      corresponding_coord.length - 1 ==
      corresponding_coord[corresponding_coord.length - 1] -
        corresponding_coord[0]
    ) {
      adjacentGroups[coord] = [];
      adjacentGroups[coord].push(corresponding_coord);
    } else {
      let splitGroups = makeAdjacentGroup(corresponding_coord);
      if (splitGroups) {
        adjacentGroups[coord] = splitGroups;
      }
    }
  }
  return adjacentGroups;
}
function groupByCoordinates(Allcoords, uniqueCoords, choice) {
  const groupedCoords = {};
  for (const coord of uniqueCoords) {
    groupedCoords[coord] = [];
  }
  for (const [xCoord, yCoord] of Allcoords) {
    if (choice == "y") {
      groupedCoords[yCoord].push(xCoord);
    }
    if (choice == "x") {
      groupedCoords[xCoord].push(yCoord);
    }
  }
  return groupedCoords;
}

export function mappablePoints(group, choice) {
  let coordinatesSet = new Set(); //set of cordinates of choice
  let output = {};
  console.log(`........................................................`);
  for (let i = 0; i < group.length; i++) {
    coordinatesSet.clear();
    for (let j = 0; j < group[i].length; j++) {
      coordinatesSet.add(group[i][j][1]);
    }

    console.log(`for group ${i + 1}: `);
    console.log(group[i]);
    console.log(`unique ${choice}-coordinate set is : `);
    console.log(coordinatesSet);
    console.log();

    let groupedCoords = groupByCoordinates(group[i], coordinatesSet, choice);
    // console.log(`groupedCoords : `)
    // console.log(groupedCoords)
    let extractedCoords = extractAdjacent(groupedCoords);
    // console.log(`adjacency computed :`)
    // console.log(extractedCoords)
    output = { ...output, ...extractedCoords };
    coordinatesSet.clear();
  }
  console.log(`........................................................`);
  return output;
}

const Allcoords = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [7, 7],
    [0, 7],
    [6, 1],
    [5, 1],
    [5, 2],
    [6, 2],
    [7, 2],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [2, 1],
    [1, 1],
    [4, 7],
    [3, 7],
  ],
  [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
  ],
];

// let input=`000000:1
//   000001:0
//   000010:0
//   000011:1
//   000100:1
//   000101:0
//   000110:1
//   000111:0
//   001000:1
//   001001:1
//   001010:0
//   001011:1
//   001100:0
//   001101:0
//   001110:1
//   001111:0
//   010000:1
//   010001:0
//   010010:0
//   010011:1
//   010100:1
//   010101:0
//   010110:1
//   010111:0
//   011000:1
//   011001:1
//   011010:0
//   011011:1
//   011100:0
//   011101:0
//   011110:1
//   011111:0
//   100000:1
//   100001:0
//   100010:0
//   100011:1
//   100100:1
//   100101:0
//   100110:1
//   100111:0
//   101000:1
//   101001:1
//   101010:0
//   101011:1
//   101100:0
//   101101:0
//   101110:1
//   101111:0
//   110000:1
//   110001:0
//   110010:0
//   110011:1
//   110100:1
//   110101:0
//   110110:1
//   110111:0
//   111000:1
//   111001:1
//   111010:0
//   111011:1
//   111100:0
//   111101:0
//   111110:1
//   111111:0`

let a = ''

let input = `000000:0
000001:0
000010:0
000011:1
000100:1
000101:0
000110:1
000111:0
001000:1
001001:1
001010:0
001011:1
001100:0
001101:0
001110:1
001111:0
010000:0
010001:0
010010:0
010011:1
010100:1
010101:0
010110:1
010111:0
011000:1
011001:1
011010:0
011011:1
011100:0
011101:0
011110:1
011111:0
100000:0
100001:0
100010:0
100011:1
100100:1
100101:0
100110:1
100111:0
101000:1
101001:1
101010:0
101011:1
101100:0
101101:0
101110:1
101111:0
110000:0
110001:0
110010:0
110011:1
110100:1
110101:0
110110:1
110111:0
111000:1
111001:1
111010:0
111011:1
111100:0
111101:0
111110:1
111111:0`


let columns=8
let variables=8

let indices=kMapAlgo(generateKmapGrid(init(input,variables),columns))
console.log(indices)
let vPoints = mappablePoints(indices, "y");
//let hPoints = mappablePoints(Allcoords,"x")
console.log("////////////////////////////////////////////////////////");
console.log("vertical points : ");
console.log(vPoints);
console.log("////////////////////////////////////////////////////////");
// console.log("horizontal points : ")
// console.log(hPoints)
// console.log("////////////////////////////////////////////////////////")
