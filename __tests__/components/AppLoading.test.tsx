import authStore, { mockUseAuthStore } from "@/__mocks__/authStore";
import { mockMeQueryTest } from "@/__mocks__/mock.types.generated";
import nextRouter from "@/__mocks__/nextRouter";
import { server } from "@/__mocks__/server";
import { AppLoading } from "@/components/AppLoading";
import { render, waitFor } from "@/utils/test-utils";

jest.mock("next/router", () => ({ useRouter: () => nextRouter }));
jest.mock("@/store/authStore", () => mockUseAuthStore());

const setup = () => render(<AppLoading />);

const exceptionHandler = mockMeQueryTest((_, res, ctx) => {
  return res(
    ctx.errors([
      {
        message: "The token expired",
      },
    ])
  );
});

describe("Loading Page", () => {
  beforeAll(() => server.listen());

  afterAll(() => {
    server.close();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should redirect to login", async () => {
    server.use(exceptionHandler);
    setup();

    await waitFor(
      () => {
        expect(nextRouter.push).toBeCalledWith("/login");
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(authStore.setAppError).toBeCalledWith("The token expired");
      },
      { timeout: 1000 }
    );

    server.resetHandlers();
  });

  it("should redirect to home page", async () => {
    setup();

    await waitFor(
      () => {
        expect(nextRouter.push).toBeCalledWith("/");
      },
      { timeout: 1000 }
    );
  });
});
