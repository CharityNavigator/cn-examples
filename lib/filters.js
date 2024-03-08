// helper functions to map ratings and org sizes to the filter values for search

const getIncludedRatings = (value) => {
  switch (value) {
    case "1+": {
      return ["1", "2", "3", "4"];
    }
    case "2+": {
      return ["2", "3", "4"];
    }
    case "3+": {
      return ["3", "4"];
    }
    case "Not Rated": {
      return ["N/A", "N/E"];
    }
    default: {
      return value ? [value] : [];
    }
  }
};

const getIncludedSizes = (sizes) => {
  let result = [];

  if (typeof sizes === "string") {
    result = [sizes.replace("-sized", "").replace("-size", "").toLowerCase()];
  } else if (Array.isArray(sizes)) {
    sizes = sizes.map((size) => {
      const x = size;
      return x.replace("-sized", "").replace("-size", "").toLowerCase();
    });
  }

  return result;
};

module.exports = {
  getIncludedRatings,
  getIncludedSizes,
};
