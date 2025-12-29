"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { LogTimeSheet } from "@/components/log-time-sheet";
import { stackClientApp } from "@/stack/client";

const days = Array.from({ length: 35 }, (_, i) => {
  const day = i - 2;
  return {
    date: day > 0 && day <= 30 ? day : null,
    isCurrentMonth: day > 0 && day <= 30,
    hasEvent: day === 9 || day === 12
  };
});

export default function TimeTrackingPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isLogTimeOpen, setIsLogTimeOpen] = useState(false);

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Time Tracking</h2>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border px-2 py-1 h-10 bg-background">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium text-sm min-w-[80px] text-center">November</div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 border-l pl-4 h-10">
            <h3 className="text-xl font-mono">0h 0m</h3>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">Tracked this month</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <Tabs defaultValue="month">
            <TabsList className="h-10">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={() => setIsLogTimeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Log Time
          </Button>
        </div>
      </div>

      <div className="border flex-1 flex flex-col min-h-[500px] bg-background">
        <div className="overflow-x-auto flex-1 flex flex-col">
          <div className="min-w-[600px] flex-1 flex flex-col">
            <div className="grid grid-cols-7 border-b bg-muted/20">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-xs text-muted-foreground text-center border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-5 flex-1">
              {days.map((day, i) => (
                <div
                  key={i}
                  className={`
                                border-b border-r p-2 relative min-h-[100px] 
                                ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}
                                ${!day.isCurrentMonth ? 'bg-muted/10' : ''}
                                transition-colors hover:bg-muted/5
                            `}
                  onClick={() => day.isCurrentMonth && setIsLogTimeOpen(true)}
                >
                  <span className={`text-sm ${!day.isCurrentMonth ? 'text-muted-foreground/30' : 'text-muted-foreground'}`}>
                    {day.date || ""}
                  </span>

                  {day.hasEvent && day.isCurrentMonth && (
                    <div className="mt-2 text-[10px] bg-muted border p-1 w-full truncate cursor-pointer hover:bg-primary/10 hover:border-primary/20 transition-colors">
                      100 Jahre Party (4h 15m)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LogTimeSheet open={isLogTimeOpen} onOpenChange={setIsLogTimeOpen} />
    </div>
  );
}