//
// calls the graph and implements pagination to keep calling the graph
// until all results are returned
//
const { apiSearchFaceted } = require("./lib/cnapi");

async function getNextPage(searchParams, page, pageSize) {
  const query = { ...searchParams, page, pageSize };

  const searchResults = await apiSearchFaceted(query);
  console.log("searchResults: ", searchResults);
  const searchFaceted = searchResults.data?.publicSearchFaceted;
  return searchFaceted;
}

function hasMorePages(searchFaceted) {
  const { from, size, result_count } = searchFaceted;

  console.log("from: ", from, "size: ", size, "result_count: ", result_count);
  if (from + size >= result_count) {
    return false;
  }

  return true;
}

async function run() {
  const PAGE_SIZE = 200;
  let page = 1;

  const query = {
    causes: ["Medical education", "Nursing education", "Health"],
    rating: "1+",
    states: ["AL", "AK", "FL", "OH", "WY", "WI"],
  };

  console.log("getting first page");

  let searchFaceted = await getNextPage(query, page, PAGE_SIZE);
  let results = searchFaceted.results;

  while (hasMorePages(searchFaceted)) {
    page++;

    console.log("getting next page starting at ", (page - 1) * PAGE_SIZE);
    searchFaceted = await getNextPage(query, page, PAGE_SIZE);
    results = results.concat(searchFaceted.results);
    console.log(results.length, " results so far"); 
    process.exit(0);
  }

  console.log("results: ", results);
}

run();
