import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./user.entity";
import {
  MaritalStatus,
  PreferredLanguage,
  CommunicationMethod,
} from "../enums/user.enum";

@Entity("user_demographics")
export class UserDemographicsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "occupation", nullable: true })
  occupation?: string;

  @Column({ name: "employer", nullable: true })
  employer?: string;

  @Column({ name: "income", nullable: true })
  income?: number;

  @Column({ name: "tax_identification_number", nullable: true })
  taxIdentificationNumber?: string;

  @Column({ name: "account_references", type: "jsonb", nullable: true })
  accountReferences?: Record<string, any>;

  @Column({
    name: "marital_status",
    type: "enum",
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus?: MaritalStatus;

  @Column({ name: "spouse_name", nullable: true })
  spouseName?: string;

  @Column({ name: "number_of_dependents", nullable: true })
  numberOfDependents?: number;

  @Column({ name: "education_level", nullable: true })
  educationLevel?: string;

  @Column({
    name: "preferred_language",
    type: "enum",
    enum: PreferredLanguage,
    nullable: true,
  })
  preferredLanguage?: PreferredLanguage;

  @Column({ name: "emergency_contact_name", nullable: true })
  emergencyContactName?: string;

  @Column({ name: "emergency_contact_number", nullable: true })
  emergencyContactNumber?: string;

  @Column({ name: "credit_score", nullable: true })
  creditScore?: number;

  @Column({
    name: "preferred_communication_method",
    type: "enum",
    enum: CommunicationMethod,
    nullable: true,
  })
  preferredCommunicationMethod?: CommunicationMethod;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user: UserEntity;
}
