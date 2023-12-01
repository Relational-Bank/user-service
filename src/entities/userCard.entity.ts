import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { TransactionHistoryEntity } from "./transactionHistory.entity";

@Entity("user_cards")
export class UserCardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "card_number", nullable: false })
  cardNumber: string;

  @Column({ name: "expiration_date", nullable: false })
  expirationDate: string;

  @Column({ name: "cvv", nullable: false })
  cvv: string;

  @ManyToOne(() => UserEntity, user => user.cards)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user: UserEntity;

  @OneToMany(() => TransactionHistoryEntity, transaction => transaction.card)
  transactions: TransactionHistoryEntity[];

  @CreateDateColumn({ name: "created_timestamp", nullable: false })
  createdTimestamp?: Date;

  @UpdateDateColumn({ name: "updated_timestamp", nullable: false })
  updatedTimestamp?: Date;
}
