export const blank = {
  _lastUpdated: null,
  doWhats: [{ do: "", what: "", uid: "0" }],
  jots: [],
  tide: { topic: [], body: [], ending: [] },
  revisions: [],
  doc: { draft: [{ type: "paragraph", children: [{ text: " " }] }] },
};

const reducer = (work, action) => {
  // console.info("reducer", action);
  let newProduct = { ...work };

  switch (action.type) {
    case "init": {
      // Create empty work
      return blank;
    }

    // Something
    case "updateSomething": {
      newProduct.something = action.payload.gist;
      return newProduct;
    }

    // Default
    default: {
      console.error("Bad reducer action:", action);
    }
  }
  return work;
};

export default reducer;
