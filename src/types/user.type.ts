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

export type validateUserInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  homeNumber?: string;
  zipCode: string;
};
