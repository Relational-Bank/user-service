import * as winston from "winston";
import moment from "moment";
import { LogContext } from "../interfaces/common.interface";

export class Logger {
  private logFormat: winston.Logform.Format;
  private logger: winston.Logger;

  constructor() {
    this.logFormat = winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().format("YYYY-MM-DD HH:mm:ss"),
        }),
        this.logFormat,
      ),
      transports: [
        new winston.transports.Console(),
        // Add other transports as needed, e.g., file, database, etc.
      ],
    });
  }

  log({
    action,
    message,
    error,
    context
  }: {
    action: string;
    message: string;
    error?: string;
    context: LogContext;
  }) {
    const logObject = {
      action,
      message,
      error,
      context
    };

    this.logger.info(JSON.stringify(logObject));
  }
}

// Example usage
// const logger = new Logger();

// logger.log('create user', 'Failed to create user', 'Some error message');
