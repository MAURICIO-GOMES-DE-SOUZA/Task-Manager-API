import { compare } from "bcrypt";
import { appError } from "../errors/appError";
import { createUserDataType } from "../repositories/userRepository";
import { loginDataType } from "../validations/loginSchema";
import { UserrepositoryTypes } from "./userServices";
import { sign } from "jsonwebtoken";

export const authServices = {
  async login(data: loginDataType, repository: UserrepositoryTypes) {
    try {
      const { email, password } = data;
      const user = await repository.getUserByEmail(email);
      if (!user) throw appError("email or password ivalid!", 401);
      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) throw appError("email or password ivalid!", 401);

      const token = sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: process.env.EXPIRESIN_TOKEN,
      });

      return token;
    } catch (error) {
      throw error;
    }
  },
};
