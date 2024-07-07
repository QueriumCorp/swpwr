import { type ClassValue, clsx } from "clsx";
import { convertLatexToSpeakableText } from "mathlive";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// converts LaTeX in a string into a vocalizable string
export function makeVocalizable(text: string) {
  // inline LaTeX delimiters "\\(", "\\)"
  // display LaTeX delimiters "$$", "$$"
  console.info("makeVocalizable");
  // split into plain and latex chunks
  let chunks = [];
  let index = 0;
  while (index !== -1) {
    let start = text.indexOf("\\(", index);
    let end = text.indexOf("\\)", index);

    if (start !== -1 && end !== -1) {
      chunks.push(text.slice(index, start));
      chunks.push(text.slice(start + 1, end));
      index = end + 1;
    } else {
      break;
    }
  }
  console.info("chunks:", chunks);

  return text;

  //   if (start !== -1 && end !== -1) {
  //     chunks.push(text.slice(index, start));
  //     chunks.push(text.slice(start + 1, end));
  //     index = end + 1;
  //   } else {
  //     break;
  //   }

  // }

  // let firstStart = text.indexOf("$$");
  // let firstEnd = text.indexOf("$$", firstStart + 1);
  // let firstPart = text.slice(0, firstStart);
  // let firstMath = text.slice(firstStart + 1, firstEnd);
  // let secondStart = text.indexOf("$$", firstEnd + 1);
  // let secondEnd = text.indexOf("$$", secondStart + 1);
  // let secondPart = text.slice(firstEnd + 1, secondStart);
  // console.log("makeVocalizable", text);
  // console.log("makeVocalizable", text, firstStart, firstEnd);
  // console.log(
  //   "firstPart",

  //   firstPart,
  // );
  // console.log("firstMath", firstMath);
  // console.log(
  //   "secondPart",

  //   secondStart,
  // );
  // console.log(firstPart + convertLatexToSpeakableText(firstMath) + secondPart);
  // return firstPart + convertLatexToSpeakableText(firstMath) + secondPart;
}

function regexIndexOf(string: string, regex: RegExp, startpos: number) {
  var indexOf = string.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
}

function regexLastIndexOf(string: string, regex: RegExp, startpos: number) {
  regex = regex.global
    ? regex
    : new RegExp(
        regex.source,
        "g" + (regex.ignoreCase ? "i" : "") + (regex.multiline ? "m" : ""),
      );
  if (typeof startpos == "undefined") {
    startpos = string.length;
  } else if (startpos < 0) {
    startpos = 0;
  }
  var stringToWorkWith = string.substring(0, startpos + 1);
  var lastIndexOf = -1;
  var nextStop = 0;
  var result;
  while ((result = regex.exec(stringToWorkWith)) != null) {
    lastIndexOf = result.index;
    regex.lastIndex = ++nextStop;
  }
  return lastIndexOf;
}
