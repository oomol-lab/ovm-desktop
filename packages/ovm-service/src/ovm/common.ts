import type { DefineService } from "@oomol/connection";

import { token } from "@oomol/token";

export type ContainerInfo = {
  id: string;
  name: string;
  image: string;
  status: string;
  created: string;
};

export type ImageInfo = {
  id: string;
  created: string;
  size: number;
  name: string;
  tags: string[];
};

export type VolumeInfo = {
  name: string;
  driver: string;
  scope: string;
  mountpoint: string;
};

export type SearchItem = {
  index: string;
  name: string;
  official: string;
  stars: number;
  description: string;
  tag: string;
  automated: string;
};

export const OVMService = token<OVMService>("OVMService");
export type OVMService = DefineService<{
  events: {
    ready: boolean;
  };
  invokes: {
    isReady: () => boolean;
    listContainers: () => Promise<ContainerInfo[] | undefined>;
    getContainer: (id: string) => Promise<ContainerInfo | undefined>;
    getContainerLog: (id: string) => Promise<string | undefined> | undefined;
    createContainer: (
      imageName: string,
      containerName: string | undefined
    ) => Promise<string | undefined>;
    removeContainer: (id: string) => Promise<void>;

    listImages: () => Promise<ImageInfo[] | undefined>;
    getImage: (name: string) => Promise<ImageInfo | undefined>;
    removeImage: (name: string, force?: boolean) => Promise<void>;
    searchImages: (term: string) => Promise<SearchItem[] | undefined>;
    pullImage: (name: string) => void;

    listVolumes: () => Promise<VolumeInfo[] | undefined>;
    removeVolume: (name: string) => Promise<void>;

    stop: () => Promise<void>;
  };
}>;
