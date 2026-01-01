"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { stackClientApp } from "@/stack/client";
import { startOfMonth, endOfMonth, format } from "date-fns";

import { FinanceService } from "@/services/finance-service";
import { InvoiceService } from "@/services/invoice-service";
import { ProjectService } from "@/services/project-service";
import { TimeEntryService } from "@/services/time-entry-service";
import { Project, Invoice } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock, CreditCard, DollarSign, Plus, TrendingUp, AlertCircle,
  ClipboardCheck, ArrowRight, Loader2
} from "lucide-react";

export default function DashboardPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    revenue: 0,
    hoursMonth: 0,
    openInvoiceAmount: 0,
    openInvoiceCount: 0,
    activeProjectCount: 0
  });

  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [overdueInvoices, setOverdueInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;

      try {
        const now = new Date();
        const start = startOfMonth(now).toISOString();
        const end = endOfMonth(now).toISOString();

        const [financials, invoices, projects, timeEntries] = await Promise.all([
          FinanceService.getFinancialRecords(user),
          InvoiceService.getAll(user),
          ProjectService.getAll(user),
          TimeEntryService.getRange(user, start, end)
        ]);

        const revenue = financials
          .filter(r => r.type === 'income')
          .reduce((sum, r) => sum + r.amount, 0);

        const openInvoicesList = invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue');
        const openAmount = openInvoicesList.reduce((sum, inv) => sum + inv.total, 0);
        const overdue = invoices.filter(inv => inv.status === 'overdue');

        const minutes = timeEntries.reduce((sum, t) => sum + (t.duration_minutes || 0), 0);

        const activeProjs = projects.filter(p => p.status === 'in_progress');

        setStats({
          revenue,
          hoursMonth: minutes,
          openInvoiceAmount: openAmount,
          openInvoiceCount: openInvoicesList.length,
          activeProjectCount: activeProjs.length
        });

        setActiveProjects(activeProjs.slice(0, 5));
        setOverdueInvoices(overdue);

      } catch (e) {
        console.error("Dashboard load failed", e);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(val);
  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return `${h}h ${m}m`;
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col bg-background">
      <div className="flex items-center space-y-2 gap-2 mb-6 px-2">
        <SidebarTrigger className="m-0" />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-xs text-muted-foreground">
            Willkommen zurück, {user?.displayName || "Chef"}. Hier ist der aktuelle Stand.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2">
        <Card className="rounded-none border-l-4 border-l-emerald-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gesamtumsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(stats.revenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              Finanz-Übersicht
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stunden (Monat)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatDuration(stats.hoursMonth)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Im {format(new Date(), 'MMMM yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Offen</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(stats.openInvoiceAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.openInvoiceCount} Rechnungen ausständig
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projekte</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.activeProjectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Laufende Aufträge
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4 px-2">

        <Card className="col-span-4 rounded-none shadow-sm">
          <CardHeader>
            <CardTitle>Aktive Projekte</CardTitle>
            <CardDescription>
              Die neuesten laufenden Projekte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeProjects.length === 0 ? (
                <div className="text-sm text-muted-foreground italic text-center py-4">
                  Keine aktiven Projekte.
                </div>
              ) : (
                activeProjects.map(proj => (
                  <div key={proj.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{proj.name}</p>
                      <p className="text-xs text-muted-foreground">{proj.customers?.name || "Kein Kunde"}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link href={`/projects`} className="text-xs text-muted-foreground hover:text-primary flex items-center">
                        Details <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="col-span-3 space-y-4">
          <Card className="rounded-none shadow-sm">
            <CardHeader>
              <CardTitle>Schnellzugriff</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/time-tracking">
                <Button variant="outline" className="w-full justify-start rounded-none h-10">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" /> Zeit erfassen
                </Button>
              </Link>
              <Link href="/invoices/create">
                <Button variant="outline" className="w-full justify-start rounded-none h-10">
                  <Plus className="mr-2 h-4 w-4 text-muted-foreground" /> Rechnung erstellen
                </Button>
              </Link>
              <Link href="/finances">
                <Button variant="outline" className="w-full justify-start rounded-none h-10">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Ausgabe buchen
                </Button>
              </Link>
            </CardContent>
          </Card>

          {overdueInvoices.length > 0 && (
            <Card className="rounded-none border-red-900/20 bg-red-50 dark:bg-red-900/10 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-red-600 dark:text-red-400">
                  <AlertCircle className="mr-2 h-4 w-4" /> Überfällig ({overdueInvoices.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {overdueInvoices.slice(0, 3).map(inv => (
                    <div key={inv.id} className="flex items-center justify-between text-sm">
                      <div className="space-y-0.5">
                        <p className="font-medium">{inv.invoice_number}</p>
                        <p className="text-xs text-muted-foreground">{inv.recipient_name}</p>
                      </div>
                      <span className="font-bold font-mono">{formatCurrency(inv.total)}</span>
                    </div>
                  ))}
                  {overdueInvoices.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      ...und {overdueInvoices.length - 3} weitere.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-4 py-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-none" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded-none" />
          <Skeleton className="h-4 w-64 rounded-none" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-none" />)}
      </div>
      <div className="grid gap-4 md:grid-cols-7 mt-4">
        <Skeleton className="col-span-4 h-64 rounded-none" />
        <Skeleton className="col-span-3 h-64 rounded-none" />
      </div>
    </div>
  )
}