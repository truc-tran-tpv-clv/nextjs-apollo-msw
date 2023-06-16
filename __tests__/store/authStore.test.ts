import { mockMe } from "@/__mocks__/fixtures";
import { useAuthStore } from "@/store/authStore";

describe("Auth Store", () => {
  it("setUser & logOut set correctly", () => {
    expect(useAuthStore.getState().user).toBeFalsy();
    expect(useAuthStore.getState().accessToken).toBeFalsy();

    const userInfo = { ...mockMe, accessToken: "test" };
    useAuthStore.getState().setUser(userInfo);

    expect(useAuthStore.getState().user).toEqual(mockMe);
    expect(useAuthStore.getState().accessToken).toEqual("test");

    useAuthStore.getState().logOut();
    expect(useAuthStore.getState().user).toBeFalsy();
    expect(useAuthStore.getState().accessToken).toBeFalsy();
  });

  it("setAppError set correctly", () => {
    expect(useAuthStore.getState().appError).toBeFalsy();

    useAuthStore.getState().setAppError("test error");

    expect(useAuthStore.getState().appError).toBe("test error");
  });
});
