export const userTypeDefs = `
scalar JSON

enum CommunicationMethod {
    Email
    Phone
    SMS
    Mail
    InPerson
}

enum PreferredLanguage {
    English
    Tamil
    Spanish
    French
    German
    Chinese
    Japanese
    Other
}

enum MaritalStatus {
    Single
    Married
    Divorced
    Widowed
    Separated
}

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

type UserInfo {
    userId: String!
    firstName: String!
    middleName: String
    lastName: String!
    contact: UserContact!
    demographics: UserDemographics!
}

type UserContact {
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

type UserDemographics {
    occupation: String
    employer: String
    income: Int
    taxIdentificationNumber: String
    accountReferences: JSON
    maritalStatus: MaritalStatus
    spouseName: String
    numberOfDependents: Int
    educationLevel: String
    preferredLanguage: PreferredLanguage
    emergencyContactName: String
    emergencyContactNumber: String
    creditScore: Int
    preferredCommunicationMethod: CommunicationMethod
}

input UserDemographicsInput {
    occupation: String
    employer: String
    income: Int
    taxIdentificationNumber: String
    accountReferences: JSON
    maritalStatus: MaritalStatus
    spouseName: String
    numberOfDependents: Int
    educationLevel: String
    preferredLanguage: PreferredLanguage
    emergencyContactName: String
    emergencyContactNumber: String
    creditScore: Int
    preferredCommunicationMethod: CommunicationMethod
}

input saveUserCardInput {
    cardNumber: String
    expirationDate: String
    cvv: String
}

type saveUserCard {
    cardNumber: String
    expirationDate: String
    cvv: String
}

type Query {
    greet: String
    getUser(userId: String!): UserInfo!
}

type Mutation {
    createUser(input: CreateUserInput): User!
    saveUserDemographics(userId: String!, userDemographics: UserDemographicsInput): UserInfo!
    savecardDetails(userId: String!, input: saveUserCardInput!): saveUserCard!
}
`;
