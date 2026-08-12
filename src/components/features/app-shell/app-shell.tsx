import { BookOpen, ChevronRight, Layers3, Moon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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

const navigationItems = [
  {
    href: '#overview',
    label: '概览',
    icon: BookOpen,
  },
];

function AppBrand({ onClick }: { onClick?: () => void }) {
  return (
    <a
      className="flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none"
      href="#overview"
      onClick={onClick}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
        <Layers3 className="size-4" aria-hidden="true" />
      </span>
      <span className="font-semibold tracking-tight">React Template</span>
    </a>
  );
}

function AppNavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <SidebarMenu>
      {navigationItems.map(({ href, icon: Icon, label }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton asChild isActive>
            <a aria-current="page" href={href} onClick={onNavigate}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <Collapsible className="group/collapsible" defaultOpen>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Layers3 aria-hidden="true" />
              <span>资源</span>
              <ChevronRight
                aria-hidden="true"
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <button type="button">
                    <span>组件</span>
                  </button>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <button type="button">
                    <span>配置</span>
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

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar aria-label="应用导航" collapsible="offcanvas">
      <SidebarHeader>
        <AppBrand onClick={closeMobileSidebar} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导航</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppNavItems onNavigate={closeMobileSidebar} />
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
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
