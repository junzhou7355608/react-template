import {
  Blocks,
  Braces,
  CloudCog,
  Database,
  FileCode2,
  Gauge,
  GitBranch,
  LayoutPanelTop,
  Route,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const overviewCards = [
  {
    title: '工程基线',
    value: 'React 19',
    description: '以现代 React 能力作为页面与组件的基础。',
    icon: LayoutPanelTop,
  },
  {
    title: '类型安全',
    value: 'TypeScript 6',
    description: '让业务模型、组件接口和开发体验保持清晰。',
    icon: ShieldCheck,
  },
  {
    title: '构建体验',
    value: 'Vite 8',
    description: '快速启动本地开发，并保持轻量的生产构建。',
    icon: Gauge,
  },
  {
    title: '数据状态',
    value: 'TanStack + Jotai',
    description: '分别处理服务端数据与客户端状态，职责更明确。',
    icon: Database,
  },
  {
    title: '组件体系',
    value: 'shadcn/ui',
    description: '按需组合可访问、可维护的基础 UI 组件。',
    icon: Blocks,
  },
  {
    title: '模块结构',
    value: 'Feature-first',
    description: '按业务功能组织代码，方便持续扩展和迁移。',
    icon: Braces,
  },
  {
    title: '路由方案',
    value: 'TanStack Router',
    description: '用清晰的文件结构管理页面与导航关系。',
    icon: Route,
  },
  {
    title: '接口契约',
    value: 'OpenAPI',
    description: '从接口定义生成类型与客户端代码，减少重复劳动。',
    icon: FileCode2,
  },
  {
    title: '请求管理',
    value: 'Axios',
    description: '统一处理请求配置、错误边界与服务端通信。',
    icon: CloudCog,
  },
  {
    title: '分支协作',
    value: 'Git-ready',
    description: '保留清晰的模块边界，适合团队协作和持续迭代。',
    icon: GitBranch,
  },
  {
    title: '自动检查',
    value: 'Type-safe',
    description: '通过类型、格式与代码质量检查保持工程稳定。',
    icon: ShieldCheck,
  },
  {
    title: '扩展路径',
    value: 'Composable',
    description: '基础组件和业务壳层可以按项目需要自由组合。',
    icon: Workflow,
  },
];

export function HomeOverviewCards() {
  return (
    <section aria-labelledby="overview-cards-title" className="pb-12">
      <div className="mb-5 flex flex-col gap-1">
        <h2 id="overview-cards-title" className="text-lg font-semibold">
          模板基础
        </h2>
        <p className="text-sm text-muted-foreground">
          已配置好的工程能力，直接开始构建你的业务页面。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {overviewCards.map((card) => {
          const CardIcon = card.icon;

          return (
            <Card key={card.title} className="min-h-44">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <CardAction>
                  <span className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <CardIcon aria-hidden="true" className="size-4" />
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-2xl font-semibold tracking-tight">
                  {card.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
