import { omit } from "lodash";
import { Button, Form, Input, Layout, Space, Typography } from "antd";
import styles from "./register.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { TRegisterRequest } from "@/api/type";
import { AppError } from "@/components/AppError";
import { useNotify } from "@/api/useNotify";
import { extractFormError, isFormError } from "@/utils";
import { RegisterUserDocument } from "@/api/client/client.generated";
import { useMutation } from "@apollo/client";

type TFormValues = TRegisterRequest & { confirm: string };

export default function RegisterPage() {
  const router = useRouter();
  const { notify, contextHolder } = useNotify();
  const [form] = Form.useForm();
  const [mutate, { loading: isLoading }] = useMutation(RegisterUserDocument, {
    onCompleted: () => {
      form.resetFields();
      notify.success({
        message: "Your account register success",
        duration: 0.5,
        onClose: () => router.push("/login"),
      });
    },
    onError: (error) => {
      if (isFormError(error)) {
        form.setFields(extractFormError(error));
      }

      if (error?.message) {
        notify.error({ message: error.message });
      }
    },
  });

  const handleFinish = (values: TFormValues) => {
    const payload = omit(values, ["confirm"]) as TRegisterRequest;
    mutate({
      variables: payload,
    });
  };

  return (
    <Layout className="h-screen">
      {contextHolder}
      <main className={styles["register-page"]}>
        <Typography.Title level={1} className={styles.logo}>
          Auction
        </Typography.Title>

        <Form
          layout="vertical"
          className={styles["form"]}
          onFinish={handleFinish}
          form={form}
          requiredMark
          validateTrigger={["onBlur", "onChange"]}
        >
          <div className="text-center">
            <Typography.Title level={2} style={{ marginBottom: "4px" }}>
              Get started
            </Typography.Title>
            <Typography className="text-sm">Create a new account</Typography>
          </div>

          <Form.Item
            label="First name"
            name="firstName"
            // rules={[
            //   { required: true, message: "Please input your first name!" },
            // ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "password length must be of atleast 6 characters",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space align="center">
              <Typography className="text-gray">
                Already have an account?
              </Typography>
              <Link href="/login" className={styles.link}>
                Login now
              </Link>
            </Space>
          </div>
        </Form>
      </main>

      <AppError />
    </Layout>
  );
}
