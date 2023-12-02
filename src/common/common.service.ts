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

  private static readonly algorithm = "aes-256-ctr";
  private static readonly encoding = "utf-8";

  private static readonly key = Buffer.from(
    process.env.ENCRYPTION_HEX_KEY as string,
    "hex",
  );
  private static readonly iv = Buffer.from(
    process.env.ENCRYPTION_HEX_IV as string,
    "hex",
  );

  public encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      CommonService.algorithm,
      CommonService.key,
      CommonService.iv,
    );
    let encrypted = cipher.update(text, CommonService.encoding, "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  public decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(
      CommonService.algorithm,
      CommonService.key,
      CommonService.iv,
    );
    let decrypted = decipher.update(
      encryptedText,
      "hex",
      CommonService.encoding,
    );
    decrypted += decipher.final(CommonService.encoding);
    return decrypted;
  }

  public maskCreditCard = (encryptedString: string): string => {
    console.log("entered the mask credit");
    const decryptedString = this.decrypt(encryptedString);
    console.log("decrption code");
    const lastFourDigits = decryptedString.slice(-4);
    const maskedString = "**** **** **** " + lastFourDigits;
    return maskedString;
  };
}
