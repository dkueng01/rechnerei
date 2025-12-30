"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Briefcase, User, Box, X, Clock, Loader2 } from "lucide-react";

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

        <SheetHeader className="p-4 border-b shrink-0 text-left bg-muted/5">
          <SheetTitle className="flex items-center gap-2">
            Rechnungs-Werkzeuge
          </SheetTitle>
          <SheetDescription>
            Importieren Sie Daten aus Projekten oder dem Katalog.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-8">

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Briefcase className="h-3 w-3" /> Projektkontext
                </h3>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select onValueChange={(val) => {
                      const proj = MOCK_PROJECTS.find(p => p.id === val);
                      onSelectProject(val, proj?.customer_id);
                    }} value={selectedProjectId}>
                      <SelectTrigger className="rounded-none bg-background">
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
                    <Button variant="ghost" size="icon" className="rounded-none shrink-0" onClick={onClearProject}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {selectedProjectId && (
                  <Card className="rounded-none border-dashed bg-muted/10 shadow-none">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Offene Zeiten
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="text-xs text-muted-foreground mb-3">
                        {unbilledTimes.length === 0 ? "Keine offenen Zeiten." : `${unbilledTimes.length} Einträge verfügbar.`}
                      </div>

                      <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-none w-full text-xs"
                            disabled={unbilledTimes.length === 0}
                          >
                            Zeiten wählen
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-none sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Zeiten importieren</DialogTitle>
                          </DialogHeader>
                          <div className="max-h-[300px] overflow-y-auto border space-y-1 p-2 bg-muted/10">
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
                                  €{entry.rate}/h
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button onClick={handleImportTimes} className="rounded-none w-full">
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
                      <Select onValueChange={onSelectCustomer} value={selectedCustomerId}>
                        <SelectTrigger className="rounded-none bg-background">
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
                </div>
              )}

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Box className="h-3 w-3" /> Aus Katalog
                </h3>
                <div className="flex flex-col gap-2">
                  {MOCK_CATALOG_ITEMS.map((item) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="rounded-none text-xs h-auto py-2 justify-between hover:bg-muted/10 border-dashed bg-background"
                      onClick={() => onAddCatalogItem(item)}
                    >
                      <span className="truncate text-left">{item.name}</span>
                      <span className="font-mono text-[10px] ml-2 shrink-0">€{item.price.toFixed(2)}</span>
                    </Button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex justify-end bg-muted/5">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-none">
            Schließen
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}