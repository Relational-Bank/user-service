export const userTypeDefs = `
input CreateUserInput {
    firstName: String!
    middleName: String
    lastName: String!
    phoneNumber: String!
    homeNumber: String
    addressLine1: String!
    addressLine2: String
    city: String!
    district: String!
    state: String!
    country: String!
    zipCode: String!
}

type User {
    userId: String!
    firstName: String!
    middleName: String
    lastName: String!
    phoneNumber: String!
    homeNumber: String
    addressLine1: String!
    addressLine2: String
    city: String!
    district: String!
    state: String!
    country: String!
    zipCode: String!
}

type Query {
    greet: String
}

type Mutation {
    createUser(input: CreateUserInput): User!
}
`;
