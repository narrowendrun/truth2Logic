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
  if (i > grid.length - 1 || j > grid[i].length - 1) return;
  if (grid[i][j] !=1) return;
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
        indexArray.push([...indexSet]); // Deep copy to avoid mutation
        indexSet.clear(); // Clear set after processing island
      }
    }
  }
  return indexArray;
}

///////////////////////////////////////////
