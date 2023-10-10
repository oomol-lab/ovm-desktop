# ovm-desktop

该项目用于帮助 studio-home 测试一些在 electron 使用的功能，目前主要是测试 electron 提供的 setAsDefaultProtocolClient api，该 API 允许外部应用通过注册的协议 scheme 打开 electron 应用。

## 开发

该项目使用 electron-vite 进行项目构建，同时与 studio-home 源码关联，studio-home 的修改，会触发 ovm-desktop 的更新

```shell
pnpm install
pnpm dev
```

## 与 studio-home 的关联

为了能够直接使用 studio-home 的源码，ovm-desktop 项目需要能够编译 studio-home 源码。为此，ovm-desktop 除了使用 pnpm 的 workspace 依赖 studio-home 以外，还安装了 studio-home 的构建依赖。这部分构建工具依赖，ovm-desktop 使用 `*` 约束，通过 pnpm overrides 功能，统一版本，减少下载。同时两边同时使用了`react`，而部分`react`版本的类型不一致，因此也通过`overrides`统一了相关版本。
