import styles from "./PricingCard.module.scss";

import type { ColumnsType } from "antd/es/table";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Segmented, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";
import { BillTypeEnum } from "~/routes/Settings/Bill";

import { ThemeProvider } from "../ThemeProvider";
import { PricingTitleContent, PricingTitleEnum } from "./PricingTitleContent";

export interface PriceDataType {
  key: string;
  feature: string | boolean;
  starter: string | boolean;
  professional: string | boolean;
  organization: string | boolean;
}

type PriceTitleDataType = {
  title: string;
  monthly: number;
  yearly: number;
};

export type TitleDataType = {
  title: PricingTitleEnum;
  description: string;
  price: PriceTitleDataType[];
  url: string;
  isCurrentPlan?: boolean;
};

type TitleDataDictionary = {
  [key: string]: TitleDataType;
};

export interface AppContext {
  getOoPricing: () => Promise<PriceDataType[]>;
  getOoPricingTitle: () => Promise<TitleDataDictionary>;
}
const titleData: TitleDataDictionary = {
  feature: {
    title: PricingTitleEnum.Feature,
    description: "",
    price: [],
    url: "",
  },
  starter: {
    title: PricingTitleEnum.Starter,
    description: "",
    price: [],
    url: "",
  },
  professional: {
    title: PricingTitleEnum.Professional,
    description: "",
    price: [],
    url: "",
  },
  organization: {
    title: PricingTitleEnum.Organization,
    description: "",
    price: [],
    url: "",
  },
};
export const PricingCard = () => {
  const t = useTranslate();
  const { getOoPricing, getOoPricingTitle } = useAppContext();
  const [priceData, setPriceData] = useState<PriceDataType[]>([]);
  const [priceTitleData, setPriceTitleData] =
    useState<TitleDataDictionary>(titleData);
  const [priceDataLoading, setPriceDataLoading] = useState<boolean>(true);
  const [billType, setBillType] = useState<BillTypeEnum>(BillTypeEnum.Yearly);

  const renderTitle = (title: PricingTitleEnum) => {
    return (
      <PricingTitleContent inner={priceTitleData[title]} billType={billType} />
    );
  };

  const getOoPricingData = async (isMounted: boolean) => {
    if (isMounted) {
      const [res, titleRes] = await Promise.all([
        getOoPricing(),
        getOoPricingTitle(),
      ]);
      setPriceData(preState => [...preState, ...res]);
      setPriceTitleData(titleRes);
      setPriceDataLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getOoPricingData(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  const renderContent = (text: string | boolean) => {
    let inner: string = "";
    switch (text) {
      case true:
        inner = "✓";
        break;
      case false:
        inner = "✗";
        break;
      default:
        inner = text;
    }
    return <span className={styles["pricing-text"]}> {inner}</span>;
  };

  const columns = useMemo(() => {
    const columns: ColumnsType<PriceDataType> = [
      {
        title: renderTitle(PricingTitleEnum.Feature),
        dataIndex: PricingTitleEnum.Feature,
        key: PricingTitleEnum.Feature,
        render: text => renderContent(text),
      },
      {
        title: renderTitle(PricingTitleEnum.Starter),
        dataIndex: PricingTitleEnum.Starter,
        key: PricingTitleEnum.Starter,
        render: text => renderContent(text),
      },
      {
        title: renderTitle(PricingTitleEnum.Professional),
        dataIndex: PricingTitleEnum.Professional,
        key: PricingTitleEnum.Professional,
        render: text => renderContent(text),
      },
      {
        title: renderTitle(PricingTitleEnum.Organization),
        key: PricingTitleEnum.Organization,
        dataIndex: PricingTitleEnum.Organization,
        render: text => renderContent(text),
      },
    ];
    return columns;
  }, [t, billType, priceTitleData]);

  return (
    <ThemeProvider>
      <div className={styles["pricing-box"]}>
        <div className={styles["pricing-box-title"]}>{t("price.title")}</div>
        <Segmented
          className={styles["pricing-box-segmented"]}
          defaultValue={billType}
          onChange={(value): void => {
            setBillType(value as BillTypeEnum);
          }}
          options={[
            {
              label: (
                <div className={styles["pricing-segmented"]}>
                  {t("price.monthly-billing")}
                </div>
              ),
              value: BillTypeEnum.Monthly,
            },
            {
              label: (
                <div className={styles["pricing-segmented"]}>
                  {t("price.yearly-billing")}
                  <span>({t("price.save-up")})</span>
                </div>
              ),
              value: BillTypeEnum.Yearly,
            },
          ]}
        />
        <Table
          columns={columns}
          bordered
          dataSource={priceData}
          pagination={false}
          loading={priceDataLoading}
          scroll={{ y: 360 }}
        />
        <div className={styles["pricing-all-features"]}>
          <a target="_blank" href="https://oomol.com/pricing">
            {t("price.features")} <ArrowRightOutlined />
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
};
