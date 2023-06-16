import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "api/client/server.schema.graphql",
  documents: ["api/client/client.graphql"],
  generates: {
    "api/client/types.generated.ts": { plugins: ["typescript"] },
    "api/client/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types.generated.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
    "__mocks__/mock.types.generated.ts": {
      config: {
        link: {
          name: "test",
          endpoint: process.env.NEXT_PUBLIC_API_URL,
        },
      },
      plugins: ["typescript", "typescript-operations", "typescript-msw"],
    },
  },
};

export default config;
