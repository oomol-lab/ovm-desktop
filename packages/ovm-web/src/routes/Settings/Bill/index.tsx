import styles from "./Bill.module.scss";

import { DatePicker } from "antd";
import { useState, useEffect } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

import { BillRecordsTable } from "./BillRecordsTable";
import { InvoiceTable } from "./InvoiceTable";
import { PaymentTable } from "./PaymentTable";

const { RangePicker } = DatePicker;

export enum BillTypeEnum {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export enum InvoiceTypeEnum {
  Personal = "Personal",
  Company = "Company",
}

export type BillDataType = {
  key: string;
  transaction_details: string;
  transaction_type: BillTypeEnum;
  transaction_time: Date;
  transaction_amount: number;
};

export type PaymentDataType = {
  key: string;
  order_number: number;
  content: string;
  transaction_time: Date;
  transaction_amount: number;
  operation: string;
};

export type InvoiceDataType = {
  key: string;
  invoice_type: InvoiceTypeEnum;
  applicant: string;
  application_time: Date;
  operation: string;
};

export interface AppContext {
  getOoBillRecords: (_page?: number, count?: number) => Promise<BillDataType[]>;
  getOoPaymentHistory: (
    _page?: number,
    count?: number
  ) => Promise<PaymentDataType[]>;
  getOoInvoices: (_page?: number, count?: number) => Promise<InvoiceDataType[]>;
}

export const Bill = () => {
  const t = useTranslate();
  const { getOoBillRecords } = useAppContext();
  const { getOoPaymentHistory } = useAppContext();
  const { getOoInvoices } = useAppContext();
  const [billDataItems, setBillDataItems] = useState<BillDataType[]>([]);
  const [paymentDataItems, setPaymentDataItems] = useState<PaymentDataType[]>(
    []
  );
  const [invoiceDataItems, setInvoiceDataItems] = useState<InvoiceDataType[]>(
    []
  );

  const [billRecordsLoading, setBillRecordsLoading] = useState<boolean>(true);

  const [paymentLoading, setPaymentLoading] = useState<boolean>(true);

  const [invoiceLoading, setInvoiceLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getOoBillRecords(3).then(res => {
      if (isMounted) {
        setBillDataItems(preState => [...preState, ...res]);
        setBillRecordsLoading(false);
      }
    });

    getOoPaymentHistory(3).then(res => {
      if (isMounted) {
        setPaymentDataItems(preState => [...preState, ...res]);
        setPaymentLoading(false);
      }
    });
    getOoInvoices(3).then(res => {
      if (isMounted) {
        setInvoiceDataItems(preState => [...preState, ...res]);
        setInvoiceLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles["bill-box"]}>
        <div className={styles["bill-nav"]}>
          <div className={styles["bill-nav-title"]}>
            {t("settings.bill-record")}
          </div>
          <RangePicker />
        </div>
        <BillRecordsTable
          billDataItems={billDataItems}
          billRecordsLoading={billRecordsLoading}
        />
      </div>
      <div className={styles["bill-box"]}>
        <div className={styles["bill-nav"]}>
          <div className={styles["bill-nav-title"]}>
            {t("settings.payment-history")}
          </div>
        </div>
        <PaymentTable
          paymentDataItems={paymentDataItems}
          paymentLoading={paymentLoading}
        />
      </div>
      <div className={styles["bill-box"]}>
        <div className={styles["bill-nav"]}>
          <div className={styles["bill-nav-title"]}>
            {t("settings.invoice-management")}
          </div>
        </div>
        <InvoiceTable
          invoiceDataItems={invoiceDataItems}
          invoiceLoading={invoiceLoading}
        />
      </div>
    </div>
  );
};
