export enum RoutePath {
  Root = "/",
  Login = "/login",
  HomeRoot = "/home",
  Projects = "/home/projects",
  Flows = "/home/flows",
  Blocks = "/home/blocks",
  Settings = "/home/settings",
  SettingsMenu = "/home/settings/:menuKey",
  Community = "/home/community",
  Secrets = "/home/secrets",
  Extensions = "/home/extensions",
  Splash = "/home/splash",
  SignIn = "/home/signin",
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
