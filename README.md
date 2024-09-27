# Accessing Charity Navigator’s Data API

### Step 1: Create an Account through Charity Navigator’s API Developer Portal

1.	Visit Charity Navigator’s developer portal, hosted on Stellate, by going to http://data.charitynavigator.org. Follow the “Getting Started” guide to create a developer account.
2.	After creating your account, you will be provided with an API key. Safeguard this key—it is required for API access.
3.	Once your account is set up, you can begin querying Charity Navigator’s GraphQL API.

### Step 2: Query the publicly available dataset

1.	To authenticate API requests, include a header labeled `Stellate-Api-Token` and set its value to your API key for every request.
2.	Your default access includes the `publicSearchFaceted` query, which allows for searching and filtering nonprofits. This query returns essential nonprofit attributes, including their Charity Navigator rating. Below is a fully functional example to get started.

## API Search Example with Pagination

This example uses the Charity Navigator API publicSearchFaceted endpoint to search
for nonprofits with filters, using pagination to retrieve all results

### Environment Variables

You will need to define the following environment variables:

```
API_URL=https://data.charitynavigator.org/graphql
API_KEY=xxx
```

### Usage

To run the script type:

```
npm i
npm start
```

This will run index.js which is the main entry point of the example. It sets a few filters and then calls the search function to retrieve the first page of results. It then calls the search function again with the next page token to retrieve the next page of results. After completion, the result set is written to the console.
