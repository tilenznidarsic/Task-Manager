import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Task from "./task.entity";

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ type: "date" })
  public date_created: string;

  @OneToMany(() => Task, (task: Task) => task.project)
  public tasks: Task[];
}
