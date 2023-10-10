import type { InvoiceDataType } from ".";

import { Table } from "antd";
import { useTranslate } from "val-i18n-react";

interface InvoiceProps {
  invoiceDataItems: InvoiceDataType[];
  invoiceLoading: boolean;
}

export const InvoiceTable = ({
  invoiceDataItems,
  invoiceLoading,
}: InvoiceProps) => {
  const t = useTranslate();
  const invoice_columns = [
    {
      title: t("settings.invoice-type"),
      dataIndex: "invoice_type",
      key: "invoice_type",
    },
    {
      title: t("settings.applicant"),
      dataIndex: "applicant",
      key: "applicant",
    },
    {
      title: t("settings.application-time"),
      dataIndex: "application_time",
      key: "application_time",
      render: (time: Date) => {
        return <div>{time.toLocaleDateString()}</div>;
      },
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
      loading={invoiceLoading}
      dataSource={invoiceDataItems}
      columns={invoice_columns}
    />
  );
};
