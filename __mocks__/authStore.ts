import { mockMe } from "./fixtures";

const mockAuthStore = {
  appError: "test error message",
  setAppError: jest.fn(),
  user: mockMe,
  accessToken: "test",
  logOut: jest.fn(),
  setUser: jest.fn(),
};

export const mockUseAuthStore = () => {
  function useAuthStore(callback?: CallableFunction) {
    if (callback) {
      return callback(mockAuthStore);
    }

    return mockAuthStore;
  }
  useAuthStore.getState = () => mockAuthStore;

  return {
    useAuthStore,
  };
};

export default mockAuthStore;
