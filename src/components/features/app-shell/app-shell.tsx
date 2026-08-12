import {
  BookOpen,
  ChartNoAxesCombined,
  ChevronRight,
  ChevronsUpDown,
  Layers3,
  LayoutDashboard,
  type LucideIcon,
  Moon,
  Settings2,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

type WorkspaceId = 'business' | 'config' | 'operation';

interface Workspace {
  id: WorkspaceId;
  label: string;
  description: string;
  groupLabel: string;
  items: string[];
  icon: LucideIcon;
}

const defaultWorkspace: Workspace = {
  id: 'business',
  label: '业务中心',
  description: '处理订单、客户与日常业务流程',
  groupLabel: '业务管理',
  items: ['订单管理', '客户管理'],
  icon: LayoutDashboard,
};

const workspaces: Workspace[] = [
  defaultWorkspace,
  {
    id: 'config',
    label: '配置中心',
    description: '管理角色、权限与系统参数',
    groupLabel: '系统配置',
    items: ['角色权限', '参数设置'],
    icon: Settings2,
  },
  {
    id: 'operation',
    label: '经营中心',
    description: '查看业绩、趋势与经营分析',
    groupLabel: '经营分析',
    items: ['业绩看板', '趋势报表'],
    icon: ChartNoAxesCombined,
  },
];

const overviewHref = '#overview';
const overviewLabel = '概览';
const OverviewIcon = BookOpen;

function AppWorkspaceSwitcher({
  selectedWorkspace,
  onWorkspaceChange,
}: {
  selectedWorkspace: Workspace;
  onWorkspaceChange: (workspaceId: WorkspaceId) => void;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="h-auto min-h-12 data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              size="lg"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <selectedWorkspace.icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col items-start gap-0">
                <span className="truncate text-sm font-semibold">
                  {selectedWorkspace.label}
                </span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  React Template
                </span>
              </span>
              <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-88 max-w-[calc(100vw-2rem)] p-2"
            side="bottom"
          >
            <DropdownMenuRadioGroup
              value={selectedWorkspace.id}
              onValueChange={(value) => {
                if (
                  value === 'business' ||
                  value === 'config' ||
                  value === 'operation'
                ) {
                  onWorkspaceChange(value);
                }
              }}
            >
              {workspaces.map((workspace) => {
                const WorkspaceIcon = workspace.icon;

                return (
                  <DropdownMenuRadioItem
                    key={workspace.id}
                    className="mb-1 p-0 last:mb-0 focus:bg-transparent focus:text-foreground"
                    value={workspace.id}
                  >
                    <Item className="hover:bg-muted" variant="muted">
                      <ItemMedia variant="icon">
                        <WorkspaceIcon aria-hidden="true" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{workspace.label}</ItemTitle>
                        <ItemDescription>
                          {workspace.description}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function AppNavItems({
  onNavigate,
  workspace,
}: {
  onNavigate?: () => void;
  workspace: Workspace;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive>
          <a aria-current="page" href={overviewHref} onClick={onNavigate}>
            <OverviewIcon aria-hidden="true" />
            <span>{overviewLabel}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Collapsible className="group/collapsible" defaultOpen>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Layers3 aria-hidden="true" />
              <span>{workspace.groupLabel}</span>
              <ChevronRight
                aria-hidden="true"
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {workspace.items.map((item) => (
                <SidebarMenuSubItem key={item}>
                  <SidebarMenuSubButton asChild>
                    <button type="button">
                      <span>{item}</span>
                    </button>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({
  selectedWorkspace,
  onWorkspaceChange,
}: {
  selectedWorkspace: Workspace;
  onWorkspaceChange: (workspaceId: WorkspaceId) => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar aria-label="应用导航" collapsible="offcanvas">
      <SidebarHeader>
        <AppWorkspaceSwitcher
          onWorkspaceChange={onWorkspaceChange}
          selectedWorkspace={selectedWorkspace}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导航</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppNavItems
              onNavigate={closeMobileSidebar}
              workspace={selectedWorkspace}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback>项</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">项目用户</p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              you@example.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppHeader() {
  const { isMobile, open, openMobile } = useSidebar();
  const sidebarOpen = isMobile ? openMobile : open;

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border/80 bg-background/95 px-4 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <SidebarTrigger
        aria-expanded={sidebarOpen}
        aria-label="打开或关闭应用导航"
      />
      <Button
        aria-label="切换深色模式（暂未启用）"
        size="icon-sm"
        title="切换深色模式（暂未启用）"
        type="button"
        variant="ghost"
      >
        <Moon aria-hidden="true" />
      </Button>
    </header>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  const [workspaceId, setWorkspaceId] = useState<WorkspaceId>('business');
  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === workspaceId) ??
    defaultWorkspace;

  return (
    <SidebarProvider>
      <AppSidebar
        onWorkspaceChange={setWorkspaceId}
        selectedWorkspace={selectedWorkspace}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
