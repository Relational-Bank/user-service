import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("user_contact")
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "contact_id", unique: true })
  contactId: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column({ name: "home_number", nullable: true })
  homeNumber?: string;

  @Column({ name: "address_line_1" })
  addressLine1: string;

  @Column({ name: "address_line_2", nullable: true })
  addressLine2?: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ name: "zip_code" })
  zipCode: string;

  @ManyToOne(() => UserEntity, user => user.contacts)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user: UserEntity;
}
