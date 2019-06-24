import gql from 'graphql-tag';

export default gql`
    query GetUser($userId: String!) {
        user(id: $userId) {
            firstName
        }
    }
`