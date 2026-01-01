"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { stackClientApp } from "@/stack/client";
import { Loader2, ArrowLeft, Plus, Printer, Save, Trash, Settings2 } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom Components & Types
import { InvoiceTemplate, InvoiceData, InvoiceItem as TemplateItem } from "@/components/invoice-template";
import { InvoiceService } from "@/services/invoice-service";
import { CustomerService } from "@/services/customer-service";
import { CompanySettingsService } from "@/services/company-settings-service";
import { Customer } from "@/lib/types";
import { InvoiceToolsSheet, ToolCatalogItem, ToolTimeEntry } from "@/components/invoice-tools-panel";


const initialInvoiceState: InvoiceData = {
  invoiceNumber: "", // Wird geladen
  date: new Date().toISOString().split('T')[0],
  dueDate: "",
  performanceDate: "",
  sender: {
    name: "",
    address: "",
    email: "",
    phone: "",
    iban: "",
    bic: ""
  },
  recipient: { name: "", address: "" },
  items: [],
  isSmallBusiness: true,
  taxRate: 0
};

export default function CreateInvoicePage() {
  const user = stackClientApp.useUser();
  const router = useRouter();

  // State
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceState);

  // Sheet State
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // Logic State
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [importedTimeIds, setImportedTimeIds] = useState<number[]>([]); // Track IDs for linking

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: printRef, documentTitle: `Rechnung_${invoiceData.invoiceNumber}` });

  // --- 1. BOOTSTRAP: Load Settings & Next Number ---
  useEffect(() => {
    async function init() {
      if (!user) return;
      try {
        const [settings, nextNum] = await Promise.all([
          CompanySettingsService.get(user), // Annahme: Gibt CompanySettings zurück
          InvoiceService.getNextNumber(user)
        ]);

        setInvoiceData(prev => ({
          ...prev,
          invoiceNumber: nextNum,
          isSmallBusiness: settings?.is_small_business ?? true,
          taxRate: settings?.default_tax_rate ?? 0,
          sender: {
            name: settings?.company_name || `${settings?.first_name} ${settings?.last_name}`,
            address: settings ? `${settings.address}\n${settings.website || ''}` : "",
            email: settings?.contact_email || "",
            phone: settings?.contact_phone || "",
            iban: settings?.iban || "",
            bic: settings?.bic || ""
          }
        }));
      } catch (e) {
        console.error("Failed to load init data", e);
      } finally {
        setIsLoadingInit(false);
      }
    }
    init();
  }, [user]);


  // --- 2. HANDLERS ---

  // Load Real Customer Data
  const loadCustomerIntoInvoice = async (custId: string) => {
    if (!user) return;
    try {
      // Wenn der String eine Nummer ist, parsen
      const id = parseInt(custId);
      if (isNaN(id)) return;

      const customer = await CustomerService.getById(user, id);

      if (customer) {
        setInvoiceData(prev => ({
          ...prev,
          recipient: {
            name: customer.name,
            address: [
              customer.address_line_1,
              customer.address_line_2,
              `${customer.postal_code} ${customer.city}`,
              customer.country === 'at' ? 'Österreich' : customer.country
            ].filter(Boolean).join('\n')
          }
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleProjectSelect = (projectId: string, customerId?: string) => {
    setSelectedProjectId(projectId);
    setSelectedCustomerId(customerId || "");
    if (customerId) {
      loadCustomerIntoInvoice(customerId);
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    loadCustomerIntoInvoice(customerId);
  };

  const handleImportTimeEntries = (entries: ToolTimeEntry[]) => {
    const newItems: TemplateItem[] = entries.map(e => ({
      description: `${e.description} (${e.date})`,
      quantity: Number((e.duration_minutes / 60).toFixed(2)),
      price: e.rate
    }));

    setInvoiceData(prev => ({ ...prev, items: [...prev.items, ...newItems] }));

    // IDs merken für späteren DB Update
    setImportedTimeIds(prev => [...prev, ...entries.map(e => e.id)]);
  };

  const handleAddCatalogItem = (item: ToolCatalogItem) => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, {
        description: item.name,
        quantity: 1,
        price: item.price
      }]
    }));
  };

  const updateItem = (index: number, field: keyof TemplateItem, value: any) => {
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

  // --- 3. SAVE ACTION ---
  const handleSave = async () => {
    if (!user) return;
    if (!invoiceData.recipient.name) {
      return;
    }

    setIsSaving(true);
    try {
      await InvoiceService.create(user, invoiceData, {
        customerId: selectedCustomerId,
        projectId: selectedProjectId,
        linkedTimeEntryIds: importedTimeIds
      });

      router.push("/invoices"); // Zurück zur Liste
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingInit) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-hidden bg-background">

      {/* HEADER */}
      <div className="h-16 border-b flex items-center justify-between px-4 bg-background shrink-0">
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
          <Button
            variant="outline"
            className="rounded-none gap-2 border-dashed"
            onClick={() => setIsToolsOpen(true)}
          >
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Import / Tools</span>
          </Button>

          <Button variant="outline" className="rounded-none hidden sm:flex" onClick={() => handlePrint()}>
            <Printer className="mr-2 h-4 w-4" /> PDF
          </Button>

          <Button className="rounded-none" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="sm:mr-2 h-4 w-4 animate-spin" /> : <Save className="sm:mr-2 h-4 w-4" />}
            <span className="hidden sm:inline">Speichern</span>
          </Button>
        </div>
      </div>

      {/* CONTENT SCROLLABLE */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/5">
        <div className="max-w-4xl mx-auto space-y-4">

          {/* KOPFDATEN */}
          <Card className="rounded-none">
            <CardHeader className="pb-3 border-b bg-muted/10">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Kopfdaten</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Rechnungsnummer</Label>
                <Input
                  className="rounded-none font-mono"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Rechnungsdatum</Label>
                <Input
                  type="date"
                  className="rounded-none"
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fällig am</Label>
                <Input
                  type="date"
                  className="rounded-none"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Leistungszeitraum</Label>
                <Input
                  className="rounded-none"
                  placeholder="z.B. Jänner 2025"
                  value={invoiceData.performanceDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, performanceDate: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* EMPFÄNGER */}
          <Card className="rounded-none">
            <CardHeader className="pb-3 border-b bg-muted/10">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Empfänger</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Firma / Name</Label>
                <Input
                  className="rounded-none font-medium"
                  placeholder="Firmenname"
                  value={invoiceData.recipient.name}
                  onChange={(e) => setInvoiceData({ ...invoiceData, recipient: { ...invoiceData.recipient, name: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label>Anschrift & Details</Label>
                <Textarea
                  className="rounded-none min-h-[100px] resize-none font-mono text-sm"
                  placeholder="Straße, PLZ, Ort..."
                  value={invoiceData.recipient.address}
                  onChange={(e) => setInvoiceData({ ...invoiceData, recipient: { ...invoiceData.recipient, address: e.target.value } })}
                />
              </div>
            </CardContent>
          </Card>

          {/* POSITIONEN */}
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
                        Keine Positionen. <br />
                        <span
                          className="text-primary cursor-pointer underline hover:no-underline"
                          onClick={() => setIsToolsOpen(true)}
                        >
                          Werkzeuge öffnen
                        </span> um Daten zu importieren.
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
                          <Input
                            type="number"
                            className="rounded-none"
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

          {/* SUMMEN */}
          <div className="flex justify-end">
            <Card className="w-full sm:w-80 rounded-none">
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Netto</span>
                  <span>€ {invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">USt. ({invoiceData.taxRate}%)</span>
                  <span>
                    € {invoiceData.isSmallBusiness ? '0.00' :
                      (invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) * (invoiceData.taxRate / 100)).toFixed(2)
                    }
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Gesamtbetrag</span>
                  <span>
                    € {
                      invoiceData.isSmallBusiness ?
                        invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2) :
                        (invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) * (1 + invoiceData.taxRate / 100)).toFixed(2)
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <InvoiceToolsSheet
        open={isToolsOpen}
        onOpenChange={setIsToolsOpen}
        selectedProjectId={selectedProjectId}
        selectedCustomerId={selectedCustomerId}
        onSelectProject={handleProjectSelect}
        onClearProject={() => { setSelectedProjectId(""); setSelectedCustomerId(""); }}
        onSelectCustomer={handleCustomerSelect}
        onClearCustomer={() => { setSelectedCustomerId(""); setInvoiceData(prev => ({ ...prev, recipient: { name: "", address: "" } })); }}
        onAddCatalogItem={handleAddCatalogItem}
        onImportTimeEntries={handleImportTimeEntries}
      />

      {/* Hidden Print Area */}
      <div style={{ overflow: "hidden", height: 0, width: 0 }}>
        <div ref={printRef}>
          <InvoiceTemplate data={invoiceData} />
        </div>
      </div>

    </div>
  );
}