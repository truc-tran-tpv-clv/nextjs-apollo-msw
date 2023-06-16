import AppLayout from "@/components/AppLayout";
import { Button, Divider, Input, Menu, Select, Table, Typography } from "antd";
import styles from "./HomePage.module.css";
import { useState } from "react";
import {
  SORT_NAME,
  SORT_TYPE,
  TSortName,
  TSortType,
  menuItems,
  useGetColumns,
} from "@/pages/home/config";
import { EProductStatus } from "@/api/type";
import { ReloadOutlined } from "@ant-design/icons";

type TQueries = {
  keyword: string;
  sortName: TSortName;
  sortType: TSortType;
};

const defaultQueries: TQueries = {
  keyword: "",
  sortName: "Name",
  sortType: "ASC",
};

export function HomePage() {
  const [activeTab, setActiveTab] = useState<EProductStatus>(
    EProductStatus.PUBLISHED
  );
  const [queries, _setQueries] = useState<TQueries>(defaultQueries);

  const columns = useGetColumns();

  const setQueries = <T extends keyof TQueries>(
    values: Record<T, TQueries[T]>
  ) => {
    _setQueries((prev) => ({ ...prev, ...values }));
  };

  return (
    <AppLayout className={styles["home-page"]}>
      <Menu
        selectedKeys={[activeTab]}
        items={menuItems}
        className={styles.menu}
        onClick={(e) => setActiveTab(e.key as EProductStatus)}
      />

      <div className={styles.main}>
        <div className={styles.sort}>
          <Input.Search
            placeholder="Search for an item"
            className={styles["search-bar"]}
            value={queries.keyword}
            onChange={(e) => setQueries({ keyword: e.target.value })}
          />
          <Divider type="vertical" />
          <Typography style={{ fontSize: "1rem" }}>Filters:</Typography>
          <Select
            size="large"
            value={queries.sortName}
            style={{ width: 140 }}
            options={Object.entries(SORT_NAME).map(([label, value]) => ({
              label,
              value,
            }))}
            onChange={(sortName) => {
              setQueries({ sortName, sortType: SORT_TYPE.Ascending });
            }}
          />
          <Select
            size="large"
            value={queries.sortType}
            style={{ width: 140 }}
            options={Object.entries(SORT_TYPE).map(([label, value]) => ({
              label,
              value,
            }))}
            onChange={(sortType) => setQueries({ sortType })}
          />

          <Button icon={<ReloadOutlined />} size="middle">
            Reload
          </Button>
        </div>

        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={[]}
        />
      </div>
    </AppLayout>
  );
}
