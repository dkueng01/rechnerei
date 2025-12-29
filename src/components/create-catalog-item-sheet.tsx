import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreateCatalogItemSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCatalogItemSheet({ open, onOpenChange }: CreateCatalogItemSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 h-full flex flex-col"
      >
        <SheetHeader className="p-4 border-b shrink-0 text-left">
          <SheetTitle>Add Catalog Item</SheetTitle>
          <SheetDescription>
            Define services or products you offer to your customers.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">

            <div className="space-y-1">
              <Label className="text-xs">Item Type</Label>
              <RadioGroup defaultValue="service" className="flex gap-4">
                <div className="flex items-center space-x-2 border p-3 flex-1 hover:bg-muted/10 transition-colors">
                  <RadioGroupItem value="service" id="service" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="service">Service</Label>
                    <p className="text-[10px] text-muted-foreground">
                      Time-based (e.g. Shooting, Editing)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 border p-3 flex-1 hover:bg-muted/10 transition-colors">
                  <RadioGroupItem value="product" id="product" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="product">Product</Label>
                    <p className="text-[10px] text-muted-foreground">
                      Fixed price (e.g. Prints, Frames)
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Item Name</Label>
              <Input id="name" placeholder="e.g. Photo Editing" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="price" className="text-xs">Rate / Price</Label>
                <Input id="price" type="number" placeholder="0.00" />
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

            <div className="space-y-1">
              <Label className="text-xs">Unit</Label>
              <Select defaultValue="hour">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">Per Hour</SelectItem>
                  <SelectItem value="day">Per Day</SelectItem>
                  <SelectItem value="piece">Per Piece</SelectItem>
                  <SelectItem value="flat">Flat Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="tax" className="text-xs">Default Tax Rate (%)</Label>
              <Input id="tax" type="number" placeholder="20" />
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
            Save Item
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}