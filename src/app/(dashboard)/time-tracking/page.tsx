"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useMemo } from "react";
import { LogTimeSheet } from "@/components/log-time-sheet";
import { stackClientApp } from "@/stack/client";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  addWeeks,
  subWeeks
} from "date-fns";
import { de } from "date-fns/locale";

type ViewType = 'month' | 'week';

export default function TimeTrackingPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [isLogTimeOpen, setIsLogTimeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const calendarDays = useMemo(() => {
    const weekStartOptions = { weekStartsOn: 1 as const };

    if (view === 'month') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart, weekStartOptions);
      const endDate = endOfWeek(monthEnd, weekStartOptions);
      return eachDayOfInterval({ start: startDate, end: endDate });
    } else {
      const startDate = startOfWeek(currentDate, weekStartOptions);
      const endDate = endOfWeek(currentDate, weekStartOptions);
      return eachDayOfInterval({ start: startDate, end: endDate });
    }
  }, [currentDate, view]);

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsLogTimeOpen(true);
  };

  const handleOpenGeneral = () => {
    setSelectedDate(new Date());
    setIsLogTimeOpen(true);
  };

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Zeiterfassung</h2>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border px-2 py-1 h-10 bg-background">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium text-sm min-w-[120px] text-center capitalize">
              {view === 'month'
                ? format(currentDate, 'MMMM yyyy', { locale: de })
                : `KW ${format(currentDate, 'w', { locale: de })} • ${format(currentDate, 'MMM yyyy', { locale: de })}`
              }
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 border-l pl-4 h-10">
            <h3 className="text-xl font-mono">0h 0m</h3>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">Diesen Monat erfasst</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <Tabs value={view} onValueChange={(v) => setView(v as ViewType)}>
            <TabsList className="h-10">
              <TabsTrigger value="week">Woche</TabsTrigger>
              <TabsTrigger value="month">Monat</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={handleOpenGeneral}>
            <Plus className="mr-2 h-4 w-4" /> Zeit erfassen
          </Button>
        </div>
      </div>

      <div className="border flex-1 flex flex-col min-h-[500px] bg-background">
        <div className="overflow-x-auto flex-1 flex flex-col">
          <div className="min-w-[600px] flex-1 flex flex-col">

            <div className="grid grid-cols-7 border-b bg-muted/20">
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                <div key={day} className="p-2 text-xs text-muted-foreground text-center border-r last:border-r-0 font-medium">
                  {day}
                </div>
              ))}
            </div>

            <div className={`grid grid-cols-7 flex-1 ${view === 'month' ? 'auto-rows-fr' : 'grid-rows-1'}`}>
              {calendarDays.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isTodayDate = isToday(day);

                const hasEvent = day.getDate() === 15;

                return (
                  <div
                    key={day.toISOString()}
                    className={`
                      border-b border-r p-2 relative min-h-[100px] flex flex-col gap-1
                      ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}
                      ${!isCurrentMonth ? 'bg-muted/10 text-muted-foreground/30' : ''}
                      ${isTodayDate ? 'bg-primary/5' : ''}
                      hover:bg-muted/5 transition-colors cursor-pointer group
                    `}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`
                            text-sm font-medium w-7 h-7 flex items-center justify-center
                            ${isTodayDate ? 'bg-primary text-primary-foreground' : ''}
                        `}>
                        {format(day, 'd')}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    {hasEvent && (
                      <div className="mt-1 text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 p-1 w-full truncate">
                        100 Jahre Party (4h)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <LogTimeSheet
        open={isLogTimeOpen}
        onOpenChange={setIsLogTimeOpen}
        initialDate={selectedDate}
      />
    </div>
  );
}