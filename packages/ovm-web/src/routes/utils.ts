// export const pageConfigure = (
//   windowService: ConnectionClientService<WindowService>,
//   routePathName: string
// ): void => {
//   switch (routeMatchPath(routePathName)) {
//     case RoutePath.Projects: {
//       windowService.send("updateWindowSetting", {
//         minimumSize: {
//           ...PageSize.Projects,
//         },
//         resizable: true,
//         maximizable: true,
//       });
//       break;
//     }
//   }
// };

// const routeMatchPath = (routePathName: string): string | undefined => {
//   const routePath = Object.values(RoutePath).find(
//     (path: string) => path === routePathName
//   );

//   return routePath;
// };

export const shortId = (id: string): string => {
  return id.slice(0, 12);
};
