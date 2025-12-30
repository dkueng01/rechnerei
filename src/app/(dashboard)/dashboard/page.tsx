"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { stackClientApp } from "@/stack/client";
import {
  Clock,
  CreditCard,
  DollarSign,
  Plus,
  TrendingUp,
  AlertCircle,
  ClipboardCheck
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center space-y-2 gap-2 mb-6">
        <SidebarTrigger className="m-0" />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-xs text-muted-foreground">
            Willkommen zurück, {user?.displayName || "Admin"}. Hier ist, was heute passiert.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-none border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ 4,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              +20.1% vom letzten Monat
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Erfasste Stunden</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34h 15m</div>
            <p className="text-xs text-muted-foreground mt-1">
              Für November 2025
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Rechnungen</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ 1,850.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 Rechnungen unbezahlt
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Projekte</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              1 Deadline diese Woche
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">

        {/* Main Content: Active Projects / Recent Work */}
        <Card className="col-span-4 rounded-none">
          <CardHeader>
            <CardTitle>Aktive Projekte</CardTitle>
            <CardDescription>
              Deine aktuell laufenden Projekte und ihr Status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">

              {/* Project Item 1 */}
              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">100 Jahre Party</p>
                  <p className="text-xs text-muted-foreground">Feuerwehr Raggal</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium">4h 15m</span>
                    <p className="text-[10px] text-muted-foreground">Erfasst</p>
                  </div>
                  <div className="h-2 w-24 bg-muted overflow-hidden">
                    <div className="h-full bg-primary w-[45%]"></div>
                  </div>
                </div>
              </div>

              {/* Project Item 2 */}
              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Website Redesign</p>
                  <p className="text-xs text-muted-foreground">Bäckerei Müller</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium">12h 00m</span>
                    <p className="text-[10px] text-muted-foreground">Erfasst</p>
                  </div>
                  <div className="h-2 w-24 bg-muted overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[75%]"></div>
                  </div>
                </div>
              </div>

              {/* Project Item 3 */}
              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Image Kampagne '25</p>
                  <p className="text-xs text-muted-foreground">Acme Inc</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium">0h 0m</span>
                    <p className="text-[10px] text-muted-foreground">Nicht gestartet</p>
                  </div>
                  <div className="h-2 w-24 bg-muted overflow-hidden">
                    <div className="h-full bg-muted w-[0%]"></div>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Sidebar: Quick Actions & Alerts */}
        <div className="col-span-3 space-y-4">

          {/* Quick Actions */}
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Schnellzugriff</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/time-tracking">
                <Button variant="outline" className="w-full justify-start rounded-none">
                  <Clock className="mr-2 h-4 w-4" /> Zeit erfassen
                </Button>
              </Link>
              <Link href="/invoices">
                <Button variant="outline" className="w-full justify-start rounded-none">
                  <Plus className="mr-2 h-4 w-4" /> Rechnung erstellen
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="w-full justify-start rounded-none">
                  <Plus className="mr-2 h-4 w-4" /> Neues Projekt
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Overdue / Attention */}
          <Card className="rounded-none border-red-900/20 bg-red-900/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-red-500">
                <AlertCircle className="mr-2 h-4 w-4" /> Achtung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Rechnung #2024-098</p>
                    <p className="text-xs text-muted-foreground">Überfällig seit 5 Tagen</p>
                  </div>
                  <span className="text-sm font-bold">€ 450.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}