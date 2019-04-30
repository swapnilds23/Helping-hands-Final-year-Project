import { gql } from 'apollo-boost';

//Shelter Queries
export const GET_ALL_SHELTER = gql`

  query{
      getAllShelter {
        id
        name
        availability
        coordinates{
          lat
          log
        }
      }
    }
`;

//Shelter Mutations

//ServiceCenter Queries
export const GET_ALL_FOODCENTER = gql`

query{
  getAllFoodCenter{
      id
      name
      availability
      foodService
      clotheService
      coordinates{
        lat
        log
      }
  }
}
`;

export const GET_ALL_CLOTHCENTER = gql`

query{
    getAllClothCenter{
          id
          name
          availability
          foodService
          clotheService
          coordinates{
            lat
            log
          }
    }
}
`;
//Donar Mutation
export const LOGIN_DONAR = gql`

    mutation($username: String!, $password: String!){
      login( data: {
                         username: $username
                         password: $password
                       }
      ) {
        id
      }
    }
`;

export const REGISTER_DONAR = gql`

    mutation($username: String!, $email: String!, $password: String!){
       register(data: {
                          username: $username
                          email: $email
                          password: $password
 	                      }
          )
    }
`;

export const DONAR_SUBSCRIPTION = gql`

    mutation($source: String!, $email: String!, $userId: String!, $amount: Int!){
       createSubscription(data:{
                                  source: $source
                                  email: $email
                                  userId: $userId
                                  amount: $amount
                               }
          ){
            id
            email
            username
          }
    }
`;
export const CHARGES = gql`
  mutation($source: String!, $email: String!, $userId: String!, $amount: Int!){
   createCharges(data:{
                              source: $source
                              email: $email
                              userId: $userId
                              amount: $amount
                           }
      ){
        id
        email
        username
      }
}
`;

export const UPDATE_CARD_DETAILS = gql`

    mutation($source: String!, $email: String!){
       changeCreaditCard( data:{
                                  source: $source
                                  email: $email
                               }
          ){
            id
            email
            type
            stripeId
          }
    }
`;

export const LOGIN_HOMELESS = gql`

    mutation($name: String!, $ssn: Int!){
      homelessLogin( data: {
                         name: $name
                         ssn: $ssn
                       }
      ) {
        id
      }
    }
`;
