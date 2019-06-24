import gql from 'graphql-tag';

export default gql`
    query GetPrimaryHousehold {
        primaryHousehold {
            id
            rent
            rentDueDate
        }
    }
`