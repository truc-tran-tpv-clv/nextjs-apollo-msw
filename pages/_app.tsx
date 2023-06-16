import { ConfigProvider, theme } from "antd";
import { AnimatePresence } from "framer-motion";

import type { AppProps } from "next/app";

import "antd/dist/reset.css";
import "@/styles/global.css";
import { NotifyProvider } from "@/api/useNotify";
import { ApolloWrapper } from "@/api/client/apollo-wrapper";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#30e663",
            fontSizeHeading1: 34,
            fontSizeHeading2: 26,
          },
          components: {
            Input: {
              controlHeight: 40,
            },
            InputNumber: {
              controlHeight: 40,
            },
            Button: {
              controlHeight: 40,
            },
          },
        }}
      >
        <NotifyProvider>
          <ApolloWrapper>
            <Component {...pageProps} />
          </ApolloWrapper>
        </NotifyProvider>
      </ConfigProvider>
    </AnimatePresence>
  );
}
