import { LoginResponse, RegisterResponse, mockMe } from "./fixtures";
import {
  mockLoginMutationTest,
  mockMeQueryTest,
  mockRegisterUserMutationTest,
} from "./mock.types.generated";

export const handlers = [
  mockRegisterUserMutationTest((_, res, ctx) => {
    return res(ctx.data(RegisterResponse));
  }),
  mockLoginMutationTest((_, res, ctx) => {
    return res(ctx.data(LoginResponse));
  }),
  mockMeQueryTest((_, res, ctx) => {
    return res(ctx.data({ me: mockMe }));
  }),
];
