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
import { useState } from "react";
import { cn } from "@/lib/utils";

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
        className="w-full sm:max-w-[400px] p-0 h-full border-l sm:border-l flex flex-col"
      >
        <SheetHeader className="p-4 sm:p-6 border-b shrink-0 text-left">
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Log Time
          </SheetTitle>
          <SheetDescription>
            Record work hours for a specific project.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">

            {/* Project Selection */}
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

            {/* Date Picker */}
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Inputs */}
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

            {/* Duration Calculation Display (Mocked) */}
            <div className="rounded-md bg-muted/50 p-3 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Duration</div>
              <div className="text-2xl font-bold font-mono mt-1">4h 00m</div>
            </div>


            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea
                id="description"
                placeholder="What did you work on?"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="billable"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as Billable
                </label>
                <p className="text-[10px] text-muted-foreground">
                  This time entry will be included in the next invoice.
                </p>
              </div>
              <Input id="billable" type="checkbox" className="h-4 w-4 ml-auto" defaultChecked />
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 sm:p-6 border-t shrink-0 flex flex-row gap-2 justify-end">
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