import type { SigninWithBrowserProps } from ".";
import type { Meta, StoryObj } from "@storybook/react";

import { SigninWithBrowser } from ".";

const storyMeta: Meta = {
  title: "SigninWithBrowser/SigninWithBrowser",
  component: SigninWithBrowser,
};

export default storyMeta;

export const Overview: StoryObj<SigninWithBrowserProps> = {
  args: {
    isError: true,
    signinSrc: "https://console.oomol.com/",
    signupSrc: "https://console.oomol.com/",
  },
};
