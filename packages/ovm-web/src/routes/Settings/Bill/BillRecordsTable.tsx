import type { BillDataType } from ".";

import { Table } from "antd";
import { useTranslate } from "val-i18n-react";

interface BillRecordsProps {
  billDataItems: BillDataType[];
  billRecordsLoading: boolean;
}

export const BillRecordsTable = ({
  billDataItems,
  billRecordsLoading,
}: BillRecordsProps) => {
  const t = useTranslate();
  const bill_columns = [
    {
      title: t("settings.transaction-detail"),
      dataIndex: "transaction_details",
      key: "transaction_details",
    },
    {
      title: t("settings.transaction-type"),
      dataIndex: "transaction_type",
      key: "transaction_type",
    },
    {
      title: t("settings.transaction-time"),
      dataIndex: "transaction_time",
      key: "transaction_time",
      render: (time: Date) => {
        return <div>{time.toLocaleDateString()}</div>;
      },
    },
    {
      title: t("settings.transaction-amount"),
      dataIndex: "transaction_amount",
      key: "transaction_amount",
    },
  ];
  return (
    <Table
      pagination={false}
      bordered
      loading={billRecordsLoading}
      dataSource={billDataItems}
      columns={bill_columns}
    />
  );
};
