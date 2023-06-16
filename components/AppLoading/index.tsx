import { Layout, Spin } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { MeDocument } from "@/api/client/client.generated";
import { useQuery } from "@apollo/client";

export function AppLoading() {
  const router = useRouter();
  const { setAppError } = useAuthStore(({ setAppError }) => ({ setAppError }));
  useQuery(MeDocument, {
    onCompleted() {
      router.push("/");
    },
    onError(error) {
      setAppError(error.message);
      router.push("/login");
    },
  });

  return (
    <Layout
      className="h-screen"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      Loading...
      <Spin />
    </Layout>
  );
}
