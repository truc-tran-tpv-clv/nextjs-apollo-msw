import { TRegisterRequest } from "@/api/type";
import { TUser } from "@/api/type";

export const RegisterResponse = {
  registerUser: {
    id: 10,
  },
};

export const LoginResponse = {
  login: {
    id: 999,
    email: "fake@gmail.com",
    firstName: "f name",
    lastName: "l name",
    accessToken: "my token",
  },
};

export const fakeDataRegister: TRegisterRequest = {
  firstName: "Test",
  lastName: "Nguyen",
  email: "testng@gmail.com",
  password: "test123456",
};

export const mockMe: TUser = {
  id: 2,
  firstName: "Truc",
  lastName: "Tran",
  email: "ken1@gmail.com",
};
