import { useDebounce } from "@/utils/hooks";
import { renderHook, waitFor } from "@/utils/test-utils";

describe("Utility Hooks", () => {
  it("useDebounce hook works correctly", async () => {
    const { result } = renderHook(useDebounce, {
      initialProps: "hello",
    });

    expect(result.current).toBe(undefined);

    await waitFor(
      () => {
        expect(result.current).toBe("hello");
      },
      { timeout: 500 }
    );
  });
});
