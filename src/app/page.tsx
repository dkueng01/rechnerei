"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  console.log("isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

  return (
    <>
    {/* <Authenticated> */}
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 56)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
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
        </SidebarProvider>
      {/* </Authenticated>
      <Unauthenticated>
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-lg">LandingPage</p>
          <a href="/signin">
            <Button className="ml-4">Log in</Button>
          </a>
        </div>
      </Unauthenticated> */}
    </>
  );
}
