//
// the main entry point for calling the graphql api
// uses the Apollo client library to make the graph call
//
const {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} = require("@apollo/client/core");
const { setContext } = require("@apollo/client/link/context");

const { querySearchFaceted, queryBulkNonprofits } = require("./query");
const { getIncludedRatings, getIncludedSizes } = require("./filters");

const apiUrl = process.env.API_URL ?? "";
const apiKey = process.env.API_KEY ?? "";
const apiCustomerKey = process.env.API_CUSTOMER_KEY ?? undefined;

function apiInit(apiUrl, apiKey) {
  const cache = new InMemoryCache();

  console.log(`apiInit: apiUrl: ${apiUrl}`);
  console.log(`apiInit: apiCustomerKey: ${apiCustomerKey}`);
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        "Stellate-Api-Token": apiKey,
        "x-api-key": apiCustomerKey,
      },
    };
  });
  console.log(authLink);

  const httpLinkPrimary = createHttpLink({
    uri: `${apiUrl}`,
  });
  const cnApiPrimary = new ApolloClient({
    link: authLink.concat(httpLinkPrimary),
    cache: cache,
  });

  return cnApiPrimary;
}

const cnApiPrimary = apiInit(apiUrl, apiKey);

/**
 * wrap the graph query with a function that automatically tries url
 */
async function gqlQuery(gql, vars) {
  const query = await cnApiPrimary
    .query({
      query: gql,
      variables: vars,
    })
    .catch((err) => {
      console.error("error calling primary graphql api: ", vars);
      console.error(JSON.stringify(err));
      return undefined;
    });

  return query;
}

async function gqlQueryRetry(gql, vars, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const result = await gqlQuery(gql, vars);
    if (result) {
      return result;
    } else {
      console.log(`retrying ${i + 1} of ${retries}`);
    }
  }

  return undefined;
}

async function apiSearchFaceted(query) {
  const searchTerm = query.q;
  const rating = query.rating;
  const c3 = query.c3;
  const page = query.page ? Number(query.page) : 1;
  const pageSize = Number(query.pageSize ?? 10);
  const sort = query.sort;

  const causes =
    typeof query.causes === "string" ? [query.causes] : query.causes;
  const beacons =
    typeof query.beacons === "string" ? [query.beacons] : query.beacons;
  const states =
    typeof query.states === "string" ? [query.states] : query.states;
  const sizes = getIncludedSizes(query.sizes);
  const advisories =
    typeof query.advisories === "string"
      ? [query.advisories]
      : query.advisories;

  const variables = {
    term: searchTerm || "",
    states: states ?? [],
    sizes: sizes ?? [],
    causes: causes ?? [],
    ratings: getIncludedRatings(rating),
    c3: c3 ? JSON.parse(c3) : false,
    from: Math.max((page - 1) * pageSize, 0),
    result_size: pageSize,
    beacons: beacons ?? [],
    advisories: advisories ?? [],
    orderBy: sort?.[0] ? sort[0] : "",
  };

  console.log("calling graphql with args: ", variables);

  const result = await gqlQuery(querySearchFaceted, variables);

  return result;
}

async function apiBulkNonprofits(query) {
  const rating = query.rating;
  const c3 = query.c3;
  const page = query.page ? Number(query.page) : 1;
  const resultSize = Number(query.resultSize ?? 1000);
  const afterEin = query.afterEin;

  const causes =
    typeof query.causes === "string" ? [query.causes] : query.causes;
  const beacons =
    typeof query.beacons === "string" ? [query.beacons] : query.beacons;
  const states =
    typeof query.states === "string" ? [query.states] : query.states;
  const sizes = getIncludedSizes(query.sizes);
  const advisories =
    typeof query.advisories === "string"
      ? [query.advisories]
      : query.advisories;

  const variables = {
    states: states ?? [],
    sizes: sizes ?? [],
    causes: causes ?? [],
    ratings: getIncludedRatings(rating),
    c3: c3 ? JSON.parse(c3) : false,
    beacons: beacons ?? [],
    advisories: advisories ?? [],
    resultSize: resultSize,
    afterEin: afterEin,
  };

  console.log("calling graphql with args: ", variables);

  const result = await gqlQueryRetry(queryBulkNonprofits, variables);

  return result;
}

module.exports = {
  apiSearchFaceted,
  apiBulkNonprofits,
};
