import gql from 'graphql-tag';

export default gql`
    query LoginWith($username: String!, $password: String!) {
        loginWith(username: $username, password: $password) {
            id
            firstName
        }
    }
`