import { useRef, useState } from "react";

export function MyEditor() {
  const [state, setValue] = useState({ value: "" });

  //1
  const myRef = useRef(undefined);

  const inputsHandler = (e) => {
    var taxt = e.target.innerHTML;
    let textArray = taxt.split(/\n/gm);
    // console.log(textArray);
    setValue({ value: e.target.value });
  };

  return (
    <div>
      <textarea
        type="text"
        ref={myRef}
        name="first_name"
        onChange={inputsHandler}
        value={state.value}
      />
      <button
        onClick={() => {
          let textVal = myRef.current;
          let cursorStart = textVal?.selectionStart;
          let cursorEnd = textVal?.selectionEnd;
          let selectedText = state.value.substring(cursorStart, cursorEnd);
          console.log(selectedText);
        }}
      >
        Log
      </button>
    </div>
  );
}
