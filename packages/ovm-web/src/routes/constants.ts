export enum RoutePath {
  Root = "/",
  HomeRoot = "/home",
  Containers = "/home/containers",
  Settings = "/home/settings",
  SettingsMenu = "/home/settings/:menuKey",
  Images = "/home/images",
  Volumes = "/home/volumes",
}

export const PageSize = {
  Signin: {
    width: 1200,
    height: 800,
  },
  Projects: {
    width: 850,
    height: 640,
  },
} as const;
