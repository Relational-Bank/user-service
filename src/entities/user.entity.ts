import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ContactEntity } from "./contact.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id", unique: true })
  userId: string;

  @Column({ name: "first_name", unique: true })
  firstName: string;

  @Column({ name: "middle_name", nullable: true })
  middleName?: string;

  @Column({ name: "last_name" })
  lastName: string;

  @OneToMany(() => ContactEntity, contact => contact.user)
  contacts: ContactEntity[];
}
