import authStore, { mockUseAuthStore } from "@/__mocks__/authStore";
import { LoginResponse } from "@/__mocks__/fixtures";
import { mockLoginMutationTest } from "@/__mocks__/mock.types.generated";
import nextRouter from "@/__mocks__/nextRouter";
import { server } from "@/__mocks__/server";
import { TSignInRequest } from "@/api/type";
import LoginPage from "@/pages/login";
import { render, screen, waitFor } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({ useRouter: () => nextRouter }));
jest.mock("@/store/authStore", () => mockUseAuthStore());

const user = userEvent.setup();

const setup = () => render(<LoginPage />);

const exceptionHandler = mockLoginMutationTest((req, res, ctx) => {
  return res(
    ctx.errors([
      {
        message: "Email or password invalid",
      },
    ])
  );
});

describe("Login Page", () => {
  beforeAll(() => server.listen());

  afterAll(() => {
    server.close();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("called api with correct input after form submission", async () => {
    setup();
    const data: TSignInRequest = {
      email: LoginResponse.login.email,
      password: "test123456",
    };

    await user.type(screen.getByPlaceholderText(/email/i), data.email);
    await user.type(screen.getByPlaceholderText(/password/i), data.password);
    await user.click(screen.getByRole("button", { name: /log in/i }));

    const logs = server.logs.getOperation("Login");
    expect(logs.map((item) => item.body.variables)).toContainEqual(data);

    expect(authStore.setUser).toBeCalledWith({
      ...LoginResponse.login,
    });
  });

  it("called api login error", async () => {
    server.use(exceptionHandler);
    setup();
    const data: TSignInRequest = {
      email: LoginResponse.login.email,
      password: "test123456",
    };

    await user.type(screen.getByPlaceholderText(/email/i), data.email);
    await user.type(screen.getByPlaceholderText(/password/i), data.password);
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(
      () => {
        screen.getByText(/Email or password invalid/i);
      },
      { timeout: 1000 }
    );
  });
});
