import { DBConnection } from "../resources/dataSource";
import { forEach, isEmpty, pick } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "../plugins/logging.plugin";

import { logEvent } from "../common/logEvent.enum";
import { UserEntity } from "../entities/user.entity";
import { User, UserDemographics, UserInfo, createUserInput, validateUserInfo } from "../types/user.type";
import { ValidationService } from "../common/validations";
import { ErrorCode } from "../common/ErrorCode.enum";
import { ContactEntity } from "../entities/contact.entity";
import { SelectQueryBuilder } from "typeorm";
import { UserDemographicsEntity } from "../entities/userDemographics.entity";

export class UserService {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public createUser = async (input: createUserInput) => {
        try {
            const userRepo = DBConnection.getRepository(UserEntity);
            const conactRepo = DBConnection.getRepository(ContactEntity);

            const { firstName, lastName, phoneNumber, zipCode, homeNumber } = input;

            this.validateUserPayload({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                zipCode: zipCode,
                homeNumber: homeNumber,
            });

            const savedUser = await userRepo.save({
                userId: uuidv4(),
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName,
            });

            const newContact = await conactRepo.save({
                contactId: uuidv4(),
                phoneNumber: input.phoneNumber,
                homeNumber: input.homeNumber,
                addressLine1: input.addressLine1,
                addressLine2: input.addressLine2,
                city: input.city,
                district: input.district,
                state: input.state,
                country: input.country,
                zipCode: input.zipCode,
                user: savedUser,
            });

            const UserPayload = this.prepareUserPayload({
                userPayload: savedUser,
                userContactPayload: newContact,
            });

            return UserPayload;
        } catch (error) {
            this.logger.log({
                action: logEvent.createUser,
                message: "Failed to create user",
                error: JSON.stringify(error),
                context: {
                    payload: JSON.stringify(input)
                }
            });

            throw error;
        }
    };

    private prepareUserPayload = ({
        userPayload,
        userContactPayload,
    }: {
        userPayload: UserEntity;
        userContactPayload: ContactEntity;
    }) => {
        try {
            const {
                addressLine1,
                addressLine2,
                city,
                country,
                district,
                phoneNumber,
                state,
                zipCode,
                homeNumber,
            } = userContactPayload;

            const user: User = {
                ...userPayload,
                addressLine1,
                addressLine2,
                city,
                country,
                district,
                phoneNumber,
                state,
                zipCode,
                homeNumber,
            };

            return user;
        } catch (error) {
            this.logger.log({
                action: logEvent.createUser,
                message: "Failed to create user",
                error: JSON.stringify(error),
                context: {
                    userPayload: JSON.stringify(userPayload),
                    userContactPayload: JSON.stringify(userContactPayload)
                }
            });

            throw error;
        }
    };

    private validateUserPayload = (userInfoPayload: validateUserInfo) => {
        try {
            const validationService = new ValidationService(this.logger);

            const namesToValidate = pick(userInfoPayload, ["firstName", "lastName"]);

            forEach(namesToValidate, (nameValue, nameField) => {
                if (nameValue === undefined) {
                    const customError = {
                        action: logEvent.validateUserInfo,
                        message: `Please enter the required '${nameField}' : ${nameValue}`,
                        error: ErrorCode.missingRequiredField,
                        context: {
                            nameField: nameField,
                            nameValue: nameValue,
                        }
                    };

                    this.logger.log(customError);
                    throw new Error(customError.message);
                }

                const isValidName = validationService.validateName(nameValue);

                if (isValidName === false) {
                    const customError = {
                        action: logEvent.validateUserInfo,
                        message: `Please enter a valid ${nameField} : ${nameValue}`,
                        error: ErrorCode.invalidInput,
                        context: {
                            nameField: nameField,
                            nameValue: nameValue,
                        }
                    };
                    this.logger.log(customError);
                    throw new Error(customError.message);
                }
            });

            const isZipCodeValid = validationService.isValidZipCode(
                userInfoPayload.zipCode,
            );

            if (isZipCodeValid === false) {
                const customError = {
                    action: logEvent.validateUserInfo,
                    message: `Please enter a valid zip code : ${userInfoPayload.zipCode}`,
                    error: ErrorCode.invalidInput,
                    context: {
                        zipCode: userInfoPayload.zipCode,
                    }
                };
                this.logger.log(customError);
                throw new Error(customError.message);
            }

            const isValidPhoneNumber = validationService.isValidatePhoneNumber(
                userInfoPayload.phoneNumber,
            );

            if (isValidPhoneNumber === false) {
                const customError = {
                    action: logEvent.validateUserInfo,
                    message: `Please enter a valid phone number : ${userInfoPayload.phoneNumber}`,
                    error: ErrorCode.invalidInput,
                    context: {
                        MobileNumber: userInfoPayload.phoneNumber,
                    }
                };
                this.logger.log(customError);
                throw new Error(customError.message);
            }
        } catch (error) {
            this.logger.log({
                action: logEvent.validateUserInfo,
                message: "Failed to validate user info",
                error: JSON.stringify(error),
                context: {
                    payload: JSON.stringify(userInfoPayload)
                }
            });

            throw error;
        }
    };

    public getUser = async (userId: string): Promise<UserInfo> => {
        try {
            const userRepo = DBConnection.getRepository(UserEntity);

            const queryBuilder: SelectQueryBuilder<UserEntity> = userRepo
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.contacts", "contact")
                .leftJoinAndSelect("user.demographics", "demographics")
                .where("user.userId = :userId", { userId });

            const userInfo = await queryBuilder.getOne();

            if (!userInfo) {
                const customError = {
                    action: logEvent.getUserInfo,
                    message: `User not found for the userId: ${userId}`,
                    context: { userId }
                };
                this.logger.log(customError);

                throw new Error(customError.message);
            }

            const contacts = Array.isArray(userInfo.contacts) ? userInfo.contacts : [];
            const demographics = Array.isArray(userInfo.demographics) ? userInfo.demographics : [];

            const contact = contacts[0] || {};
            const demographic = demographics[0] || {};

            const formattedUserInfo: UserInfo = {
                userId: userInfo.userId,
                firstName: userInfo.firstName,
                middleName: userInfo.middleName,
                lastName: userInfo.lastName,
                contact: { ...contact },
                demographics: { ...demographic },
            };

            return formattedUserInfo;
        } catch (error) {
            this.logger.log({
                action: logEvent.getUserInfo,
                message: "Failed to fetch user",
                error: JSON.stringify(error),
                context: { userId }
            });

            throw error;
        }
    };


    public saveUserDemographics = async (
        {
            userId,
            userDemographics
        }: {
            userId: string,
            userDemographics: UserDemographics
        }
    ) => {
        try {
            const userRepo = DBConnection.getRepository(UserEntity);
            const userDemographicsRepo = DBConnection.getRepository(UserDemographicsEntity);

            const userRecord = await userRepo.findOne({ where: { userId } })

            if (isEmpty(userRecord)) {
                const customError = {
                    action: logEvent.getUserInfo,
                    message: `User not found for the userId: ${userId}`,
                    context: { userId }
                };
                this.logger.log(customError);

                throw new Error(customError.message);
            }

            const existingDemographics = await userDemographicsRepo.findOne({
                where: { user: userRecord }
            });

            if (existingDemographics) {
                await userDemographicsRepo.update(existingDemographics.id, userDemographics);
            } else {
                const newUserDemographics = userDemographicsRepo.create({
                    ...userDemographics,
                    user: userRecord
                });

                await userDemographicsRepo.save(newUserDemographics);
            }

        } catch (error) {
            this.logger.log({
                action: logEvent.saveUserDemographic,
                message: "Save user demographics",
                error: JSON.stringify(error),
                context: { userId, demographics: JSON.stringify(userDemographics) }
            });

            throw error;
        }
    };
}
