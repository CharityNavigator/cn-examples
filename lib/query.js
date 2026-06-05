// the graph query we will use for search - defines the inputs and outputs
const { gql } = require("@apollo/client/core");

const querySearchFaceted = gql`
  query PublicSearchFaceted(
    $term: String!
    $states: [String!]!
    $sizes: [String!]!
    $causes: [String!]!
    $ratings: [String!]!
    $c3: Boolean!
    $result_size: Int!
    $from: Int!
    $advisories: [String!]!
    $orderBy: String!
  ) {
    publicSearchFaceted(
      term: $term
      states: $states
      sizes: $sizes
      causes: $causes
      ratings: $ratings
      c3: $c3
      result_size: $result_size
      from: $from
      advisories: $advisories
      order_by: $orderBy
    ) {
      size
      from
      term
      result_count
      results {
        ein
        name
        mission
        organization_url
        charity_navigator_url
        encompass_score
        encompass_star_rating
        encompass_publication_date
        causes
        street
        street2
        city
        state
        zip
        country
        highest_level_alert
      }
    }
  }
`;

const queryBulkNonprofits = gql`
  query BulkNonprofits(
    $states: [String!]!
    $sizes: [String!]!
    $causes: [String!]!
    $ratings: [String!]!
    $c3: Boolean!
    $alerts: [String!]!
    $resultSize: Int!
    $afterEin: String!
  ) {
    bulkNonprofits(
      states: $states
      sizes: $sizes
      causes: $causes
      ratings: $ratings
      c3: $c3
      alerts: $alerts
      resultSize: $resultSize
      afterEin: $afterEin
    ) {
      requestSize
      resultSize
      results {
        ein
        name
        mission
        organization_url
        charity_navigator_url
        encompass_score
        encompass_star_rating
        encompass_publication_date
        causes
        street
        street2
        city
        state
        zip
        country
        highest_level_alert
        size
      }
    }
  }
`;

module.exports = {
  querySearchFaceted,
  queryBulkNonprofits,
};
