import Head from "next/head";
import {
  UserOutlined,
  PlusCircleOutlined,
  MoneyCollectOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import { Layout } from "antd";
import styles from "./AppLayout.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { AppError } from "../AppError";
import { useQuery } from "@apollo/client";
import { MeDocument } from "@/api/client/client.generated";

const { Content, Header } = Layout;

const memberItems = (logOut: () => void): MenuProps["items"] => [
  {
    key: "create",
    label: <Link href="/create-item">Create new item</Link>,
    icon: <PlusCircleOutlined />,
  },
  {
    key: "deposit",
    label: <Link href="/deposit">Deposit</Link>,
    icon: <MoneyCollectOutlined />,
  },
  {
    key: "history",
    label: <Link href="/history">History</Link>,
    icon: <MoneyCollectOutlined />,
  },
  {
    key: "logout",
    label: (
      <Link href="/login" onClick={logOut}>
        Logout
      </Link>
    ),
    icon: <ExportOutlined />,
  },
];

export default function AppLayout({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  const router = useRouter();
  const { user, logOut } = useAuthStore();
  const [username, setUsername] = useState("");
  const { data, loading: isLoading } = useQuery(MeDocument);
  const menuItems = memberItems(logOut);

  useEffect(() => {
    if (isLoading && !user) {
      router.push("/login");
      return;
    }

    data && setUsername(`${data.me.firstName} ${data.me.lastName}`);
  }, [user]);

  return (
    <>
      <Head>
        <title>Auction</title>
      </Head>

      <Layout className="h-screen">
        <Header className={styles.header}>
          <Link href="/">
            <Typography className={styles.logo}>Auction</Typography>
          </Link>
          <Space size="large">
            <Typography className={styles.balance}>
              <span>Balance:</span>{" "}
              <span className={styles["balance-value"]}>100$</span>
            </Typography>
            <Typography.Text>{username}</Typography.Text>
            <Dropdown menu={{ items: menuItems }}>
              <Avatar
                size={36}
                icon={<UserOutlined />}
                className={styles.avatar}
              />
            </Dropdown>
          </Space>
        </Header>
        <Content className={styles.main}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className={className}
          >
            {children}
          </motion.div>
        </Content>

        <AppError />
      </Layout>
    </>
  );
}
