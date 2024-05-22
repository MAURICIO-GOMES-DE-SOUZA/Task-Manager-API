import { NextFunction, Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";
import { taskServices } from "../services/taskServices";
import { taskSchema } from "../validations/taskSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskCreated = await taskServices.create(task, taskRepository);

      console.log(taskCreated);

      return res.status(201).json({ message: "task created!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },
};
