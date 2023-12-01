import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserCardEntity } from "./userCard.entity";

@Entity("transaction_history")
export class TransactionHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "debited_amount" })
  debitedAmount: number;

  @Column({ name: "available_balance" })
  availableBalance: number;

  @Column({
    name: "transaction_date",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  transactionDate: Date;

  @ManyToOne(() => UserCardEntity, card => card.transactions)
  card: UserCardEntity;
}
