import { BookOpen, GitBranch, Layers3 } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
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
          <SidebarMenuButton
            asChild
            className="rounded-md border-l-2 border-sidebar-primary px-3 py-2 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
            isActive
          >
            <a
              aria-current="page"
              href={href}
              onClick={onNavigate}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
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
    <Sidebar
      aria-label="应用导航"
      className="bg-sidebar text-sidebar-foreground"
      collapsible="offcanvas"
    >
      <SidebarHeader className="p-6">
        <AppBrand onClick={closeMobileSidebar} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-4 py-0">
          <SidebarGroupLabel className="h-auto px-3 pb-2 text-[11px] font-semibold tracking-[0.18em] text-sidebar-foreground/55 uppercase">
            导航
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <AppNavItems onNavigate={closeMobileSidebar} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto space-y-4 border-t border-sidebar-border p-4">
        <p className="font-mono text-xs text-sidebar-foreground/60">v1.0.0</p>
        <Button
          asChild
          className="w-full justify-start border-sidebar-border bg-sidebar hover:bg-sidebar-accent"
          size="sm"
          variant="outline"
        >
          <a
            href="https://github.com/junzhou7355608/react-template"
            rel="noreferrer"
            target="_blank"
          >
            <GitBranch data-icon="inline-start" aria-hidden="true" />
            GitHub
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppMobileHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border/80 bg-background/95 px-4 backdrop-blur-sm supports-backdrop-filter:bg-background/80 md:hidden">
      <SidebarTrigger aria-label="打开文档导航" />
      <AppBrand />
      <span className="w-8" aria-hidden="true" />
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
