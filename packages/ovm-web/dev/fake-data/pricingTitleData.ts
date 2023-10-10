import { PricingTitleEnum } from "~/components/PricingCard/PricingTitleContent";

export const pricingTitleData = () => {
  return {
    feature: {
      title: PricingTitleEnum.Feature,
      description: "",
      price: [],
      url: "",
    },
    starter: {
      title: PricingTitleEnum.Starter,
      description:
        "For vou and your team, with unlimited files and all the pro features",
      price: [{ title: "Oomol Studio", monthly: 12, yearly: 24 }],
      url: "https://oomol.com/pricing",
      isCurrentPlan: true,
    },
    professional: {
      title: PricingTitleEnum.Professional,
      description:
        "For vou and your team, with unlimited files and all the pro features",
      price: [{ title: "Oomol Studio", monthly: 12, yearly: 24 }],
      url: "https://oomol.com/pricing",
    },
    organization: {
      title: PricingTitleEnum.Organization,
      description:
        "For vou and your team, with unlimited files and all the pro features",
      price: [{ title: "Oomol Studio", monthly: 12, yearly: 24 }],
      url: "https://oomol.com/pricing",
    },
  };
};
