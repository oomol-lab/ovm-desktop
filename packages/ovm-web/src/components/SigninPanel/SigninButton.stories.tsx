import type { SigninButtonProps } from "./SigninButton";
import type { Meta, StoryObj } from "@storybook/react";

import { SigninButton } from "./SigninButton";

const storyMeta: Meta = {
  title: "SigninPanel/SigninButton",
  component: SigninButton,
};

export default storyMeta;

export const OverView: StoryObj<SigninButtonProps> = {
  args: {
    provider: "github",
    text: "GitHub",
  },
};
