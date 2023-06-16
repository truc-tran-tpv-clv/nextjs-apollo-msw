## Graphql + Codegen

```bash
# generate graphql type
$ yarn codegen
```

```typescript
const config: CodegenConfig = {
  overwrite: true,
  schema: "api/client/server.schema.graphql", #server schema
  documents: ["api/client/client.graphql"], #client query
  generates: {
    "api/client/types.generated.ts": {
      config: {
        fetcher: "./fetcher#fetcher",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
    }, #generate application
    "__mocks__/mock.types.generated.ts": {
      config: {
        link: {
          name: "test",
          endpoint: process.env.NEXT_PUBLIC_API_URL,
        },
      },
      plugins: ["typescript", "typescript-operations", "typescript-msw"],
    }, #generate testing
  },
};
```

### Server schema
we can specify the file `graphql` or `url`. Example `http://localhost/graphql`.

### Client query
we define graphql client `query`, `mutation`.

### Generate application
the cli will be generate `typescript` , `react hook query` for real application

### Generate testing
the cli will be generate `typescript` , `react hook query` only for testing