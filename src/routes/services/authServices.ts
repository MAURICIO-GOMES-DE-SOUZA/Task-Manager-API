import { createUserDataType } from "../../repositories/userRepository";
import { loginDataType } from "../validations/loginSchema";
import { UserrepositoryTypes } from "./userServices";

export const authServices = {
  async login(data: loginDataType, repository: UserrepositoryTypes) {
    try {
      const {email, password } = data;
      const user = await repository.getUserByEmail(email)
      if (!user) throw "email ivalid!" 

      return "token";
    } catch (error) {
      throw error;
    }
  },
};
