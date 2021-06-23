import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Project from "./project.entity";
import User from "./user.entity";

export enum TaskStatus {
  TODO = "TODO",
  PROGRESS = "PROGRESS",
  TESTING = "TESTING",
  DONE = "DONE",
}

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  public status: string;

  @ManyToOne(() => User, (creator: User) => creator.tasks)
  public creator: User;

  @ManyToOne(() => Project, (project: Project) => project.tasks)
  public project: Project;
}
