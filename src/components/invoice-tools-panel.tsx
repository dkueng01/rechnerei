"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { X, Loader2, Plus, Clock } from "lucide-react";

export interface ToolCatalogItem { id: string; name: string; price: number; }
export interface ToolTimeEntry { id: number; project_id: string; description: string; date: string; duration_minutes: number; rate: number; }

const MOCK_PROJECTS = [
  { id: "1", name: "100 Jahre Party", customer_id: "1" },
  { id: "2", name: "Website Redesign", customer_id: "2" },
];

const MOCK_CUSTOMERS = [
  { id: "1", name: "Feuerwehr Raggal" },
  { id: "2", name: "Bäckerei Müller" },
  { id: "3", name: "StartUp GmbH" },
];

const MOCK_CATALOG_ITEMS = [
  { id: "1", name: "Pauschale Bildbearbeitung", price: 150 },
  { id: "2", name: "Anfahrtspauschale (Wien)", price: 40 },
  { id: "3", name: "Stundensatz Senior Dev", price: 120 },
  { id: "4", name: "Hosting (1 Jahr)", price: 180 },
];

const MOCK_UNBILLED_TIMES = [
  { id: 101, project_id: "1", description: "Event Photography", date: "2025-11-12", duration_minutes: 270, rate: 120 },
  { id: 102, project_id: "1", description: "Photo Editing", date: "2025-11-13", duration_minutes: 120, rate: 80 },
  { id: 103, project_id: "1", description: "Meeting", date: "2025-11-14", duration_minutes: 60, rate: 100 },
];

interface InvoiceToolsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  selectedProjectId: string;
  selectedCustomerId: string;
  onSelectProject: (projectId: string, customerId?: string) => void;
  onClearProject: () => void;
  onSelectCustomer: (customerId: string) => void;
  onClearCustomer: () => void;

  onAddCatalogItem: (item: ToolCatalogItem) => void;
  onImportTimeEntries: (entries: ToolTimeEntry[]) => void;
}

export function InvoiceToolsSheet({
  open,
  onOpenChange,
  selectedProjectId,
  selectedCustomerId,
  onSelectProject,
  onClearProject,
  onSelectCustomer,
  onClearCustomer,
  onAddCatalogItem,
  onImportTimeEntries
}: InvoiceToolsSheetProps) {
  const [loading, setLoading] = useState(true);
  const [unbilledTimes, setUnbilledTimes] = useState<ToolTimeEntry[]>([]);

  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [selectedTimeIds, setSelectedTimeIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!selectedProjectId) {
      setUnbilledTimes([]);
      return;
    }
    const times = MOCK_UNBILLED_TIMES.filter(t => t.project_id === selectedProjectId);
    setUnbilledTimes(times);
  }, [selectedProjectId]);

  const handleImportTimes = () => {
    const selectedEntries = unbilledTimes.filter(t => selectedTimeIds.includes(t.id));
    onImportTimeEntries(selectedEntries);
    setIsTimeDialogOpen(false);
    setSelectedTimeIds([]);
    onOpenChange(false);
  };

  const toggleTimeSelection = (id: number) => {
    setSelectedTimeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full bg-background" side="right">

        <SheetHeader className="p-4 border-b shrink-0 text-left">
          <SheetTitle>Werkzeuge</SheetTitle>
          <SheetDescription>
            Importieren Sie Daten aus Projekten oder dem Katalog.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-6">

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Datenquelle</h3>

                <div className="space-y-1">
                  <Label className="text-xs">Projekt zuweisen</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Select onValueChange={(val) => {
                        const proj = MOCK_PROJECTS.find(p => p.id === val);
                        onSelectProject(val, proj?.customer_id);
                      }} value={selectedProjectId}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Kein Projekt gewählt" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          {MOCK_PROJECTS.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedProjectId && (
                      <Button variant="ghost" size="icon" className="rounded-none shrink-0" onClick={onClearProject}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {selectedProjectId && (
                  <div className="border border-l-2 border-l-primary p-3 space-y-2 bg-muted/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Zeiterfassung
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {unbilledTimes.length} offen
                      </span>
                    </div>

                    <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-none w-full text-xs h-8 bg-background"
                          disabled={unbilledTimes.length === 0}
                        >
                          Zeiten importieren
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Zeiten importieren</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[300px] overflow-y-auto border space-y-1 p-2 bg-muted/10 mt-2">
                          {unbilledTimes.map(entry => (
                            <div
                              key={entry.id}
                              className="flex items-center gap-3 p-2 bg-background border hover:bg-muted/5 transition-colors cursor-pointer select-none"
                              onClick={() => toggleTimeSelection(entry.id)}
                            >
                              <Checkbox
                                checked={selectedTimeIds.includes(entry.id)}
                                onCheckedChange={() => toggleTimeSelection(entry.id)}
                                className="rounded-none"
                              />
                              <div className="flex-1 text-sm">
                                <div className="font-medium">{entry.description}</div>
                                <div className="text-xs text-muted-foreground">
                                  {entry.date}
                                </div>
                              </div>
                              <div className="text-right text-xs font-mono">
                                {(entry.duration_minutes / 60).toFixed(1)} h<br />
                                <span className="text-muted-foreground">€{entry.rate}/h</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button onClick={handleImportTimes} className="rounded-none w-full mt-2">
                          {selectedTimeIds.length} Einträge importieren
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {!selectedProjectId && (
                  <div className="space-y-1">
                    <Label className="text-xs">Oder Kunde direkt wählen</Label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Select onValueChange={onSelectCustomer} value={selectedCustomerId}>
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
                        <Button variant="ghost" size="icon" className="rounded-none shrink-0" onClick={onClearCustomer}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Nur nötig, wenn kein Projekt zugewiesen wird.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Katalog Items</h3>
                <div className="space-y-2">
                  {MOCK_CATALOG_ITEMS.map((item) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="rounded-none w-full justify-between h-9 text-xs font-normal"
                      onClick={() => onAddCatalogItem(item)}
                    >
                      <div className="flex items-center gap-2">
                        <Plus className="h-3 w-3 text-muted-foreground" />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-mono text-muted-foreground">€{item.price.toFixed(2)}</span>
                    </Button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-none">
            Schließen
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}