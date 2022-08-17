import "./style.css";

function EnterCode(props) {
  const { setCode, code, enter } = props;
  const change = (e, i) => {};

  const onEnter = (e, i) => {
    if (e.key >= 0 && e.key < 10) {
      let a = [...code];
      a[i] = e.key;
      setCode(a);

      if (i !== 5) document.getElementById("inp" + (i + 1)).focus();
    }
    if (e.keyCode === 13) enter();
  };

  return (
    <div>
      {code.map((el, i) => (
        <input
          type="number"
          // onChange={(e) => change(e, i)}
          min="0"
          max="9"
          value={el}
          id={"inp" + i}
          className="m-1 input-code"
          onKeyDown={(e) => onEnter(e, i)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}

export default EnterCode;
