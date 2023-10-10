import type { SigninWithEmailProps } from "./SigninWithEmail";
import type { Meta, StoryObj } from "@storybook/react";

import { message } from "antd";

import { SigninWithEmail } from "./SigninWithEmail";

const storyMeta: Meta = {
  title: "SigninPanel/SigninWithEmail",
  component: SigninWithEmail,
};

export default storyMeta;

export const Overview: StoryObj<SigninWithEmailProps> = {
  args: {
    sendVerificationCode: (email: string) => {
      console.log("sendVerificationCode", email);
      return new Promise(resolve =>
        setTimeout(() => resolve(email === "a@a"), 1000)
      );
    },
    verifyEmail: (email: string, code: string) => {
      console.log("verifyEmail", email, code);
      return new Promise(resolve => setTimeout(() => resolve(true), 1000));
    },
    resetPassword: (email: string, code: string, password: string) => {
      console.log("resetPassword", email, code, password);
      return new Promise(resolve =>
        setTimeout(() => resolve(password === "123456"), 1000)
      );
    },
    signin: (email: string, password: string) => {
      void message.info(`signin ${email} ${password}`);
      return new Promise(resolve =>
        setTimeout(() => resolve(password === "123456"), 1000)
      );
    },
    signup: (email: string, password: string) => {
      void message.info(`register ${email} ${password}`);
      return new Promise(resolve =>
        setTimeout(() => resolve(password === "123456"), 1000)
      );
    },
    signinWithGitHub: () => {
      void message.info("signinWithGitHub");
      return new Promise(resolve => setTimeout(() => resolve(), 1000));
    },
  },
};
