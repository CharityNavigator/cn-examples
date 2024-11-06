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
    $beacons: [String!]!
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
      beacons: $beacons
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
        cause
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

const queryBulkRatings = gql`
  query BulkRatings(
    $states: [String!]!
    $sizes: [String!]!
    $causes: [String!]!
    $ratings: [String!]!
    $c3: Boolean!
    $beacons: [String!]!
    $advisories: [String!]!
    $resultSize: Int!
    $afterEin: String!
  ) {
    bulkRatings(
      states: $states
      sizes: $sizes
      causes: $causes
      ratings: $ratings
      c3: $c3
      beacons: $beacons
      advisories: $advisories
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
        cause
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

module.exports = {
  querySearchFaceted,
  queryBulkRatings,
};
