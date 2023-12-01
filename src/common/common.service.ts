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

  public encrypt(text: string): string {
    const algorithm = "aes-256-ctr";
    const passphrase = "your-passphrase";
    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, "sha256");

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, "utf-8"),
      cipher.final(),
    ]);
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  }

  public decrypt(text: string): string {
    const algorithm = "aes-256-ctr";
    const passphrase = "Blue#Jupiter$42!Secret";
    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, "sha256");

    const iv = crypto.randomBytes(16);
    const [ivString, encryptedText] = text.split(":");
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(ivString, "hex"),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, "hex")),
      decipher.final(),
    ]);
    console.log("decrypted", decrypted);

    console.log("string", decrypted.toString("utf-8"));

    return decrypted.toString("utf-8");
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
