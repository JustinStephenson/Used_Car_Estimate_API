import { Report } from '../reports/report.entity';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // change after testing
  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // will fire after inserting a new user
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  // will fire after updating a new user
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  // will fire after removing a new user
  @AfterRemove()
  logRemove() {
    console.log('Removed User');
  }
}
