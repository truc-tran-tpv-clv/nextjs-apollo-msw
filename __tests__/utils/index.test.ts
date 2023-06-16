import { extractFormError, safeParseJsonType } from "@/utils";

describe("Utility Functions", () => {
  it("extractFormError return correct result", () => {
    expect(
      extractFormError({
        graphQLErrors: [
          {
            // @ts-ignore
            formError: [
              { firstField: ["first error"] },
              { secondField: ["second error"] },
            ],
          },
        ],
      })
    ).toEqual([
      { name: "firstField", errors: ["first error"] },
      { name: "secondField", errors: ["second error"] },
    ]);
  });

  it("safeParseJsonType return correct result", () => {
    expect(safeParseJsonType("")).toBeNull();
    expect(safeParseJsonType('{"testKey": "test value"}')).toEqual({
      testKey: "test value",
    });
  });
});
