exports.typeDefs=`

type Homeless {
  id: ID
  name: String!
  ssn: Int!
}

type Donar {
  id: ID
  username: String! @unique
  password: String!
  email: String!
  amount: Int
  stripeId: String
  type: String
  ccLast4: String
}

type Coordinate {
  lat: Float!
  log: Float!
}

type Shelter {

  id: ID
  name: String!
  availability: Boolean!
  coordinates:[Coordinate!]!

}

type ServiceCenter {

  id: ID
  name: String!
  availability: Boolean!
  coordinates:[Coordinate!]!
  foodService: Boolean!
  clotheService: Boolean!

}

type Query {
  getAllShelter: [Shelter]!
  getAllFoodCenter: [ServiceCenter]!
  getAllClothCenter: [ServiceCenter]!
  getDonar: Donar
}

type Mutation {
  addShelter(data: ShelterDesc): Shelter!
  addServiceCenter(data: CenterDesc): ServiceCenter!
  register(data: User): Boolean!
  login(data: LoginUser): Donar
  homelessLogin(data: LoginHomeless): Homeless
  createSubscription(data : Sub): Donar
  changeCreaditCard(data : Sub): Donar
  cancelSubscription: Donar
  registerHomeless(data: LoginHomeless): Boolean
}

input LoginUser {
  username: String!
  password: String!
}

input Sub{
  source:String!
  email: String!
  userId:String!
  amount: Int!
}

input User {
  username: String!
  email: String!
  password: String!
}

input LoginHomeless {
    name: String!
    ssn: Int!
}

input ShelterDesc {
  name: String!
  availability: Boolean!
  coordinates:[coordinateInput!]!
}

input coordinateInput {
  lat: Float!
  log: Float!
}

input CenterDesc {
  name: String!
  availability: Boolean!
  coordinates:[coordinateInput]!
  foodService: Boolean!
  clotheService: Boolean!
}
`;
