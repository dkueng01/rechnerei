"use client";

import { useState } from "react";
import { stackClientApp } from "@/stack/client";
import { FinanceService } from "@/services/finance-service";
import { Transaction } from "@/lib/types";
import { Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddTransactionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTransactionSheet({ open, onOpenChange }: AddTransactionSheetProps) {
  const user = stackClientApp.useUser();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Transaction>>({
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: "",
    category: "office"
  });

  const updateField = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.description || !formData.amount) {
      return;
    }

    setIsSaving(true);
    try {
      await FinanceService.createTransaction(user, formData);
      setFormData({
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        description: "",
        category: "office"
      });
      onOpenChange(false);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[500px] p-0 h-full border-l flex flex-col bg-background"
      >
        <SheetHeader className="p-4 sm:p-6 border-b shrink-0">
          <SheetTitle>Transaktion hinzufügen</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <div className="space-y-6">

            <div className="space-y-3">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Typ</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(val) => updateField('type', val)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border p-3 flex-1 cursor-pointer hover:bg-muted/10">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense" className="cursor-pointer font-normal">Ausgabe</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 flex-1 cursor-pointer hover:bg-muted/10">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income" className="cursor-pointer font-normal">Einnahme</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Datum</Label>
                <Input
                  type="date"
                  className="rounded-none"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Betrag</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="rounded-none"
                  value={formData.amount || ""}
                  onChange={(e) => updateField('amount', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Beschreibung</Label>
              <Input
                placeholder="z.B. Adobe Abo"
                className="rounded-none"
                value={formData.description || ""}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Kategorie</Label>
              <Select value={formData.category} onValueChange={(val) => updateField('category', val)}>
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Kategorie wählen" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="office">Büromaterial</SelectItem>
                  <SelectItem value="subscription">Software / Abo</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="travel">Reise</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="insurance">Versicherung</SelectItem>
                  <SelectItem value="sales">Verkauf (Manuell)</SelectItem>
                  <SelectItem value="other">Sonstiges</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Beleg</Label>
              <div
                className="border border-dashed p-8 flex flex-col items-center justify-center text-center hover:bg-muted/5 transition-colors cursor-pointer"
                onClick={() => console.log("Datei-Upload folgt später")}
              >
                <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Klicken zum Hochladen</p>
                <p className="text-xs text-muted-foreground">(Placeholder)</p>
              </div>
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 sm:p-6 border-t bg-background shrink-0 flex flex-row justify-end gap-2">
          <Button variant="ghost" className="rounded-none" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button className="rounded-none" onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Speichern
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}