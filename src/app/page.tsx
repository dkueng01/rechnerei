"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Authenticated, Unauthenticated, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const user = useQuery(api.users.viewer);

  console.log("Current user:", user);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Authenticated>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </Authenticated>
      <Unauthenticated>
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-lg">LandingPage</p>
          <a href="/login">
            <Button className="ml-4">Log in</Button>
          </a>
        </div>
      </Unauthenticated>
    </SidebarProvider>
  );
}
