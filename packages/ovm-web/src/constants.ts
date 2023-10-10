export enum OS {
  Windows = "win",
  Mac = "mac",
  Linux = "linux",
  Web = "web",
}

export type OSLiteral = `${OS}`;

export enum Appearance {
  Auto = "auto",
  Light = "light",
  Dark = "dark",
}

export type AppearanceLiteral = `${Appearance}`;
