import gql from 'graphql-tag';

export default gql`
    query MakePrimaryHouseholdFor($userId: ID!, $householdId: ID!) {
        makePrimaryHouseholdFor(userId: $userId, householdId: $householdId) {
            id
            username
            primaryHousehold
        }
    }
`