import type { ConnectionClientService } from "@oomol/connection";
import type { OVMService } from "@oomol-lab/ovm-service/common";

import { throttle } from "lodash-es";

export class OVMStore {
  private whenReady: Promise<void> | undefined;

  public constructor(private ovmService: ConnectionClientService<OVMService>) {
    this.whenReady = new Promise(resolve => {
      const dispose = this.ovmService.on("ready", () => {
        resolve();
        console.log("[OVM]: ready");
      });

      this.ovmService.invoke("isReady").then(ready => {
        if (ready) {
          dispose();
          resolve();
        }
      });
    });
  }

  public async listContainers() {
    await this.whenReady;
    return this.ovmService.invoke("listContainers");
  }

  public async removeContainer(id: string) {
    await this.whenReady;
    return this.ovmService.invoke("removeContainer", id);
  }

  public async listImages() {
    await this.whenReady;
    return this.ovmService.invoke("listImages");
  }

  public async removeImage(name: string, force?: boolean) {
    await this.whenReady;
    return this.ovmService.invoke("removeImage", name, force);
  }

  public async listVolumes() {
    await this.whenReady;
    return this.ovmService.invoke("listVolumes");
  }

  public async removeVolume(name: string) {
    await this.whenReady;
    return this.ovmService.invoke("removeVolume", name);
  }

  public searchImages = throttle(async (term: string) => {
    await this.whenReady;
    return this.ovmService.invoke("searchImages", term);
  }, 1000);

  public pullImage(name: string) {
    return this.ovmService.invoke("pullImage", name);
  }
}
