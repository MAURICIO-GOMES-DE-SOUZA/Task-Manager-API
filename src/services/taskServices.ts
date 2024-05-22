import { randomUUID } from "node:crypto";
import { TaskDataType } from "../validations/taskSchema";

export type CreateTaskDataTypes = TaskDataType & { idUser: string };
export type taskrepositoryTypes = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<CreateTaskDataTypes | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: taskrepositoryTypes) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        idUser,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },
};
