# home-service

本项目基于`@oomol/connection`和`@oomol/token`开发，为`ovm-desktop`项目提供前后端隔离环境的 API 调用和后端实现。部分 API 代码和结构，参考自[@oomol/connection](https://github.com/oomol/oomol-connection)文档。

## 使用

项目需要使用`@oomol/connection-electron-adapter`和`@oomol/connection`在 electron 的 main，preload，renderer 进行初始化配置。具体可以参考[`@oomol/connection`文档](https://github.com/oomol/oomol-connection#electron) 中的 electron 部分。

项目根据`@oomol/connection`的接口情况，分为两部分：

1. 两端公用部分，可以通过`@oomol-lab/ovm-service`直接引用。
2. 后端实现部分，可以通过`@oomol-lab/ovm-service/node`引用。

具体以`package.json`中的`typeVersions`和`exports`为准。

### home-service 使用

#### 使用 electron-adapter

1. 在 preload 中，使用`@oomol/connection-electron-adapter/preload`导入`setupConnectionPreload`方法，并调用。
1. 在 renderer 端，使用`@oomol/connection-electron-adapter/client`初始化 ElectronClientAdapter，传给`ConnectionClient`进行连接初始化。
1. 在 renderer 端，将对应的 service 类型实现传给`ConnectionClient`，即可使用。
1. 在 main 端，使用`@oomol/connection-electron-adapter/server`初始化 ElectronServerAdapter，传给`ConnectionServer`进行连接初始化。
1. 在 main 端，将对应的 service 类型的实现，传给`ConnectionServer`。

- preload 端代码

```typescript
import { setupConnectionPreload } from "@oomol/connection-electron-adapter/preload";
setupConnectionPreload();
```

- renderer 端代码

```typescript
import { ElectronClientAdapter } from "@oomol/connection-electron-adapter/client";
import { ConnectionClient } from "@oomol/connection";
import { WindowService, SigninService } from "@oomol-lab/ovm-service/common";
const client = new ConnectionClient(new ElectronClientAdapter());

client.start();
const windowService = client.use(WindowService);
const signinService = client.use(SigninService);
```

- main 端代码

```typescript
import { ConnectionServer } from "@oomol/connection";
import { ElectronServerAdapter } from "@oomol/connection-electron-adapter/server";
import {
  WindowServiceImpl,
  SigninServiceImpl,
} from "@oomol-lab/ovm-service/node";

const server = new ConnectionServer(new ElectronServerAdapter());

server.start();

server.registerService(new WindowServiceImpl());
server.registerService(new SigninServiceImpl());
```

运行代码可以参考 ovm-desktop 项目中的`src/preload/index.ts`，`src/renderer/main.ts`和`src/main/index.ts`。

## 开发

为了支持`workspace`之间直接源码引用，`package.json`中大量使用了`publishConfig`在发布时，替换 package.json 根字段中内容的功能，部分字段目前只有 pnpm 支持，所以必须使用 pnpm publish。

### 添加新的 service 接口

1. 在`src`目录下，新建对应 service 名称的文件夹，共用部分写在 `common.ts`中，如果实现部分不需要额外的依赖，可以写在`node.ts`中，如果需要在其他地方实现，可以在对应位置写实现即可。
1. 在 package.json 中配置对应的 exports，typeVersions，具体可以参考已有的配置。
1. 在 src 的 common.ts 和 node.ts 导出对应接口。
