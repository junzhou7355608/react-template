# React Template

一个面向现代 Web 应用的开源 React 项目模板。它预先整合了类型安全路由、客户端与服务端状态管理、OpenAPI 请求生成、shadcn/ui 主题以及完整的本地质量检查链路。

[在线首页](https://junzhou7355608.github.io/react-template/) · [贡献指南](./CONTRIBUTING.md) · [安全策略](./SECURITY.md) · [MIT License](./LICENSE)

## 特性

- React 19、TypeScript 6、Vite 8 与 React Compiler
- TanStack Router 文件路由与自动代码分割
- TanStack Query、Axios 与 Hey API OpenAPI 客户端
- Jotai 轻量客户端状态管理
- Tailwind CSS 4 与 shadcn/ui Radix Nova
- SVGR 自定义 SVG 图标生成
- ESLint、Prettier、Knip、Husky 与源码行数报告
- 响应式交互文档首页，可直接查看 UI、Jotai 和 Query 示例

## 快速开始

环境要求：Node.js `^20.19.0` 或 `>=22.12.0`，pnpm `10.34.5`。

```bash
corepack enable
pnpm install
pnpm dev
```

`pnpm install` 会通过 `prepare` 打印本地环境信息并安装 Husky Git hooks。环境版本不匹配时只提示警告，不会阻断安装。

需要本地环境变量时：

```bash
cp .env.example .env.local
```

不要在可提交的环境文件中保存密钥、令牌或其他敏感信息。

## 项目结构

```text
src/
├── api/                  # OpenAPI 生成产物
├── assets/               # SVG 图标源文件
├── components/
│   ├── features/         # 页面级功能组件
│   ├── layouts/          # 应用布局
│   ├── providers/        # Jotai、TanStack Query 等 Provider
│   └── ui/               # shadcn/ui 项目源码
├── lib/                  # Router、请求客户端与通用工具
├── routes/               # TanStack Router 文件路由
├── stores/               # Jotai atoms
└── styles/               # Tailwind 与全局主题
```

`@/*` 映射到 `src/*`。页面通过 `src/routes/**` 注册，`src/routeTree.gen.ts` 由 TanStack Router 插件自动生成。

## 状态与数据

- 组件内部状态优先使用 React 自身能力。
- 需要跨组件共享的客户端状态使用 Jotai。
- 服务端异步状态使用 TanStack Query，不将请求结果复制到 atoms。
- Axios、QueryClient 与 Router 均复用 `src/lib/**` 中的现有实例。

首页包含可操作的 Jotai 跨组件清单和 TanStack Query 刷新示例，可作为新功能的最小参考。

## API 与图标生成

OpenAPI 的唯一源文件是 `api.yaml`：

```bash
pnpm gen:api
```

命令会更新 `src/api/**` 中的客户端、类型、SDK、Zod schema 和 Query hooks。不要直接修改这些生成文件。

自定义图标的 SVG 源文件位于 `src/assets/icons/**`：

```bash
pnpm gen:icons
```

不要直接修改 `src/components/icons/**`，应修改 SVG 源文件或生成配置后重新生成。

## shadcn/ui

项目使用 Radix Nova、Neutral、Lucide 与 CSS 变量主题。主题入口为 `src/styles/global.css`，生成配置位于 `components.json`。

新增组件：

```bash
pnpm dlx shadcn@latest add <component>
```

生成到 `src/components/ui/**` 的组件属于项目源码，可以按产品需求调整，同时应保留语义 token、交互状态和无障碍行为。

## 环境变量

| 文件              | 用途                                 |
| ----------------- | ------------------------------------ |
| `.env`            | 默认及开发环境配置                   |
| `.env.test`       | `build:test` 测试环境构建            |
| `.env.production` | `build` 与 `build:prod` 生产环境构建 |
| `.env.local`      | 本地私有覆盖，已被 Git 忽略          |
| `.env.example`    | 可提交的环境变量模板                 |

当前公开变量：

| 变量                | 说明                                         |
| ------------------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | API 基础地址；留空时使用相对地址访问同源服务 |

## 常用命令

| 命令                | 说明                                    |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | 启动 Vite 开发服务                      |
| `pnpm build`        | 执行类型检查并生成生产产物              |
| `pnpm build:test`   | 使用 `test` mode 构建                   |
| `pnpm build:prod`   | 使用 `production` mode 构建             |
| `pnpm preview`      | 预览最近一次构建产物                    |
| `pnpm lint`         | 执行 ESLint，禁止 warning               |
| `pnpm check-types`  | 检查 TypeScript 类型                    |
| `pnpm format:check` | 检查 Prettier 格式                      |
| `pnpm check-all`    | 执行 lint、类型、格式、死代码和循环检查 |
| `pnpm gen:api`      | 根据 `api.yaml` 生成 API 客户端         |
| `pnpm gen:icons`    | 根据 SVG 源文件生成 React 图标组件      |
| `pnpm gen:lines`    | 更新 `SRC_LINE_COUNTS.md`               |

提交 Pull Request 前至少运行：

```bash
pnpm check-all
pnpm build
```

## 参与贡献

欢迎提交 Issue 与 Pull Request。开始前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 和 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)。安全问题请遵循 [SECURITY.md](./SECURITY.md) 私下报告。

本项目采用 [MIT License](./LICENSE)。
