import nextRouter from "@/__mocks__/nextRouter";
import { server } from "@/__mocks__/server";
import RegisterPage from "@/pages/register";
import { render, screen, waitFor } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { RegisterResponse, fakeDataRegister } from "@/__mocks__/fixtures";
import { mockRegisterUserMutationTest } from "@/__mocks__/mock.types.generated";

jest.mock("next/router", () => ({ useRouter: () => nextRouter }));

const user = userEvent.setup();
const setup = () => render(<RegisterPage />);

const duplicateEmailHandler = mockRegisterUserMutationTest((req, res, ctx) => {
  return res(
    ctx.errors([
      {
        message: "The email already exists.",
      },
    ])
  );
});

const exceptionHandler = mockRegisterUserMutationTest((req, res, ctx) => {
  return res(
    ctx.errors([
      {
        message: "This is my error",
        formError: [
          {
            firstName: ["firstName should not be empty"],
          },
          {
            lastName: ["lastName should not be empty"],
          },
        ],
      },
    ] as any)
  );
});

describe("Register Page", () => {
  beforeAll(() => server.listen());
  afterAll(() => {
    server.close();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("called api with correct input after form submission & route user to login page", async () => {
    setup();

    await user.type(
      screen.getByPlaceholderText(/first name/i),
      fakeDataRegister.firstName
    );
    await user.type(
      screen.getByPlaceholderText(/last name/i),
      fakeDataRegister.lastName
    );
    await user.type(
      screen.getByPlaceholderText(/email/i),
      fakeDataRegister.email
    );
    await user.type(
      screen.getByPlaceholderText(/Password/),
      fakeDataRegister.password
    );
    await user.type(
      screen.getByPlaceholderText(/Confirm password/),
      fakeDataRegister.password
    );
    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(nextRouter.push).toBeCalledWith("/login");
    });

    const logs = server.logs.getOperation("RegisterUser");
    expect(logs.map((item) => item.body.variables)).toContainEqual(
      fakeDataRegister
    );
    expect(logs.map((item) => item.response)).toContainEqual(RegisterResponse);
  });

  it("called api with incorrect input", async () => {
    server.use(duplicateEmailHandler);
    setup();

    await user.type(
      screen.getByPlaceholderText(/first name/i),
      fakeDataRegister.firstName
    );
    await user.type(
      screen.getByPlaceholderText(/last name/i),
      fakeDataRegister.lastName
    );
    await user.type(
      screen.getByPlaceholderText(/email/i),
      fakeDataRegister.email
    );
    await user.type(
      screen.getByPlaceholderText(/Password/),
      fakeDataRegister.password
    );
    await user.type(
      screen.getByPlaceholderText(/Confirm password/),
      fakeDataRegister.password
    );
    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(
      () => {
        screen.getByText(/The email already exists./i);
      },
      { timeout: 1000 }
    );
  });

  it("form error", async () => {
    setup();

    await user.type(
      screen.getByPlaceholderText(/first name/i),
      fakeDataRegister.firstName
    );
    await user.type(
      screen.getByPlaceholderText(/last name/i),
      fakeDataRegister.lastName
    );
    await user.type(
      screen.getByPlaceholderText(/email/i),
      fakeDataRegister.email
    );
    await user.type(
      screen.getByPlaceholderText(/Password/),
      fakeDataRegister.password
    );
    await user.type(screen.getByPlaceholderText(/Confirm password/), "123");

    await waitFor(
      () => {
        screen.getByText(/the two passwords that you entered do not match!/i);
      },
      { timeout: 1000 }
    );
  });

  it("called api with exception", async () => {
    server.use(exceptionHandler);
    setup();

    await user.type(
      screen.getByPlaceholderText(/first name/i),
      fakeDataRegister.firstName
    );
    await user.type(
      screen.getByPlaceholderText(/last name/i),
      fakeDataRegister.lastName
    );
    await user.type(
      screen.getByPlaceholderText(/email/i),
      fakeDataRegister.email
    );
    await user.type(
      screen.getByPlaceholderText(/Password/),
      fakeDataRegister.password
    );
    await user.type(
      screen.getByPlaceholderText(/Confirm password/),
      fakeDataRegister.password
    );
    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      screen.getByText(/firstName should not be empty/i);
      screen.getByText(/lastName should not be empty/i);
    });
  });
});
