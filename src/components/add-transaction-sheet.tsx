"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";

interface AddTransactionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTransactionSheet({ open, onOpenChange }: AddTransactionSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[500px] p-0 h-full border-l flex flex-col"
      >
        <SheetHeader className="p-4 sm:p-6 border-b shrink-0">
          <SheetTitle>Add Transaction</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <div className="space-y-6">

            {/* Transaction Type */}
            <div className="space-y-3">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Type</Label>
              <RadioGroup defaultValue="expense" className="flex gap-4">
                <div className="flex items-center space-x-2 border p-3 flex-1 cursor-pointer hover:bg-muted/10">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense" className="cursor-pointer font-normal">Expense</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 flex-1 cursor-pointer hover:bg-muted/10">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income" className="cursor-pointer font-normal">Income</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Date</Label>
                <Input type="date" className="rounded-none" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Amount</Label>
                <Input type="number" placeholder="0.00" className="rounded-none" />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Description</Label>
              <Input placeholder="e.g. Adobe Subscription" className="rounded-none" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Category</Label>
              <Select>
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="office" className="rounded-none">Office Supplies</SelectItem>
                  <SelectItem value="subscription" className="rounded-none">Software / Subscription</SelectItem>
                  <SelectItem value="hardware" className="rounded-none">Hardware</SelectItem>
                  <SelectItem value="travel" className="rounded-none">Travel</SelectItem>
                  <SelectItem value="tax" className="rounded-none">Tax / Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Receipt Upload Mock */}
            <div className="space-y-2 pt-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Receipt</Label>
              <div className="border border-dashed p-8 flex flex-col items-center justify-center text-center hover:bg-muted/5 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload</p>
                <p className="text-xs text-muted-foreground">PDF, JPG or PNG</p>
              </div>
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 sm:p-6 border-t bg-background shrink-0 flex flex-row justify-end gap-2">
          <Button variant="ghost" className="rounded-none" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="default" className="rounded-none" onClick={() => onOpenChange(false)}>
            Save Transaction
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}