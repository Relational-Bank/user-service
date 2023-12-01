import { Logger } from "../../plugins/logging.plugin";
import { UserService } from "../../services/user.service";
import { UserDemographics, createUserInput } from "../../types/user.type";

const logger = new Logger();

export const userResolver = {
  Query: {
    greet() {
      return "hello world";
    },
    getUser(parent: any, args: { userId: string }, context: any) {
      return new UserService(logger).getUser(args.userId);
    },
  },
  Mutation: {
    createUser(parent: any, args: { input: createUserInput }, context: any) {
      return new UserService(logger).createUser(args.input);
    },
    saveUserDemographics(
      parent: any,
      args: {
        userId: string;
        userDemographics: UserDemographics;
      },
      context: any,
    ) {
      return new UserService(logger).saveUserDemographics({
        userId: args.userId,
        userDemographics: args.userDemographics,
      });
    },
  },
};
