const fs = require("fs/promises");

const safeCSVString = (str) => {
  if (!str) return str;

  return `"${str.replace(/"/g, '""')}"`;
};

const appendFile = async (name, results) => {
  const lines = results.map((result) => {
    const {
      ein,
      name,
      mission,
      organization_url,
      charity_navigator_url,
      encompass_score,
      encompass_star_rating,
      encompass_publication_date,
      cause,
      street,
      street2,
      city,
      state,
      zip,
      country,
      highest_level_alert,
    } = result;

    return `${safeCSVString(ein)},${safeCSVString(name)},${safeCSVString(
      mission
    )},${safeCSVString(organization_url)},${safeCSVString(
      charity_navigator_url
    )},${safeCSVString(encompass_score)},${safeCSVString(
      encompass_star_rating
    )},${safeCSVString(encompass_publication_date)},${safeCSVString(
      cause
    )},${safeCSVString(street)},${safeCSVString(street2)},${safeCSVString(
      city
    )},${safeCSVString(state)},${safeCSVString(zip)},${safeCSVString(
      country
    )},${safeCSVString(highest_level_alert)}\n`;
  });

  await fs.appendFile(name, lines.join(""));
};

// create a new CSV file with the given name; overwrites any existing file
// returns an object with an append method that takes an array of results
const newCSVFile = async (name) => {
  const headers =
    "ein,name,mission,organization_url,charity_navigator_url,encompass_score,encompass_star_rating,encompass_publication_date,cause,street,street2,city,state,zip,country,highest_level_alert\n";
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
