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
          placeholder="Leave a comment here"
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
