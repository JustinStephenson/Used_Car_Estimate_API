import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
    console.log('Removed User with id', this.id);
  }
}
