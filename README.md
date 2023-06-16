## Guides
[Guide](./docs/HOW_TO_USE.md)

[Graphql - Codegen Guide](./docs/GRAPHQL_CODE_GEN.md)

[UI](./docs/UI.md)

## Prerequisites
- Create a file `.env.test` with value `NEXT_PUBLIC_API_URL=http://localhost:9998/graphql`
- Setup NextJs + Apollo Client [Link](https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/)
- Setup Jest `jest.config.js`
- Define client query `client.graphql`
- Define `server.schema.graphql`
- Generate client type by run command `yarn codegen`

## MSW
- Setup with Graphql [link](https://mswjs.io/docs/getting-started/mocks/graphql-api), [handlers.ts](./__mocks__/handlers.ts)
- Setup with Node [link](https://mswjs.io/docs/getting-started/integrate/node), [server.ts](./__mocks__/server.ts)
- Life-cycle events [link](https://mswjs.io/docs/extensions/life-cycle-events)
- We register two events `request:start`, `response:mocked` for store `request`, `response`

## Graphql Response Description

```json
# mutation RegisterUser
{
	"data": {
		"id": 10
	}
}

# mutation Login
{
	"data": {
		"id": 10
    	"email": "string"
    	"firstName": "string"
    	"lastName": "string"
    	"accessToken": "string"
	}
}

# query Me
{
	"data": {
		"id": 10
    	"email": "string"
    	"firstName": "string"
    	"lastName": "string"
	}
}

# form error
{
	"errors": [
    {
      "message": "Bad Request Exception",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "registerUser"
      ],
      "formError": [
        {
          "firstName": [
            "firstName should not be empty"
          ]
        },
        {
          "lastName": [
            "lastName should not be empty"
          ]
        }
      ]
    }
  ],
  "data": null
}
```



