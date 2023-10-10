import type { SigninButtonsProps } from "./SigninButtons";
import type { Meta, StoryObj } from "@storybook/react";

import { SigninButtons } from "./SigninButtons";

const storyMeta: Meta = {
  title: "SigninPanel/SigninButtons",
  component: SigninButtons,
};

export default storyMeta;

export const Overview: StoryObj<SigninButtonsProps> = {
  args: {
    buttons: [
      { provider: "github", text: "GitHub" },
      { provider: "google", text: "Google" },
    ],
  },
};
