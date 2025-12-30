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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Save, Trash } from "lucide-react";
import { useState, useRef } from "react";
import { InvoiceData, InvoiceTemplate } from "./invoice-template";
import { useReactToPrint } from "react-to-print";
import { Textarea } from "./ui/textarea";

interface CreateInvoiceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialData: InvoiceData = {
  invoiceNumber: "2025-001",
  date: "30.10.2025",
  dueDate: "14.11.2025",
  performanceDate: "Oktober 2025",
  sender: {
    name: "Muster Design e.U.",
    address: "Musterstraße 12, 1010 Wien",
    email: "office@muster.at",
    phone: "+43 660 1234567",
    iban: "AT12 3456 7890 1234 5678",
    bic: "BANKATWW",
    uid: "ATU12345678"
  },
  isSmallBusiness: true,
  taxRate: 0,
  recipient: {
    name: "Max Mustermann",
    address: "Beispielweg 4\n4020 Linz"
  },
  items: [
    { description: "Webdesign Basics", quantity: 1, price: 1200 },
    { description: "Domain Registration", quantity: 1, price: 45 }
  ],
};

export function CreateInvoiceSheet({ open, onOpenChange }: CreateInvoiceSheetProps) {
  const [data, setData] = useState<InvoiceData>(initialData);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Rechnung_${data.invoiceNumber}`,
  });

  const updateItem = (index: number, field: keyof typeof data.items[0], value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [...data.items, { description: "", quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[600px] p-0 h-full flex flex-col"
      >
        <SheetHeader className="p-4 border-b shrink-0 flex flex-row items-center justify-between">
          <SheetTitle>Rechnung bearbeiten</SheetTitle>
        </SheetHeader>

        <div style={{ display: "none" }}>
          <div ref={printRef}>
            <InvoiceTemplate data={data} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-background">
          <Tabs defaultValue="details">
            <TabsList className="w-full mb-6 rounded-none">
              <TabsTrigger value="details" className="flex-1 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary">Details</TabsTrigger>
              <TabsTrigger value="items" className="flex-1 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary">Positionen</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Invoice No.</Label>
                  <Input className="rounded-none" value={data.invoiceNumber} onChange={(e) => setData({ ...data, invoiceNumber: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Date</Label>
                  <Input className="rounded-none" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Due Date</Label>
                  <Input className="rounded-none" value={data.dueDate} onChange={(e) => setData({ ...data, dueDate: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Performance Date</Label>
                  <Input className="rounded-none" value={data.performanceDate} onChange={(e) => setData({ ...data, performanceDate: e.target.value })} />
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <Label className="text-sm font-bold block">Recipient</Label>
                <div className="space-y-1">
                  <Label className="text-xs">Name</Label>
                  <Input className="rounded-none" value={data.recipient.name} onChange={(e) => setData({ ...data, recipient: { ...data.recipient, name: e.target.value } })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Address</Label>
                  <Textarea value={data.recipient.address} onChange={(e: any) => setData({ ...data, recipient: { ...data.recipient, address: e.target.value } })} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="items" className="space-y-4 mt-0">
              {data.items.map((item, i) => (
                <div key={i} className="flex gap-2 items-start border p-3 bg-muted/20">
                  <div className="flex-1 space-y-2">
                    <Input
                      className="rounded-none"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(i, 'description', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <div className="w-24">
                        <Label className="text-[10px] text-muted-foreground mb-1 block">Quantity</Label>
                        <Input className="rounded-none" type="number" value={item.quantity} onChange={(e) => updateItem(i, 'quantity', parseFloat(e.target.value))} />
                      </div>
                      <div className="flex-1">
                        <Label className="text-[10px] text-muted-foreground mb-1 block">Price</Label>
                        <Input className="rounded-none" type="number" value={item.price} onChange={(e) => updateItem(i, 'price', parseFloat(e.target.value))} />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="mt-1 rounded-none" onClick={() => removeItem(i)}>
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-2 rounded-none hover:bg-muted" onClick={addItem}>+ Add Item</Button>
            </TabsContent>

          </Tabs>
        </div>

        <SheetFooter className="p-4 border-t bg-background shrink-0 flex flex-row justify-end gap-2">
          <Button variant="ghost" className="rounded-none" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button variant="default" className="rounded-none" onClick={() => handlePrint()}>
            <Printer className="w-4 h-4 mr-2" /> PDF drucken
          </Button>
          <Button variant="outline" className="rounded-none">
            <Save className="w-4 h-4 mr-2" /> Entwurf speichern
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}