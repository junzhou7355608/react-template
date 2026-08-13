import { Link, useLocation } from '@tanstack/react-router';
import {
  BookOpen,
  ChartNoAxesCombined,
  ChevronRight,
  ChevronsUpDown,
  CircleUserRound,
  EllipsisVertical,
  FolderKanban,
  KeyRound,
  Layers3,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  type LucideIcon,
  Moon,
  Settings2,
  UserRound,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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

const overviewLabel = '概览';
const OverviewIcon = BookOpen;
const overviewMenuId = 'overview';
const workspaceMenuId = 'workspace';
const workspaceGroupMenuId = 'workspace-group';
const resourceMenuId = 'resource';

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
            className="w-78 max-w-[calc(100vw-2rem)] p-2"
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
                        <ItemDescription className="text-xs">
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
  activeMenu,
  onNavigate,
  onSelect,
  workspace,
}: {
  activeMenu: string;
  onNavigate?: () => void;
  onSelect: (menuId: string) => void;
  workspace: Workspace;
}) {
  const location = useLocation();
  const isOverviewActive =
    location.pathname === '/' || location.pathname === '/overview';
  const isWorkbenchActive = location.pathname === '/workbench';
  const selectMenu = (menuId: string, closeSidebar = true) => {
    onSelect(menuId);
    if (closeSidebar) {
      onNavigate?.();
    }
  };

  return (
    <SidebarMenu className="gap-1">
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isOverviewActive} size="lg">
          <Link
            aria-current={isOverviewActive ? 'page' : undefined}
            to="/overview"
            onClick={() => {
              selectMenu(overviewMenuId);
            }}
          >
            <OverviewIcon aria-hidden="true" />
            <span>{overviewLabel}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isWorkbenchActive} size="lg">
          <Link
            aria-current={isWorkbenchActive ? 'page' : undefined}
            to="/workbench"
            onClick={() => {
              selectMenu(workspaceMenuId);
            }}
          >
            <LayoutGrid aria-hidden="true" />
            <span>工作台</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Collapsible className="group/collapsible" defaultOpen>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={
                activeMenu === workspaceGroupMenuId ||
                activeMenu.startsWith(`workspace:${workspace.id}:`)
              }
              onClick={() => {
                selectMenu(workspaceGroupMenuId, false);
              }}
              size="lg"
            >
              <Layers3 aria-hidden="true" />
              <span>{workspace.groupLabel}</span>
              <ChevronRight
                aria-hidden="true"
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="mx-0 mt-1 translate-x-0 border-l-0 p-0">
              {workspace.items.map((item) => (
                <SidebarMenuSubItem key={item}>
                  <SidebarMenuSubButton
                    asChild
                    className="h-12 w-full translate-x-0 pr-2 pl-8"
                    isActive={
                      activeMenu === `workspace:${workspace.id}:${item}`
                    }
                  >
                    <button
                      onClick={() => {
                        selectMenu(`workspace:${workspace.id}:${item}`);
                      }}
                      type="button"
                    >
                      <span>{item}</span>
                    </button>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={
                activeMenu === resourceMenuId ||
                activeMenu.startsWith(`${resourceMenuId}:`)
              }
              onClick={() => {
                selectMenu(resourceMenuId, false);
              }}
              size="lg"
            >
              <FolderKanban aria-hidden="true" />
              <span>资源中心</span>
              <ChevronRight
                aria-hidden="true"
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="mx-0 mt-1 translate-x-0 border-l-0 p-0">
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  asChild
                  className="h-12 w-full translate-x-0 pr-2 pl-8"
                  isActive={activeMenu === 'resource:components'}
                >
                  <button
                    onClick={() => {
                      selectMenu('resource:components');
                    }}
                    type="button"
                  >
                    <span>组件库</span>
                  </button>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  asChild
                  className="h-12 w-full translate-x-0 pr-2 pl-8"
                  isActive={activeMenu === 'resource:assets'}
                >
                  <button
                    onClick={() => {
                      selectMenu('resource:assets');
                    }}
                    type="button"
                  >
                    <span>模板资产</span>
                  </button>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({
  activeMenu,
  selectedWorkspace,
  onActiveMenuChange,
  onWorkspaceChange,
}: {
  activeMenu: string;
  selectedWorkspace: Workspace;
  onActiveMenuChange: (menuId: string) => void;
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
          <SidebarGroupContent>
            <AppNavItems
              activeMenu={activeMenu}
              onNavigate={closeMobileSidebar}
              onSelect={onActiveMenuChange}
              workspace={selectedWorkspace}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="h-auto min-h-12 data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  size="lg"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <UserRound className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col items-start gap-0">
                    <span className="truncate text-sm font-semibold">
                      项目用户
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/60">
                      you@example.com
                    </span>
                  </span>
                  <EllipsisVertical
                    aria-hidden="true"
                    className="pointer-events-none ml-auto size-4"
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-46"
                side={isMobile ? 'bottom' : 'right'}
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem className="min-h-10 px-2.5 py-2">
                    <CircleUserRound aria-hidden="true" />
                    个人信息
                  </DropdownMenuItem>
                  <DropdownMenuItem className="min-h-10 px-2.5 py-2">
                    <KeyRound aria-hidden="true" />
                    修改密码
                  </DropdownMenuItem>
                  <DropdownMenuItem className="min-h-10 px-2.5 py-2">
                    <Settings2 aria-hidden="true" />
                    账号设置
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="min-h-10 px-2.5 py-2"
                  variant="destructive"
                >
                  <LogOut aria-hidden="true" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppHeader() {
  const { isMobile, open, openMobile } = useSidebar();
  const sidebarOpen = isMobile ? openMobile : open;

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-sidebar px-2">
      <SidebarTrigger
        aria-expanded={sidebarOpen}
        aria-label="打开或关闭应用导航"
        size="icon-lg"
      />
      <Button
        aria-label="切换深色模式（暂未启用）"
        size="icon-lg"
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
  const [activeMenu, setActiveMenu] = useState(overviewMenuId);
  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === workspaceId) ??
    defaultWorkspace;

  const handleWorkspaceChange = (nextWorkspaceId: WorkspaceId) => {
    setWorkspaceId(nextWorkspaceId);
    setActiveMenu(overviewMenuId);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        activeMenu={activeMenu}
        onActiveMenuChange={setActiveMenu}
        onWorkspaceChange={handleWorkspaceChange}
        selectedWorkspace={selectedWorkspace}
      />
      <SidebarInset className="bg-sidebar">{children}</SidebarInset>
    </SidebarProvider>
  );
}
