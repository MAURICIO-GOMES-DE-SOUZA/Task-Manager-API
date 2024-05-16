import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z.object({
        name: z.string({
                required_error: "name is required!",
                invalid_type_error: "name must be a string!",
              }).min(3, "name must have at least 3 characters")
              .max(255, "max name lengt excceded"),

        email: z.string({
                required_error: "name is required!",
                invalid_type_error: "name must be a string!",
              }).email("email poorly formatted!")
              .max(255, "max email lengt excceded"),

        password: z.string({
          required_error: "password is required!",
          invalid_type_error: "name must be a string!",
        }).min(7,"password must have at least 7 characters")
        .max(255, "max password lengt excceded")
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/, {
          message:
            "the password must contain at least one capital letter, one number and one special character!",
        }),
        })
        .strict()



      const { name, email, password} = userSchema.parse( req.body);
      //services

      return res.status(201).json( "user created!");
    } catch (error) {
      return next(error);
    }
  },

  
};
