import { Bell, ChevronRight, ExternalLink, Settings2 } from 'lucide-react';

import { SectionHeading } from '@/components/features/docs/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function UiShowcaseSection() {
  return (
    <section id="ui" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Components"
        title="直接拥有，也可以随时改造"
        description="组件源码位于项目内部，遵循 shadcn/ui Radix Nova 风格、官方 Neutral 主题和完整交互状态。"
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>按钮与状态</CardTitle>
            <CardDescription>语义变体共享同一套主题 token。</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>保存更改</Button>
            <Button variant="secondary">稍后处理</Button>
            <Button variant="outline">查看详情</Button>
            <Button variant="ghost">取消</Button>
            <Button disabled>处理中</Button>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Badge>默认</Badge>
            <Badge variant="secondary">草稿</Badge>
            <Badge variant="outline">待评审</Badge>
            <Badge variant="destructive">已阻止</Badge>
          </CardFooter>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>输入与操作</CardTitle>
            <CardDescription>标签、提示与动作使用一致的措辞。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="project-name">
                项目名称
              </label>
              <Input
                id="project-name"
                name="projectName"
                placeholder="my-react-app"
              />
              <p className="text-xs text-muted-foreground">
                将用于页面标题和包元数据。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Settings2 aria-hidden="true" />
                    打开设置
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>项目设置</SheetTitle>
                    <SheetDescription>
                      Sheet
                      适合承载移动导航和次级任务，同时保留焦点管理与键盘行为。
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mx-4 space-y-3 rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                      <Bell className="size-4" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">质量检查提醒</p>
                        <p className="text-xs text-muted-foreground">
                          提交前运行 pnpm check-all
                        </p>
                      </div>
                      <ChevronRight
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button asChild variant="link">
                <a
                  href="https://ui.shadcn.com/docs/components"
                  rel="noreferrer"
                  target="_blank"
                >
                  浏览组件
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
