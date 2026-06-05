const fs = require("fs/promises");

const safeCSVString = (str) => {
  if (!str) return str;

  return `"${str.replace(/"/g, '""')}"`;
};

const appendFile = async (name, results) => {
  const lines = results.map((result) => {
    const {
      ein,
      size,
      encompass_score,
      encompass_star_rating,
      highest_level_alert,
    } = result;


    return `${safeCSVString(ein)},${safeCSVString(size)},${safeCSVString(
      encompass_score
    )},${safeCSVString(encompass_star_rating)},${safeCSVString(
      highest_level_alert
    )}\n`;
  });

  await fs.appendFile(name, lines.join(""));
};

// create a new CSV file with the given name; overwrites any existing file
// returns an object with an append method that takes an array of results
const newCSVFile = async (name) => {
  const headers =
    "ein,size,cn_score,cn_star_rating,cn_highest_level_alert\n";
  await fs.writeFile(name, headers);

  return {
    append: async (results) => {
      await appendFile(name, results);
    },
  };
};

module.exports = {
  newCSVFile,
};
