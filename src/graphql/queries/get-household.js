import gql from 'graphql-tag';

export default gql`
    query GetHousehold($id: ID!) {
        household(id: $id) {
            id
            rent
        }
    }
`