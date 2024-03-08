# CN API Search Example with Pagination

This example uses the Charity Navigator API publicSearchFaceted endpoint to search
for nonprofits with filters, using pagination to retrieve all results

## Environment Variables

You will need to define the following environment variables:

```
API_URL=https://data.charitynavigator.org/graphql
API_KEY=xxx
```

## Usage

To run the script type:

```
npm start
```

This will run index.js which is the main entry point of the example. It sets a few filters and then calls the search function to retrieve the first page of results. It then calls the search function again with the next page token to retrieve the next page of results. After completion, the result set is written to the console.
