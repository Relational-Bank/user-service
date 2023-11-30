import { Logger } from "../../plugins/logging.plugin";
import { UserService } from "../../services/user.service";
import { createUserInput } from "../../types/user.type";

const logger = new Logger();

export const userResolver = {
  Query: {
    greet() {
      return "hello world";
    },
  },
  Mutation: {
    createUser(parent: any, args: { input: createUserInput }, context: any) {
      return new UserService(logger).createUser(args.input);
    },
  },
};
