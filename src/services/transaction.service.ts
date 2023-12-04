import axios from "axios";
import { saveUserCard } from "../types/transaction.type";
import { Logger } from "../plugins/logging.plugin";
import { logEvent } from "../common/logEvent.enum";

export class TransactionService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }
  private transactionClient = process.env.TRANSACTION_SERVICE_ENDPOINT;
  public saveUserCard = async ({
    userId,
    input,
  }: {
    userId: string;
    input: saveUserCard;
  }) => {
    try {
      const mutationQuery = `
        mutation SaveCardDetails($userId: String!, $input: saveUserCardInput!) {
          savecardDetails(userId: $userId, input: $input) {
            cardNumber
            expirationDate
            cvv
          }
        }
      `;

      const response = await axios.post(
        this.transactionClient as string,
        {
          query: mutationQuery,
          variables: { userId, input },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const savedCardDetails = response.data.data.savecardDetails;

      this.logger.log({
        action: logEvent.saveCardDetails,
        message: `Card details saved used successfully for the user with ID: ${userId}`,
        context: { userId },
      });

      return savedCardDetails;
    } catch (error) {
      this.logger.log({
        action: logEvent.saveCardDetails,
        message: `Failed to save user card details`,
        context: { userId, payload: JSON.stringify(input) },
        error: JSON.stringify(error),
      });

      throw error;
    }
  };
}
