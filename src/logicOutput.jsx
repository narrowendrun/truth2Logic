import Kmap from "./kmap";
import { getHeadings } from "./codes";
export default function LogicOutput({ expression }) {
  function generateVariables(n) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return Array.from(alphabet.slice(0, n));
  }
  function bitflipper(inputArr) {
    let variables = generateVariables(inputArr.length);
    let outputStr = "";
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i] == 1) {
        outputStr += variables[i];
      } else {
        outputStr += `¬` + variables[i];
      }
    }
    return outputStr + "\n";
  }
  const xpress = expression.split("\n");
  const variables = xpress[0].split(":")[0].length;
  const input = xpress.map((i) => bitflipper(i.split(":")[0].split("")));
  const output = xpress.map((i) => i.split(":")[1]);
  const simplify = output
    .map((value, i) => (value == 1 ? input[i] : null))
    .filter(Boolean)
    .join("+");

  let grayCode = getHeadings(2 ** parseInt(variables));
  let indexArray = [];
  for (let i = 0; i < grayCode.length; i++) {
    indexArray.push(parseInt(grayCode[i], 2));
  }
  let kMapArray = [];
  for (let i = 0; i < indexArray.length; i++) {
    kMapArray.push(parseInt(output[indexArray[i]]));
  }

  return (
    <>
      <div className="container simplify">{simplify}</div>
      <Kmap variables={variables} KmapArray={kMapArray} />
    </>
  );
}
