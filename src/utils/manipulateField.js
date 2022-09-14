// This is sourced from Stepwise @ 7671

// See also https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_activeelement

// For inserting https://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field/48150864#48150864
export default function handleSoftKey(focused, text) {
  // this needs to be whatever field has focus or punt if the focus is not a field
  const inputField = focused;
  if (!inputField || inputField.tagName === "button") {
    console.error("handleSoftKey: NO FIELD SELECTED");
    return false;
  }

  const nSelStart = inputField.selectionStart;
  const nSelEnd = inputField.selectionEnd;
  const sOldText = inputField.value;

  switch (text) {
    case "&BKSP;":
      return deleteAtCaret(sOldText, nSelStart, nSelEnd);
    case "&LARR;":
      return moveCaretLeft(sOldText, nSelStart, nSelEnd);
    case "&RARR;":
      return moveCaretRight(sOldText, nSelStart, nSelEnd);
    default:
      return insertAtCaret(text, sOldText, nSelStart, nSelEnd);
  }
}

function deleteAtCaret(sOldText, nSelStart, nSelEnd) {
  let preStr = "";
  let postStr = "";
  let newStart = nSelStart;
  let newEnd = nSelEnd;
  let newStr = sOldText;

  if (nSelStart === nSelEnd && nSelStart === 0) {
    return false;
  }

  // if single insertion point
  if (nSelStart === nSelEnd) {
    preStr = sOldText.substring(0, nSelStart - 1);
    postStr = sOldText.substring(nSelEnd);
    newStr = preStr + postStr;
    newStart = newEnd = nSelStart - 1;
  } else {
    //selection
    preStr = sOldText.substring(0, nSelStart);
    postStr = sOldText.substring(nSelEnd);
    newStr = preStr + postStr;
    newStart = newEnd = nSelStart;
  }

  return { newStr, newStart, newEnd };
}

function insertAtCaret(text, sOldText, nSelStart, nSelEnd) {
  const openParenAt = text.indexOf("(");
  const closeParenAt = text.indexOf(")");
  const openAbsAt = text.indexOf("|");
  const closeAbsAt = text.lastIndexOf("|");
  let preStr = "";
  let bodyStr = "";
  let postStr = "";
  let newStart = 0;
  let newEnd = 0;
  let newStr = "";

  if (openParenAt !== -1 && closeParenAt === openParenAt + 1) {
    // enclose selected text in the parens
    preStr =
      sOldText.substring(0, nSelStart) + text.substring(0, openParenAt + 1);
    bodyStr =
      sOldText.substring(nSelStart, nSelEnd) + text.substring(closeParenAt);
    postStr = sOldText.substring(nSelEnd);
    if (nSelStart === nSelEnd) {
      newStart = newEnd = preStr.length;
    } else {
      newStart = newEnd = preStr.length + bodyStr.length;
    }
    newStr = preStr + bodyStr + postStr;
  } else if (openAbsAt !== -1 && closeAbsAt === openAbsAt + 1) {
    // enclose selected text in the parens
    preStr =
      sOldText.substring(0, nSelStart) + text.substring(0, openAbsAt + 1);
    bodyStr =
      sOldText.substring(nSelStart, nSelEnd) + text.substring(closeAbsAt);
    postStr = sOldText.substring(nSelEnd);
    if (nSelStart === nSelEnd) {
      newStart = newEnd = preStr.length;
    } else {
      newStart = newEnd = preStr.length + bodyStr.length;
    }
    newStr = preStr + bodyStr + postStr;
  } else {
    newStr =
      sOldText.substring(0, nSelStart) + text + sOldText.substring(nSelEnd);
    newStart = newEnd = nSelStart + text.length;
  }

  return { newStr, newStart, newEnd };
}

function moveCaretLeft(sOldText, nSelStart, nSelEnd) {
  let newStart = nSelStart;
  let newEnd = nSelEnd;
  let newStr = sOldText;

  if (nSelStart === nSelEnd && nSelStart === 0) {
    return false;
  }

  // if single insertion point
  if (nSelStart === nSelEnd) {
    newStart = newEnd = nSelStart - 1;
  } else {
    // move insertion point to beginning of selected range
    newStart = newEnd = nSelStart;
  }

  return { newStr, newStart, newEnd };
}

function moveCaretRight(sOldText, nSelStart, nSelEnd) {
  let newStart = nSelStart;
  let newEnd = nSelEnd;
  let newStr = sOldText;

  if (nSelStart === nSelEnd && nSelStart === sOldText.length) {
    return false;
  }

  // if single insertion point
  if (nSelStart === nSelEnd) {
    newStart = newEnd = nSelStart + 1;
  } else {
    // move insertion point to beginning of selected range
    newStart = newEnd = nSelEnd;
  }

  return { newStr, newStart, newEnd };
}
