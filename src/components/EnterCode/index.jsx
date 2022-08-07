import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function EnterCode(props) {
  const { setCode, code, enter } = props;
  console.log(props);
  const change = (e, i) => {
    if (e.target.value >= 0 && e.target.value < 10) {
      let a = [...code];
      a[i] = e.target.value;
      setCode(a);
    }
  };

  const onEnter = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) enter();
  };

  return (
    <div>
      {code.map((el, i) => (
        <input
          type="number"
          onChange={(e) => change(e, i)}
          min="0"
          max="9"
          value={el}
          className="m-1"
          onKeyDown={(e) => onEnter(e)}
        />
      ))}
    </div>
  );
}

export default EnterCode;
