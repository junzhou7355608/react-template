# 参与 React Template 开发

感谢你愿意改进 React Template。项目通过 GitHub Issue 讨论问题，并通过 Pull Request 合入 `main`。

参与前请遵守 [行为准则](./CODE_OF_CONDUCT.md)。安全漏洞不要创建公开 Issue，请按照 [安全策略](./SECURITY.md) 私下报告。

## 开始之前

本地环境需要 Node.js `^20.19.0` 或 `>=22.12.0` 以及 pnpm `10.34.5`：

```bash
corepack enable
pnpm install
cp .env.example .env.local
```

`.env.local` 用于本地私有配置。不得提交密钥、令牌、内部账号或其他敏感信息。

## 开发流程

1. 对较大的功能或行为变化，先创建 Issue 说明目标和方案。
2. Fork 仓库并从最新 `main` 创建单一目的的分支。
3. 完成修改，同步更新相关文档、OpenAPI 或图标源文件。
4. 运行与改动范围匹配的检查。
5. 使用 Conventional Commits 创建提交。
6. 推送分支并创建 Pull Request，说明改动、验证结果和界面截图。

不要在同一个 Pull Request 中混入无关格式化、依赖升级或重构。

## 代码约定

- 使用 TypeScript 并优先依赖类型推断。
- 未经项目讨论，不使用 `any`、类型断言 `as`、`unknown` 或 `never`。
- 使用 `@/*` 直接导入 `src/*` 内的具体模块，避免无意义的 barrel export。
- 页面路由放在 `src/routes/**`，不要手工修改生成的路由树。
- 共享客户端状态使用 Jotai；服务端数据使用 TanStack Query。
- UI 优先复用 `src/components/ui/**` 中的 shadcn/ui 组件和语义主题 token。
- 源码文件一般控制在 300 行以内，必要时按职责拆分。

## 生成文件

以下文件通过命令生成，不应手工维护：

- `src/api/**`：修改 `api.yaml` 后运行 `pnpm gen:api`。
- `src/components/icons/**`：修改 `src/assets/icons/**` 后运行 `pnpm gen:icons`。
- `src/routeTree.gen.ts`：由 TanStack Router Vite 插件生成。
- `SRC_LINE_COUNTS.md`：运行 `pnpm gen:lines` 更新。

提交生成结果前，确认差异只包含预期内容。

## 检查与验证

所有代码改动至少运行：

```bash
pnpm check-all
```

涉及依赖、构建配置、路由、主题或生产行为时还需运行：

```bash
pnpm build
```

UI 改动应检查移动端和桌面端布局、键盘焦点、交互状态及 reduced-motion 行为。

## 提交信息

提交信息使用中文 Conventional Commits：

```text
<type>(<scope>): <中文说明>
```

常用类型包括 `feat`、`fix`、`refactor`、`style`、`docs`、`build`、`chore` 和 `test`。

示例：

```text
feat(home): 添加模板文档首页
fix(api): 修正健康检查响应类型
docs(project): 完善本地开发说明
```

## Pull Request 检查清单

- 改动目的和影响范围清晰。
- 没有敏感信息、临时日志或无关文件。
- 生成文件与其源文件保持同步。
- `pnpm check-all` 已通过。
- 必要时 `pnpm build` 已通过。
- UI 改动包含验证说明或截图。
- 文档、环境变量示例与 OpenAPI 已按需更新。

提交贡献即表示你有权在项目的 [MIT License](./LICENSE) 下提供该改动。
