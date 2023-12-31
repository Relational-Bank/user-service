import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UserEntity } from "../entities/user.entity";
import { ContactEntity } from "../entities/contact.entity";
import { UserDemographicsEntity } from "../entities/userDemographics.entity";
import { UserCardEntity } from "../entities/userCard.entity";
import { TransactionHistoryEntity } from "../entities/transactionHistory.entity";

dotenv.config();

export const DBConnection = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
    ContactEntity,
    UserDemographicsEntity,
    UserCardEntity,
    TransactionHistoryEntity,
  ],
});
