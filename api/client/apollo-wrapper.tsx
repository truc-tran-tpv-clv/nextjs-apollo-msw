"use client";

import fetch from "cross-fetch";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setVerbosity } from "ts-invariant";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "@/store/authStore";

if (["test", "development"].includes(process.env.NODE_ENV)) {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState()?.accessToken || "";

  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    fetch: fetch,
  });

  const link = authLink.concat(httpLink);

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            link,
          ])
        : link,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
