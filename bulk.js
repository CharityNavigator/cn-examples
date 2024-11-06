//
// calls the bulk graph endpoint and will keep calling the graph
// until all results are returned.  writes the results to a csv file
//
const { apiBulkRatings } = require("./lib/cnapi");
const { newCSVFile } = require("./lib/csv");

async function getNext(searchParams, afterEin, resultSize) {
  const query = { ...searchParams, afterEin, resultSize };

  const searchResults = await apiBulkRatings(query);
  console.log("searchResults: ", searchResults);
  const bulkRatings = searchResults.data?.bulkRatings;
  return bulkRatings;
}

function hasMoreResults(bulkRatings) {
  const { requestSize, resultSize } = bulkRatings;

  console.log("request size: ", requestSize, "result size: ", resultSize);
  if (requestSize !== resultSize) {
    // when the request size doesn't match the result size, we've reached the end
    return false;
  }

  return true;
}

// the bulk api works by passing the last ein from the previous call
// results will returned starting after that ein
function getLastEin(bulkRatings) {
  const results = bulkRatings.results;

  const lastEin = results[results.length - 1].ein;
  return lastEin;
}

async function run() {
  const RESULT_SIZE = 5000; // this is the max result size
  const CSV_FILE = "bulk.csv";

  // set query filters (if any) here. no filters retrieves all results
  const query = {
    causes: ["Medical education", "Nursing education", "Health"],
    rating: "1+",
    states: ["AL", "AK", "FL", "OH", "WY", "WI"],
  };

  const file = await newCSVFile(CSV_FILE);

  console.log("getting first batch");

  let afterEin = "";
  let bulkRatings = await getNext(query, afterEin, RESULT_SIZE);
  let results = bulkRatings.results;
  let total = results.length;

  await file.append(results);

  while (hasMoreResults(bulkRatings)) {
    afterEin = getLastEin(bulkRatings);

    console.log("getting next batch starting after ", afterEin);
    bulkRatings = await getNext(query, afterEin, RESULT_SIZE);
    results = bulkRatings.results;
    total += results.length;
    console.log(total, " results so far");
    await file.append(results);
  }

  //console.log("results: ", results);
}

run();
