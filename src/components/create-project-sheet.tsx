import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

interface CreateProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectSheet({ open, onOpenChange }: CreateProjectSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[540px] p-0 h-full border-l sm:border-l flex flex-col"
      >
        <SheetHeader className="p-4 sm:p-6 border-b shrink-0 text-left">
          <SheetTitle>Create Project</SheetTitle>
          <SheetDescription>
            Create a new project to track time and generate invoices.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" placeholder="100 Jahre Party" />
              <p className="text-[10px] text-muted-foreground">This is the project display name.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Customer</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raggal">Feuerwehr Raggal</SelectItem>
                  <SelectItem value="acme">Acme Inc</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">Link a customer to enable direct invoicing.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Expense Tags</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">Tags help categorize and track project expenses.</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a short description about the project."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="estimate" className="text-xs">Time Estimate (Hours)</Label>
                <Input id="estimate" type="number" placeholder="0" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <Select defaultValue="progress">
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border p-3 flex flex-row items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <Label className="text-xs">Billable</Label>
                <div className="text-[10px] text-muted-foreground">
                  Should time tracked on this project be billed?
                </div>
              </div>
              <Switch />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="rate" className="text-xs">Hourly Rate</Label>
                <Input id="rate" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Currency</Label>
                <Select defaultValue="eur">
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            Create Project
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}