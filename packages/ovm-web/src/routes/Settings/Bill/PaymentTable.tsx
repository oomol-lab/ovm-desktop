import type { PaymentDataType } from ".";

import { Table } from "antd";
import { useTranslate } from "val-i18n-react";

interface PaymentProps {
  paymentDataItems: PaymentDataType[];
  paymentLoading: boolean;
}

export const PaymentTable = ({
  paymentDataItems,
  paymentLoading,
}: PaymentProps) => {
  const t = useTranslate();
  const payment_columns = [
    {
      title: t("order-no"),
      dataIndex: "order_number",
      key: "order_number",
    },
    {
      title: t("settings.content"),
      dataIndex: "content",
      key: "content",
    },
    {
      title: t("settings.payment-time"),
      dataIndex: "transaction_time",
      key: "transaction_time",
      render: (time: Date) => {
        return <div>{time.toLocaleDateString()}</div>;
      },
    },
    {
      title: t("settings.payment-amount"),
      dataIndex: "transaction_amount",
      key: "transaction_amount",
    },
    {
      title: t("settings.operation"),
      dataIndex: "operation",
      key: "operation",
    },
  ];
  return (
    <Table
      pagination={false}
      bordered
      loading={paymentLoading}
      dataSource={paymentDataItems}
      columns={payment_columns}
    />
  );
};
