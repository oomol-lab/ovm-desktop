import type { DefineService } from "@oomol/connection";

import { token } from "@oomol/token";

export type SigninProcessResult = {
  authID: string | null;
  processID: string | null;
  type: "signin" | "signup";
};

export type SigninService = DefineService<{
  events: {
    signinProcess: void;
  };
  emits: {};
  invokes: {
    checkSignedStatus(): Promise<boolean>;
    getSigninProcessResult(): Promise<SigninProcessResult>;
  };
}>;

export const SigninService = token<SigninService>("SigninService");
