import { sqliteConnection } from "../databases/sqlite3";
import { CreateTaskDataTypes } from "../services/taskServices";

type createTaskTypes = CreateTaskDataTypes & { id: string };

export const taskRepository = {
  async createTask(data: createTaskTypes) {
    try {
      const { id, title, description, date, status, idUser } = data;

      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO tasks (id, title, description, date, status, id_user) VALUES (?, ?, ?, ?, ?, ?);";

      await db.run(querySQL, [id, title, description, date, status, idUser]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM tasks WHERE id = ?;";

      const user = await db.get(querySQL, [id]);

      return user;
    } catch (error) {
      throw error;
    }
  },
};
