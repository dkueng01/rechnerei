"use client"

import * as React from "react"
import {
  BookUser,
  ClipboardCheck,
  Clock,
  Landmark,
  LayoutDashboard,
  Package,
  ReceiptEuro,
  Send,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUserSkeleton } from "./nav-user-skeleton"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: BookUser,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: ClipboardCheck,
    },
    {
      title: "Catalog",
      url: "/catalog",
      icon: Package,
    },
    {
      title: "Time Tracking",
      url: "/time-tracking",
      icon: Clock,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: ReceiptEuro,
    },
    {
      title: "Finances",
      url: "/finances",
      icon: Landmark,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "https://insigh.to/b/rechnerei",
      icon: Send,
    },
  ],
}

export function SuspendedAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                  <ReceiptEuro className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">RECHNEREI</span>
                  <span className="truncate text-xs">v0.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUserSkeleton />
      </SidebarFooter>
    </Sidebar>
  )
}
