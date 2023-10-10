import type { SigninAgreementProps } from "./SigninAgreement";
import type { Meta, StoryObj } from "@storybook/react";

import { SigninAgreement } from "./SigninAgreement";

const storyMeta: Meta = {
  title: "SigninPanel/SigninAgreement",
  component: SigninAgreement,
};

export default storyMeta;

export const Overview: StoryObj<SigninAgreementProps> = {
  args: {
    checked: false,
  },
};
