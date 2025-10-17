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
      beacons,
    } = result;

    let beaconColumns = "";
    let beaconCount = 0;
    if (beacons && beacons.length > 0) {
      for (const beacon of beacons) {
        if (beacon.score) {
          beaconCount++;
        }

        beaconColumns += `, ${beacon.score ? beacon.score : ""},${
          beacon.weight ? beacon.weight : ""
        }`;
      }
    }

    return `${safeCSVString(ein)},${safeCSVString(size)},${safeCSVString(
      encompass_score
    )},${safeCSVString(encompass_star_rating)},${safeCSVString(
      highest_level_alert
    )},${beaconCount}${beaconColumns}\n`;
  });

  await fs.appendFile(name, lines.join(""));
};

// create a new CSV file with the given name; overwrites any existing file
// returns an object with an append method that takes an array of results
const newCSVFile = async (name) => {
  const headers =
    "ein,size,cn_score,cn_star_rating,cn_highest_level_alert,cn_beacons,cn_af_score,cn_af_weight,cn_ir_score,cn_ir_weight,cn_cc_score,cn_cc_weight,cn_la_score,cn_la_weight\n";
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
