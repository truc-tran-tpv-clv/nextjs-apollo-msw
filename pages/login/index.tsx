import { Button, Form, Input, Layout, Space, Typography } from "antd";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { TSignInRequest } from "api/type";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { AppError } from "@/components/AppError";
import { useNotify } from "@/api/useNotify";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "@/api/client/client.generated";

export default function LoginPage() {
  const router = useRouter();
  const { notify, contextHolder } = useNotify();
  const { setUser, user } = useAuthStore();
  const [mutate, { loading: isLoading }] = useMutation(LoginDocument, {
    onError: (error) => {
      notify.error({ message: error.message });
    },
  });

  async function handleLogIn(values: TSignInRequest) {
    mutate({ variables: values }).then(({ data }) => {
      if (data?.login) {
        setUser({
          id: data.login.id,
          firstName: data.login.firstName,
          lastName: data.login.lastName,
          email: data.login.email,
          accessToken: data.login.accessToken,
        });
        router.push("/");
      }
    });
  }

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user?.id]);

  return (
    <Layout className="h-screen">
      {contextHolder}
      <main className={styles["login-page"]}>
        <Typography.Title level={1} className={styles.logo}>
          Auction
        </Typography.Title>

        <Form
          layout="vertical"
          className={styles["form"]}
          onFinish={handleLogIn}
          requiredMark
          validateTrigger={["onBlur", "onChange"]}
        >
          <div className="text-center">
            <Typography.Title level={2}>Welcome back</Typography.Title>
            <Typography
              style={{
                fontSize: ".75rem",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              Login to your account
            </Typography>
          </div>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Log In
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space align="center">
              <Typography className="text-gray">
                Don&apos;t have an account?
              </Typography>
              <Link href="/register" className={styles.link}>
                Register now
              </Link>
            </Space>
          </div>
        </Form>
      </main>
      <AppError />
    </Layout>
  );
}
