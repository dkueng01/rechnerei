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
import { CalendarIcon, Clock, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";

interface LogTimeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogTimeSheet({ open, onOpenChange }: LogTimeSheetProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 h-full flex flex-col"
      >
        <SheetHeader className="p-4 border-b shrink-0 text-left">
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Log Time
          </SheetTitle>
          <SheetDescription>
            Record work hours and services for a project.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">

            <div className="space-y-1">
              <Label className="text-xs">Project</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="party">100 Jahre Party</SelectItem>
                  <SelectItem value="website">Website Redesign</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Service / Activity</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editing">Photo Editing (€80.00/h)</SelectItem>
                  <SelectItem value="shooting">Photography (€120.00/h)</SelectItem>
                  <SelectItem value="consulting">Consulting (€100.00/h)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">
                Determines the hourly rate for this entry.
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Date</Label>
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
              <div className="space-y-1">
                <Label htmlFor="startTime" className="text-xs">Start Time</Label>
                <Input id="startTime" type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="endTime" className="text-xs">End Time</Label>
                <Input id="endTime" type="time" defaultValue="13:00" />
              </div>
            </div>

            <div className="rounded-md bg-muted/50 p-3 flex items-center justify-between border">
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total Time</div>
                <div className="text-xl font-bold font-mono">4h 00m</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Est. Amount</div>
                <div className="text-xl font-bold font-mono">€320.00</div>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea
                id="description"
                placeholder="What did you work on?"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2 justify-between w-full">
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="billable"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as Billable
                </label>
                <p className="text-[10px] text-muted-foreground">
                  Include this in the invoice.
                </p>
              </div>
              <Switch />
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Log Time
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}