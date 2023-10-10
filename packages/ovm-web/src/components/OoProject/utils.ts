export enum ProjectItemGradient {
  BlueSky = "linear-gradient(270deg, #1EB5F3 0%, #24B7F4 100%)",
  Sunset = "linear-gradient(270deg, #F3AC62 0%, #F2A14E 100%)",
  DarkBlue = "linear-gradient(270deg, #5872C7 0%, #4865C2 100%)",
  OceanBlue = "linear-gradient(270deg, #10B0F3 0%, #24B7F4 100%)",
  Plum = "linear-gradient(180deg, #895DC2 0%, #8050BD 100%)",
  Pink = "linear-gradient(180deg, #F093D6 0%, #EE84D0 100%)",
  Mint = "linear-gradient(180deg, #1CD0B1 0%, #00CAA7 100%)",
  Sunrise = "linear-gradient(180deg, #EBC734 0%, #E9C01B 100%)",
  Coral = "linear-gradient(180deg, #EC6D74 0%, #EA5A61 100%)",
  Grapes = "linear-gradient(180deg, #BA81E2 0%, #B171DF 100%)",
  Ice = "linear-gradient(180deg, #1ECDDF 0%, #00C7DB 100%)",
  Stone = "linear-gradient(180deg, #A29793 0%, #958985 100%)",
  GreyBlue = "linear-gradient(180deg, #7A828B 0%, #79838E 100%)",
}

export const randomProjectItemGradient = (): ProjectItemGradient => {
  const gradientList = Object.values(ProjectItemGradient);
  const randomIndex = Math.floor(Math.random() * gradientList.length);
  return gradientList[randomIndex];
};

export const generateGradientColor = (
  projectName: string
): ProjectItemGradient => {
  const gradientColors = Object.values(ProjectItemGradient);

  const firstCharCode = projectName.charCodeAt(0);
  const lastCharCode = projectName.charCodeAt(projectName.length - 1);
  const index = (firstCharCode + lastCharCode) % gradientColors.length;

  return gradientColors[index];
};
