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
import { Separator } from "@/components/ui/separator";

interface CreateCustomerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCustomerSheet({ open, onOpenChange }: CreateCustomerSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full">

        <SheetHeader className="p-4 border-b shrink-0">
          <SheetTitle>Create Customer</SheetTitle>
          <SheetDescription>
            Add a new customer to manage invoices and time tracking.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <h3 className="text-sm font-medium">General</h3>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input id="name" placeholder="Acme Inc" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input id="email" type="email" placeholder="acme@example.com" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="billingEmail" className="text-xs">Billing Email</Label>
                <Input id="billingEmail" type="email" placeholder="finance@example.com" />
                <p className="text-[10px] text-muted-foreground">This is an additional email that will be used to send invoices to.</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="website" className="text-xs">Website</Label>
                <Input id="website" placeholder="acme.com" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="contactPerson" className="text-xs">Contact person</Label>
                <Input id="contactPerson" placeholder="John Doe" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Details</h3>

              <div className="space-y-1">
                <Label className="text-xs">Search for an address</Label>
                <Input placeholder="Search..." />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address1" className="text-xs">Address Line 1</Label>
                <Input id="address1" placeholder="123 Main St" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address2" className="text-xs">Address Line 2</Label>
                <Input id="address2" placeholder="Suite 100" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="at">Austria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">City</Label>
                  <Input placeholder="New York" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">State / Province</Label>
                  <Input placeholder="NY" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">ZIP / Postal Code</Label>
                  <Input placeholder="10001" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Expense Tags</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Tags help categorize and track customer expenses.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat" className="text-xs">Tax ID / VAT Number</Label>
                <Input id="vat" placeholder="Enter VAT number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-xs">Note</Label>
                <Textarea id="note" placeholder="Additional information..." className="min-h-[100px]" />
              </div>

            </div>
          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 sm:justify-end">
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
            Create
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}