import { useState } from "react";
import LogicOutput from "./logicOutput";

export default function LogicExpression() {
  const [logicXp, setLogicXp] = useState("");
  const handleLogicEntry = (e) => {
    setLogicXp(e.target.value);
  };
  return (
    <>
      <br />
      <br />
      <br />
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="00:1&#10;01:0&#10;10:0&#10;11:1"
          id="floatingTextarea"
          value={logicXp}
          onChange={handleLogicEntry}
        ></textarea>
      </div>
      <br />
      <LogicOutput expression={logicXp} />
    </>
  );
}
