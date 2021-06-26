import { IsEnum, isEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "./task.entity";

export class TaskDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  public status: TaskStatus;
}

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  public status: TaskStatus;
}
