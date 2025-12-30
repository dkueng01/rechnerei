"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Loader2, MoreHorizontal } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useMemo, useEffect, useCallback } from "react";
import { LogTimeSheet } from "@/components/log-time-sheet";
import { stackClientApp } from "@/stack/client";
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval,
  addMonths, subMonths, isSameMonth, isToday, isSameDay, parseISO
} from "date-fns";
import { de } from "date-fns/locale";
import { TimeEntryService } from "@/services/time-entry-service";
import { TimeEntry } from "@/lib/types";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";
import {
  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function TimeTrackingPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    if (!user) return;
    const weekStartOptions = { weekStartsOn: 1 as const };
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);

    const start = startOfWeek(monthStart, weekStartOptions);
    const end = endOfWeek(monthEnd, weekStartOptions);

    try {
      setIsLoading(true);
      const data = await TimeEntryService.getRange(user, start.toISOString(), end.toISOString());
      setEntries(data);
    } catch (error) {
      console.error("Fehler beim Laden");
    } finally {
      setIsLoading(false);
    }
  }, [user, currentDate]);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  const calendarDays = useMemo(() => {
    const weekStartOptions = { weekStartsOn: 1 as const };
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const start = startOfWeek(monthStart, weekStartOptions);
    const end = endOfWeek(monthEnd, weekStartOptions);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const selectedDayEntries = useMemo(() => {
    return entries.filter(e => isSameDay(parseISO(e.start_time), selectedDate));
  }, [entries, selectedDate]);

  const { chartData, chartConfig, weekTotalHours } = useMemo(() => {
    const weekStartOptions = { weekStartsOn: 1 as const };
    const weekStart = startOfWeek(selectedDate, weekStartOptions);
    const weekEnd = endOfWeek(selectedDate, weekStartOptions);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const weekEntries = entries.filter(e => {
      const d = parseISO(e.start_time);
      return d >= weekStart && d <= weekEnd;
    });

    let totalMinutes = 0;

    const uniqueProjects = Array.from(new Set(weekEntries.map(e => e.projects?.name || "Unbekannt")));
    const projectColorMap: Record<string, string> = {};
    const config: ChartConfig = {};

    uniqueProjects.forEach((proj, index) => {
      const color = CHART_COLORS[index % CHART_COLORS.length];
      projectColorMap[proj] = color;
      config[proj] = { label: proj, color: color };
    });

    const data = weekDays.map(day => {
      const dailyEntries = weekEntries.filter(e => isSameDay(parseISO(e.start_time), day));
      const dayData: any = { day: format(day, 'EEE', { locale: de }) };

      dailyEntries.forEach(e => {
        const projName = e.projects?.name || "Unbekannt";
        const durationHours = (e.duration_minutes || 0) / 60;

        dayData[projName] = (dayData[projName] || 0) + durationHours;
        totalMinutes += (e.duration_minutes || 0);
      });

      return dayData;
    });

    return {
      chartData: data,
      chartConfig: config,
      weekTotalHours: (totalMinutes / 60).toFixed(2)
    };
  }, [entries, selectedDate]);


  const handleOpenCreate = () => { setEditingEntry(null); setIsSheetOpen(true); };
  const handleEdit = (entry: TimeEntry) => { setEditingEntry(entry); setIsSheetOpen(true); };
  const handleDelete = async (id: number) => {
    if (!user) return;
    await TimeEntryService.delete(user, id);
    loadEntries();
  };

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Zeiterfassung</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 h-[500px]">
        <div className="flex flex-col border border-b-0 h-full">
          <div className="flex items-center justify-between p-2 bg-muted/10 border-b">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium text-sm w-32 text-center capitalize">
                {format(currentDate, 'MMMM yyyy', { locale: de })}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={() => setSelectedDate(new Date())} variant="outline" className="rounded-none h-8 text-xs">
              Heute
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="grid grid-cols-7 border-b bg-muted/5">
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                <div key={day} className="p-2 text-xs text-muted-foreground text-center border-r last:border-r-0 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
              {calendarDays.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);
                const hasEntries = entries.some(e => isSameDay(parseISO(e.start_time), day));

                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                                    border-b border-r relative flex flex-col items-center justify-center cursor-pointer transition-colors
                                    ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}
                                    ${!isCurrentMonth ? 'text-muted-foreground/20 bg-muted/5' : ''}
                                    ${isSelected ? 'bg-primary/5 inset-shadow ring-1 ring-inset ring-primary' : ''}
                                    hover:bg-muted/10
                                `}
                  >
                    <span className={`
                                    text-sm font-medium w-8 h-8 flex items-center justify-center rounded-none
                                    ${isTodayDate ? 'bg-primary text-primary-foreground' : ''}
                                `}>
                      {format(day, 'd')}
                    </span>
                    {hasEntries && (
                      <div className={`mt-1 h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Card className="rounded-none flex flex-col hidden lg:flex">
          <CardHeader>
            <CardTitle>Wochenübersicht</CardTitle>
            <CardDescription>
              Woche vom {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), 'd. MMM', { locale: de })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />

                {Object.keys(chartConfig).map((projectKey) => (
                  <Bar
                    key={projectKey}
                    dataKey={projectKey}
                    stackId="a"
                    fill={chartConfig[projectKey].color}
                    radius={[0, 0, 0, 0]}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </CardContent>
          <div className="p-6 pt-0 text-sm text-muted-foreground">
            Gesamt: <span className="font-bold text-foreground">{weekTotalHours} Std.</span>
          </div>
        </Card>

      </div>

      <div className="border bg-background">
        <div className="p-4 border-b flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-md">{format(selectedDate, 'EEEE, d. MMMM yyyy', { locale: de })}</h3>
            <div className="text-xs text-muted-foreground px-2 py-1 bg-background border">
              {selectedDayEntries.length} Einträge
            </div>
          </div>
          <Button size="sm" className="rounded-none" onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" /> Neuer Eintrag
          </Button>
        </div>

        <div className="">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Daten werden geladen...
            </div>
          ) : selectedDayEntries.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Keine Zeiteinträge für diesen Tag vorhanden.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Kunde - Projekt</TableHead>
                  <TableHead>Leistung</TableHead>
                  <TableHead className="w-[100px]">Verrechn.</TableHead>
                  <TableHead className="w-[150px]">Zeit</TableHead>
                  <TableHead className="w-[100px]">Dauer</TableHead>
                  <TableHead>Kommentar</TableHead>
                  <TableHead className="text-right w-[100px]">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDayEntries.map((entry) => (
                  <TableRow key={entry.id} className="group">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{entry.projects?.customers?.name || "Ohne Kunde"}</span>
                        <span className="text-xs text-muted-foreground">{entry.projects?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{entry.catalog_items?.name || "-"}</TableCell>
                    <TableCell>
                      {entry.is_billable ? (
                        <span className="text-xs border border-emerald-500/50 bg-emerald-500/10 text-emerald-600 px-2 py-0.5">Ja</span>
                      ) : (
                        <span className="text-xs border px-2 py-0.5 text-muted-foreground">Nein</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {format(parseISO(entry.start_time), 'HH:mm')} - {format(parseISO(entry.end_time), 'HH:mm')}
                    </TableCell>
                    <TableCell className="font-mono font-bold text-xs">
                      {Math.floor((entry.duration_minutes || 0) / 60)}:
                      {((entry.duration_minutes || 0) % 60).toString().padStart(2, '0')} h
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm truncate max-w-[200px]">
                      {entry.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                          <DropdownMenuItem className="rounded-none" onClick={() => handleEdit(entry)}>
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive rounded-none" onClick={() => entry.id && handleDelete(entry.id)}>
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <LogTimeSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        initialDate={selectedDate}
        onSuccess={loadEntries}
        entryToEdit={editingEntry}
      />
    </div>
  );
}