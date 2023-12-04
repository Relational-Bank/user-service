import { trim } from "lodash";
import { Logger } from "../plugins/logging.plugin";
import * as crypto from "crypto";

export class CommonService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z]{2,}$/;

    return nameRegex.test(name);
  };

  public isValidZipCode = (zipCode: string): boolean => {
    const cleanedZipCode = trim(zipCode);

    const zipCodePattern = /^\d{5}(?:-\d{4})?$/;

    return zipCodePattern.test(cleanedZipCode);
  };

  public isValidatePhoneNumber = (phoneNumber: string): boolean => {
    const sanitizedPhoneNumber = trim(phoneNumber);

    const phoneNumberRegex = /^\d{10}$/;

    return phoneNumberRegex.test(sanitizedPhoneNumber);
  };

  public isValidCardNumber = (inputString: string): boolean => {
    const stringWithoutSpaces = inputString.replace(/\s/g, "");

    return /^\d{16}$/.test(stringWithoutSpaces);
  };
}
