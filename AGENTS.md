# React Template Agent Guide

React Template 是基于 React、TypeScript、Vite 与 shadcn/ui 的开源前端项目模板。项目说明、贡献流程和许可分别见 [README.md](./README.md)、[CONTRIBUTING.md](./CONTRIBUTING.md) 与 [LICENSE](./LICENSE)。

## 核心规则

- 仅使用 pnpm；不要创建 npm 或 Yarn 锁文件。
- `pnpm install` 会通过 `prepare` 打印环境信息并安装 Husky hooks；`pre-commit` 处理暂存文件，`commit-msg` 校验 Conventional Commits。
- 只处理用户授权的范围，保留工作区中已有且无关的修改。
- 未经用户明确要求，不创建提交、不推送、不发起 Pull Request。
- 未经允许不写 `any`、类型断言 `as`、`unknown`、`never`；优先依赖类型推断。
- 接口类型不准确时，优先修正 OpenAPI 或后端声明，再考虑前端守卫与收窄。

## 架构约束

- 路由使用 `src/routes/**`，状态使用 Jotai，服务端数据使用 TanStack Query；复用现有 Router、Axios 与 QueryClient 实例。
- 使用 `@/*` 直接导入具体模块，避免无意义的 barrel export。
- UI 使用 Tailwind CSS 4 与 shadcn/ui Radix Nova 语义 token，并保留组件接口、交互状态和无障碍行为。

## 生成文件

- 修改 `api.yaml` 后运行 `pnpm gen:api`；不要手改 `src/api/**`。
- 修改 `src/assets/icons/flags/**` 后运行 `pnpm gen:icons`；不要手改 `src/components/icons/**`。
- `src/routeTree.gen.ts` 由 TanStack Router 生成，不要手工修改。
- 源码文件一般控制在 300 行以内，必要时按职责拆分。

## 验证

- 代码改动按影响运行 `pnpm lint`、`pnpm check-types` 或 `pnpm check-all`。
- 依赖、构建、路由、主题或生产行为变化时运行 `pnpm build`。
- 默认不打开浏览器；仅在用户反馈、明确要求或交互必须浏览器验证时使用。
- 纯文档改动只检查格式、链接、内容和 `git diff --check`；不得降低现有检查规则。
