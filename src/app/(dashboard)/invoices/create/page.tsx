"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Plus, Printer, Save, Trash, Briefcase, User, Box, X, Settings2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceTemplate, InvoiceData, InvoiceItem } from "@/components/invoice-template";

const MOCK_PROJECTS = [
  { id: "1", name: "100 Jahre Party", customer: "Feuerwehr Raggal" },
  { id: "2", name: "Website Redesign", customer: "Bäckerei Müller" },
];

const MOCK_CUSTOMERS = [
  { id: "1", name: "Feuerwehr Raggal", address: "Dorfstraße 1, 6741 Raggal" },
  { id: "2", name: "Bäckerei Müller", address: "Hauptplatz 5, 1010 Wien" },
];

const MOCK_CATALOG_ITEMS = [
  { id: "1", name: "Pauschale Bildbearbeitung", price: 150 },
  { id: "2", name: "Anfahrtspauschale (Wien)", price: 40 },
  { id: "3", name: "Stundensatz Senior Dev", price: 120 },
  { id: "4", name: "Lizenzgebühr (Print)", price: 250 },
  { id: "5", name: "Hosting (1 Jahr)", price: 180 },
];

const MOCK_UNBILLED_TIMES = [
  { id: 1, project: "100 Jahre Party", task: "Event Photography", date: "12.11.", hours: 4.5, rate: 120 },
  { id: 2, project: "100 Jahre Party", task: "Photo Editing", date: "13.11.", hours: 2.0, rate: 80 },
  { id: 3, project: "100 Jahre Party", task: "Meeting", date: "14.11.", hours: 1.0, rate: 100 },
];

const initialInvoice: InvoiceData = {
  invoiceNumber: "2025-003",
  date: "2025-11-15",
  dueDate: "2025-11-29",
  performanceDate: "November 2025",
  sender: {
    name: "Muster Design e.U.",
    address: "Musterstraße 12, 1010 Wien",
    email: "office@muster.at",
    phone: "+43 660 1234567",
    iban: "AT12 3456 7890",
    bic: "BANKATWW"
  },
  recipient: { name: "", address: "" },
  items: [],
  isSmallBusiness: true,
  taxRate: 0
};

export default function CreateInvoicePage() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoice);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [selectedTimeIds, setSelectedTimeIds] = useState<number[]>([]);

  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedCustomerId("");

    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    const customer = MOCK_CUSTOMERS.find(c => c.name === project?.customer);

    if (customer) {
      setInvoiceData(prev => ({
        ...prev,
        recipient: { name: customer.name, address: customer.address }
      }));
    }
  };

  const clearProject = () => {
    setSelectedProjectId("");
  };

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    const c = MOCK_CUSTOMERS.find(cust => cust.id === customerId);
    if (c) {
      setInvoiceData(prev => ({
        ...prev,
        recipient: { name: c.name, address: c.address }
      }));
    }
  };

  const clearCustomer = () => {
    setSelectedCustomerId("");
    setInvoiceData(prev => ({ ...prev, recipient: { name: "", address: "" } }));
  };

  const importTimeEntries = () => {
    const selectedEntries = MOCK_UNBILLED_TIMES.filter(t => selectedTimeIds.includes(t.id));
    const newItems: InvoiceItem[] = selectedEntries.map(e => ({
      description: `${e.task} (${e.date})`,
      quantity: e.hours,
      price: e.rate
    }));
    setInvoiceData(prev => ({ ...prev, items: [...prev.items, ...newItems] }));
    setIsTimeDialogOpen(false);
    setSelectedTimeIds([]);
  };

  const addCatalogItem = (item: { name: string, price: number }) => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: item.name, quantity: 1, price: item.price }]
    }));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items, { description: "", quantity: 1, price: 0 }] });
  };

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: printRef, documentTitle: `Rechnung_${invoiceData.invoiceNumber}` });

  const ToolsPanel = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Briefcase className="h-3 w-3" /> Projektkontext
        </h3>

        <div className="flex gap-2">
          <div className="flex-1">
            <Select onValueChange={handleProjectSelect} value={selectedProjectId}>
              <SelectTrigger className="rounded-none">
                <SelectValue placeholder="Wählen..." />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {MOCK_PROJECTS.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedProjectId && (
            <Button variant="ghost" size="icon" className="rounded-none shrink-0" onClick={clearProject}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {selectedProjectId && (
          <Card className="rounded-none border-dashed bg-muted/10">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-3 w-3" /> Offene Zeiten
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground mb-3">
                3 Einträge verfügbar.
              </div>
              <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="secondary" className="rounded-none w-full text-xs">
                    Zeiten wählen
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-none sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Zeiten importieren</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[300px] overflow-y-auto border space-y-1 p-2 bg-muted/10">
                    {MOCK_UNBILLED_TIMES.map(entry => (
                      <div key={entry.id} className="flex items-center gap-3 p-2 bg-background border hover:bg-muted/5 transition-colors cursor-pointer" onClick={() => {
                        if (selectedTimeIds.includes(entry.id)) setSelectedTimeIds(ids => ids.filter(id => id !== entry.id));
                        else setSelectedTimeIds(ids => [...ids, entry.id]);
                      }}>
                        <Checkbox
                          checked={selectedTimeIds.includes(entry.id)}
                          onCheckedChange={() => { }}
                          className="rounded-none"
                        />
                        <div className="flex-1 text-sm">
                          <div className="font-medium">{entry.task}</div>
                          <div className="text-xs text-muted-foreground">{entry.date} • {entry.project}</div>
                        </div>
                        <div className="text-right text-xs font-mono">
                          {entry.hours.toFixed(1)}h <br />
                          €{entry.rate}/h
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={importTimeEntries} className="rounded-none w-full">
                    {selectedTimeIds.length} Einträge importieren
                  </Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>

      {!selectedProjectId && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <User className="h-3 w-3" /> Kunde direkt
          </h3>
          <div className="flex gap-2">
            <div className="flex-1">
              <Select onValueChange={handleCustomerSelect} value={selectedCustomerId}>
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Kunde wählen..." />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {MOCK_CUSTOMERS.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCustomerId && (
              <Button variant="ghost" size="icon" className="rounded-none shrink-0" onClick={clearCustomer}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Box className="h-3 w-3" /> Aus Katalog
        </h3>
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          {MOCK_CATALOG_ITEMS.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              size="sm"
              className="rounded-none text-xs h-auto py-2 justify-between hover:bg-muted/10 border-dashed"
              onClick={() => addCatalogItem(item)}
            >
              <span className="truncate">{item.name}</span>
              <span className="font-mono text-[10px] ml-2 shrink-0">€{item.price}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-hidden bg-background">
      <div className="h-16 border-b flex items-center justify-between px-4 sm:px-6 bg-background shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/invoices">
            <Button variant="ghost" size="icon" className="rounded-none">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-bold text-lg leading-none hidden sm:block">Rechnung erstellen</h1>
            <span className="text-xs text-muted-foreground">{invoiceData.invoiceNumber} • Entwurf</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="xl:hidden">
            <Sheet open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-none">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="rounded-none w-[85vw] sm:max-w-[400px]">
                <SheetHeader className="mb-4 text-left">
                  <SheetTitle>Werkzeuge</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-full pb-20">
                  <ToolsPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Button variant="outline" className="rounded-none hidden sm:flex" onClick={() => handlePrint()}>
            <Printer className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button className="rounded-none">
            <Save className="sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Speichern</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-muted/5">
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="rounded-none">
              <CardHeader className="pb-3 border-b bg-muted/10">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Kopfdaten</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs">Rechnungsnummer</Label>
                  <Input
                    className="rounded-none font-mono"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Rechnungsdatum</Label>
                  <Input
                    type="date"
                    className="rounded-none"
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Fällig am</Label>
                  <Input
                    type="date"
                    className="rounded-none"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Leistungszeitraum</Label>
                  <Input
                    className="rounded-none"
                    value={invoiceData.performanceDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, performanceDate: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none">
              <CardHeader className="pb-3 border-b bg-muted/10">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Empfänger</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs">Firma / Name</Label>
                  <Input
                    className="rounded-none font-medium"
                    placeholder="Firmenname"
                    value={invoiceData.recipient.name}
                    onChange={(e) => setInvoiceData({ ...invoiceData, recipient: { ...invoiceData.recipient, name: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Anschrift & Details</Label>
                  <Textarea
                    className="rounded-none min-h-[100px] resize-none"
                    placeholder="Straße, PLZ, Ort..."
                    value={invoiceData.recipient.address}
                    onChange={(e) => setInvoiceData({ ...invoiceData, recipient: { ...invoiceData.recipient, address: e.target.value } })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none overflow-hidden gap-0">
              <CardHeader className="pb-3 border-b bg-muted/10 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Positionen</CardTitle>
                <span className="text-xs text-muted-foreground">{invoiceData.items.length} Einträge</span>
              </CardHeader>
              <div className="p-0 overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow className="bg-muted/5">
                      <TableHead className="w-[45%]">Beschreibung</TableHead>
                      <TableHead className="w-[15%]">Menge</TableHead>
                      <TableHead className="w-[20%]">Preis</TableHead>
                      <TableHead className="w-[15%] text-right">Gesamt</TableHead>
                      <TableHead className="w-[5%]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData.items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground text-sm border-b-0 italic">
                          Keine Positionen.
                        </TableCell>
                      </TableRow>
                    )}
                    {invoiceData.items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Input
                            className="rounded-none"
                            value={item.description}
                            onChange={(e) => updateItem(i, 'description', e.target.value)}
                            placeholder="Beschreibung..."
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            className="rounded-none"
                            value={item.quantity}
                            onChange={(e) => updateItem(i, 'quantity', parseFloat(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">€</span>
                            <Input
                              type="number"
                              className="rounded-none pl-6"
                              value={item.price}
                              onChange={(e) => updateItem(i, 'price', parseFloat(e.target.value))}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          € {(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none text-muted-foreground hover:text-destructive" onClick={() => removeItem(i)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 border-t bg-muted/5">
                  <Button variant="outline" size="sm" className="rounded-none border-dashed w-full sm:w-auto" onClick={addItem}>
                    <Plus className="mr-2 h-4 w-4" /> Manuelle Zeile hinzufügen
                  </Button>
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Card className="w-full sm:w-80 rounded-none">
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Netto</span>
                    <span>€ {invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">USt. (0%)</span>
                    <span>€ 0.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Gesamtbetrag</span>
                    <span>€ {invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-80 border-l bg-background p-6 space-y-8 h-full overflow-y-auto shrink-0">
          <ToolsPanel />
        </div>

      </div>

      <div style={{ overflow: "hidden", height: 0, width: 0 }}>
        <div ref={printRef}>
          <InvoiceTemplate data={invoiceData} />
        </div>
      </div>

    </div>
  );
}