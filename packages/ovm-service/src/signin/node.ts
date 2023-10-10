import type { SigninProcessResult } from "./common";
import type { IConnectionService } from "@oomol/connection";

import { ConnectionService } from "@oomol/connection";

import { SigninService } from "./common";

export class SigninServiceImpl
  extends ConnectionService<SigninService>
  implements IConnectionService<SigninService>
{
  public constructor() {
    super(SigninService);
  }
  checkSignedStatus(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getSigninProcessResult(): Promise<SigninProcessResult> {
    throw new Error("Method not implemented.");
  }
}
