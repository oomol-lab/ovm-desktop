import type { SigninTitleProps } from "./SigninTitle";
import type { Meta, StoryObj } from "@storybook/react";

import { SigninTitle } from "./SigninTitle";

const storyMeta: Meta = {
  title: "SigninPanel/SigninTitle",
  component: SigninTitle,
};

export default storyMeta;

export const Overview: StoryObj<SigninTitleProps> = {};
