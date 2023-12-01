import {
  CommunicationMethod,
  MaritalStatus,
  PreferredLanguage,
} from "../enums/user.enum";

export type createUserInput = {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  homeNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  zipCode: string;
};

export type User = {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  homeNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  zipCode: string;
};

export type UserInfo = {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  contact: UserContact;
  demographics: UserDemographics;
};

export type UserContact = {
  phoneNumber: string;
  homeNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  zipCode: string;
};

export type UserDemographics = {
  occupation?: string;
  employer?: string;
  income?: number;
  taxIdentificationNumber?: string;
  accountReferences?: Record<string, any>;
  maritalStatus?: MaritalStatus;
  spouseName?: string;
  numberOfDependents?: number;
  educationLevel?: string;
  preferredLanguage?: PreferredLanguage;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  creditScore?: number;
  preferredCommunicationMethod?: CommunicationMethod;
};

export type validateUserInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  homeNumber?: string;
  zipCode: string;
};

export type userDemographics = {
  occupation?: string;
  employer?: string;
  income?: number;
  taxIdentificationNumber?: string;
  accountReferences?: Record<string, any>;
  maritalStatus?: MaritalStatus;
  spouseName?: string;
  numberOfDependents?: number;
  educationLevel?: string;
  preferredLanguage?: PreferredLanguage;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  creditScore?: number;
  preferredCommunicationMethod?: CommunicationMethod;
};

export type saveUserCard = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};
