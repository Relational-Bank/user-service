import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContactEntity } from "./contact.entity";
import { UserDemographicsEntity } from "./userDemographics.entity";
import { UserCardEntity } from "./userCard.entity";

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
  contacts: ContactEntity;

  @OneToMany(() => UserDemographicsEntity, demographics => demographics.user)
  demographics: UserDemographicsEntity;

  @OneToMany(() => UserCardEntity, card => card.user)
  cards: UserCardEntity[];

  @CreateDateColumn({ name: "created_timestamp", nullable: false })
  createdTimestamp?: Date;

  @UpdateDateColumn({ name: "updated_timestamp", nullable: false })
  updatedTimestamp?: Date;
}
