import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Task from "./task.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @OneToMany(() => Task, (task: Task) => task.creator)
  public tasks: Task[];
}
