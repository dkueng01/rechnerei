"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
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
import { CalendarIcon, Clock, Loader2 } from "lucide-react";
import { format, set, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Project, CatalogItem, TimeEntry } from "@/lib/types";
import { ProjectService } from "@/services/project-service";
import { CatalogService } from "@/services/catalog-service";
import { TimeEntryService } from "@/services/time-entry-service";
import { stackClientApp } from "@/stack/client";

interface LogTimeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialDate?: Date;
  entryToEdit?: TimeEntry | null;
}

export function LogTimeSheet({ open, onOpenChange, onSuccess, initialDate, entryToEdit }: LogTimeSheetProps) {
  const user = stackClientApp.useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<CatalogItem[]>([]);

  const [projectId, setProjectId] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const [isBillable, setIsBillable] = useState(true);

  useEffect(() => {
    if (user && open) {
      ProjectService.getAll(user).then(setProjects);
      CatalogService.getAll(user).then(data =>
        setServices(data.filter(i => i.type === 'service'))
      );
    }
  }, [user, open]);

  useEffect(() => {
    if (open) {
      if (entryToEdit) {
        const start = parseISO(entryToEdit.start_time);
        const end = parseISO(entryToEdit.end_time);

        setDate(start);
        setStartTime(format(start, 'HH:mm'));
        setEndTime(format(end, 'HH:mm'));
        setProjectId(entryToEdit.project_id?.toString() || "");
        setServiceId(entryToEdit.catalog_item_id?.toString() || "");
        setDescription(entryToEdit.description || "");
        setIsBillable(entryToEdit.is_billable);
      } else {
        if (initialDate) setDate(initialDate);
        else setDate(new Date());

        setStartTime("09:00");
        setEndTime("10:00");
        setDescription("");
        setProjectId("");
        setServiceId("");
        setIsBillable(true);
      }
    }
  }, [open, initialDate, entryToEdit]);

  const durationStats = useMemo(() => {
    if (!startTime || !endTime) return { hours: 0, cost: 0 };

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffMinutes < 0) diffMinutes += 24 * 60;

    const hours = diffMinutes / 60;

    const selectedService = services.find(s => s.id?.toString() === serviceId);
    const rate = selectedService ? selectedService.price : 0;

    return {
      hours: hours,
      formattedTime: `${Math.floor(hours)}h ${diffMinutes % 60}m`,
      cost: hours * rate
    };
  }, [startTime, endTime, serviceId, services]);


  const handleSave = async () => {
    if (!user || !date) return;
    if (!projectId) {
      return;
    }

    setIsLoading(true);
    try {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      const startIso = set(date, { hours: startH, minutes: startM }).toISOString();
      const endIso = set(date, { hours: endH, minutes: endM }).toISOString();

      const payload: Partial<TimeEntry> = {
        project_id: parseInt(projectId),
        catalog_item_id: serviceId ? parseInt(serviceId) : null,
        start_time: startIso,
        end_time: endIso,
        description,
        is_billable: isBillable
      };

      if (entryToEdit && entryToEdit.id) {
        await TimeEntryService.update(user, entryToEdit.id, payload);
      } else {
        await TimeEntryService.create(user, payload);
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <Label className="text-xs">Projekt</Label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Projekt wählen" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id!.toString()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Leistung / Aktivität</Label>
              <Select value={serviceId} onValueChange={setServiceId}>
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Leistung wählen" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {services.map(s => (
                    <SelectItem key={s.id} value={s.id!.toString()}>
                      {s.name} (€{s.price}/h)
                    </SelectItem>
                  ))}
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
                      "w-full justify-start text-left font-normal rounded-none",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: de }) : <span>Datum wählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-none" align="start">
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
                <Input
                  id="startTime"
                  type="time"
                  className="rounded-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-xs">Endzeit</Label>
                <Input
                  id="endTime"
                  type="time"
                  className="rounded-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-none bg-muted/50 p-4 flex items-center justify-between border">
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Gesamtzeit</div>
                <div className="text-xl font-bold font-mono">{durationStats.formattedTime}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Betrag (geschätzt)</div>
                <div className="text-xl font-bold font-mono">€ {durationStats.cost.toFixed(2)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs">Beschreibung</Label>
              <Textarea
                id="description"
                placeholder="Woran haben Sie gearbeitet?"
                className="min-h-[100px] rounded-none"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 justify-between w-full border p-3">
              <div className="grid gap-1.5 leading-none">
                <label className="text-xs font-medium leading-none cursor-pointer">Verrechenbar</label>
                <p className="text-[10px] text-muted-foreground">Auf der Rechnung anführen.</p>
              </div>
              <Switch
                checked={isBillable}
                onCheckedChange={setIsBillable}
              />
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-none" disabled={isLoading}>
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="rounded-none" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {entryToEdit ? "Änderungen speichern" : "Speichern"}
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}