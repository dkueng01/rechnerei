"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface LogTimeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDate?: Date;
}

export function LogTimeSheet({ open, onOpenChange, initialDate }: LogTimeSheetProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (open && initialDate) {
      setDate(initialDate);
    } else if (open && !initialDate) {
      setDate(new Date());
    }
  }, [open, initialDate]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 h-full flex flex-col"
      >
        <SheetHeader className="p-4 border-b shrink-0 text-left">
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Zeit erfassen
          </SheetTitle>
          <SheetDescription>
            Arbeitszeit oder Leistungen für ein Projekt erfassen.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <Label className="text-xs">Projekt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Projekt wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="party">100 Jahre Party</SelectItem>
                  <SelectItem value="website">Website Redesign</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Leistung / Aktivität</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Leistung wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editing">Bildbearbeitung (€80.00/h)</SelectItem>
                  <SelectItem value="shooting">Fotografie (€120.00/h)</SelectItem>
                  <SelectItem value="consulting">Beratung (€100.00/h)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Datum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: de }) : <span>Datum wählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-xs">Startzeit</Label>
                <Input id="startTime" type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-xs">Endzeit</Label>
                <Input id="endTime" type="time" defaultValue="13:00" />
              </div>
            </div>

            <div className="rounded-none bg-muted/50 p-4 flex items-center justify-between border">
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Gesamtzeit</div>
                <div className="text-xl font-bold font-mono">4h 00m</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Betrag (geschätzt)</div>
                <div className="text-xl font-bold font-mono">€320.00</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs">Beschreibung</Label>
              <Textarea
                id="description"
                placeholder="Woran haben Sie gearbeitet?"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2 justify-between w-full border p-3">
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="billable"
                  className="text-xs font-medium leading-none cursor-pointer"
                >
                  Verrechenbar
                </label>
                <p className="text-[10px] text-muted-foreground">
                  Auf der Rechnung anführen.
                </p>
              </div>
              <Switch id="billable" defaultChecked />
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Abbrechen
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Speichern
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}