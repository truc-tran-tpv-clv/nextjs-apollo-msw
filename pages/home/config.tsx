import { ClockCircleOutlined, FileDoneOutlined } from "@ant-design/icons";
import { MenuProps, Statistic } from "antd";

import { ColumnType, ColumnsType } from "antd/es/table";
import { formatNumber } from "@/utils";

import { EProductStatus, type TProduct } from "@/api/type";

import styles from "./HomePage.module.css";

// ----- SORT
export const SORT_NAME = {
  Name: "Name",
  Price: "Price",
} as const;

export type TSortName = (typeof SORT_NAME)[keyof typeof SORT_NAME];

export const SORT_TYPE = {
  Ascending: "ASC",
  Descending: "DESC",
} as const;

export type TSortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE];
// ----- END SORT

export const menuItems: MenuProps["items"] = [
  {
    label: "Ongoing",
    key: EProductStatus.PUBLISHED,
    icon: <ClockCircleOutlined />,
  },
  {
    label: "Completed",
    key: EProductStatus.EXPIRED,
    icon: <FileDoneOutlined />,
  },
  {
    label: "Pending",
    key: EProductStatus.PENDING,
    icon: <FileDoneOutlined />,
  },
];

const defaultColumns: ColumnsType<TProduct> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    width: "25%",
  },
  {
    key: "currentPrice",
    title: "Current Price",
    dataIndex: "startPrice",
    align: "center",
    width: "25%",
    render: (value: number) => `${formatNumber(value)}`,
  },
  {
    key: "duration",
    title: "Duration",
    dataIndex: "duration",
    align: "center",
    width: "20%",
    render: (value: number) => `${value} minutes`,
  },
];

const historyColumns: ColumnsType<TProduct> = [
  {
    key: "histories",
    title: "Histories",
    align: "left",
  },
];

const publishedColumns: ColumnsType<TProduct> = [
  {
    key: "bid",
    title: "Bid",
    align: "center",
  },
];

export function useGetColumns(): ColumnsType<TProduct> | undefined {
  const list = [...defaultColumns];
  return list
    .map(replaceDurationWithCountdown)
    .concat(publishedColumns)
    .concat(historyColumns);
}

function replaceDurationWithCountdown(col: ColumnType<TProduct>) {
  if (col.key !== "duration") return col;

  return {
    ...col,
    dataIndex: "expiredAt",
    render: (value: string) => (
      <Statistic.Countdown value={value} className={styles.countdown} />
    ),
  };
}
