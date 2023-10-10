import styles from "./PricingTitleContent.module.scss";

import type { TitleDataType } from ".";

import { Tag, Button } from "antd";
import { BillTypeEnum } from "~/routes/Settings/Bill";

interface PricingContentProps {
  inner: TitleDataType;
  billType: BillTypeEnum;
}

export enum PricingTitleEnum {
  Feature = "feature",
  Starter = "starter",
  Professional = "professional",
  Organization = "organization",
}

export const PricingTitleContent = ({
  inner,
  billType,
}: PricingContentProps) => {
  const renderPricingUrlButton = (inner: TitleDataType) => {
    if (inner.url) {
      if (inner.isCurrentPlan) {
        return <Button disabled>Current plan</Button>;
      } else {
        return (
          <Button type="primary" target="_blank" href={inner.url}>
            Upgrade to {inner.title}
          </Button>
        );
      }
    }
  };

  return (
    <div className={styles["pricing-feature"]}>
      <>
        <div className={styles["pricing-nav-title"]}>
          <span className={styles["pricing-feature-title"]}>{inner.title}</span>
          {inner.title === PricingTitleEnum.Professional && (
            <Tag color="green">Most popular</Tag>
          )}
        </div>
        <div className={styles["pricing-feature-description"]}>
          {inner.description}
        </div>
      </>
      {inner.price.map(priceObj => {
        return (
          <div className={styles["pricing-number"]} key={priceObj.title}>
            <div>{priceObj.title}</div>
            <div>
              {billType === BillTypeEnum.Yearly ? (
                <span className={styles["pricing-number-style"]}>
                  ${priceObj.yearly}
                </span>
              ) : (
                <span className={styles["pricing-number-style"]}>
                  ${priceObj.monthly}
                </span>
              )}
              /editor/mo.
            </div>
          </div>
        );
      })}
      {renderPricingUrlButton(inner)}
    </div>
  );
};
