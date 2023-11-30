import * as winston from "winston";
import moment from "moment";

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
  }: {
    action: string;
    message: string;
    error?: string;
  }) {
    const logObject = {
      action,
      message,
      error,
    };

    this.logger.info(JSON.stringify(logObject));
  }
}

// Example usage
// const logger = new Logger();

// logger.log('create user', 'Failed to create user', 'Some error message');
