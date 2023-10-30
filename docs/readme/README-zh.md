<p align="center">
    <img width="94" height="94" style="display: block;" src="./assets/logo.svg">
</p>

<div align="center">
    <h1>OVM Desktop</h1>
    <p>OVM 是一个快速、轻量级且易于使用的应用程序，用于运行 Docker 容器。使用我们的 Docker 桌面替代方案可以快速进行开发。</p>
</div>

<div align="center">
    <p>OVM 项目是 OVM 的 Windows 和 macOS 客户端。</p>
    <img src="./assets/ovm_showcase.jpg">
</div>

## 特性

## 快速上手

### 安装

> 如果你还没有安装 `pnpm`：
>
> ```bash
> npm i -g pnpm
> ```

Clone 或者 fork 这个项目，在根目录执行：

```bash
pnpm i
```

### 构建并运行 Flat Electron 客户端

在仓库根目录运行以下命令：

```shell
pnpm start
```

You can use one of the following methods to package your executable:

- Run `pnpm ship` at project root to package based on current system.
- Alternatively, run `pnpm ship:mac` or `pnpm ship:win` at project root to package for a specified system.

### Build and run OVM Web client

Run the following command at the root of the repository to build and run OVM web client.

```shell
pnpm start:web
```

Alternatively, run the following command:

```shell
cd ./web/ovm-web/ && pnpm start
```

UI and business logic are separated in OVM. You can view and develop OVM components UI via Storybook. You can either visit the ([Online address][ovm-storybook]) or run `pnpm storybook` at the root of the repository to run Storybook locally.

## References

## Related Projects

## Contributing

## Code Contributors

Thank you to all the people who already contributed to OVM!

## Disclaimer

## License

Copyright © OOMOL Corporation. All rights reserved.

Licensed under the [MIT license](LICENSE).

When using the OVM or other GitHub logos, be sure to follow the [GitHub logo guidelines][github-logo].
