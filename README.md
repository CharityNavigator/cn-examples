# Accessing Charity Navigator’s Data API

### Create an Account through Charity Navigator’s API Developer Portal

1. Visit Charity Navigator’s developer portal, https://developer.charitynavigator.org
2. After creating your account, you will be provided with an API key. Safeguard this key—it is required for API access.
3. Once your account is set up, you can begin querying Charity Navigator’s GraphQL API.

### Environment Variables

You will need to define the following environment variables:

```bash
API_URL=https://api.charitynavigator.org/graphql
API_KEY=xxx
```

Use the API key obtained from the Charity Navigator API Developer Portal

To authenticate API requests, include a header labeled `Authorization` and set its value to your API key for every request.

## API Search Example with Pagination

This example uses the Charity Navigator API publicSearchFaceted endpoint to search
for nonprofits with filters, using pagination to retrieve all results

### Query the publicly available dataset

Your default access includes the `publicSearchFaceted` query, which allows for searching and filtering nonprofits. This query returns essential nonprofit attributes, including their Charity Navigator rating. Below is a fully functional example to get started.

### Usage

To run the script type:

```bash
npm i
npm start
```

This will run index.js which is the main entry point of the example. It sets a few filters and then calls the search function to retrieve the first page of results. It then calls the search function again with the next page token to retrieve the next page of results. After completion, the result set is written to the console.

## API bulk nonprofit data

`bulk.js` provides an example of using the `BulkNonprofits` endpoint.

### Usage

```bash
node bulk.js
```

This script shows an example of loading bulk data with filters applied. It writes the contents of the bulk data to a CSV file.
