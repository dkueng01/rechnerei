"use client";

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
import { useState, useEffect } from "react";
import { CatalogItem } from "@/lib/types";
import { CatalogService } from "@/services/catalog-service";
import { stackClientApp } from "@/stack/client";
import { Loader2 } from "lucide-react";

interface CreateCatalogItemSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  itemToEdit?: CatalogItem | null;
}

const initialData: Partial<CatalogItem> = {
  name: "",
  type: "service",
  price: 0,
  currency: "EUR",
  unit: "hour",
  tax_rate: 20,
};

export function CreateCatalogItemSheet({ open, onOpenChange, onSuccess, itemToEdit }: CreateCatalogItemSheetProps) {
  const user = stackClientApp.useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CatalogItem>>(initialData);

  useEffect(() => {
    if (open) {
      if (itemToEdit) {
        setFormData(itemToEdit);
      } else {
        setFormData(initialData);
      }
    }
  }, [open, itemToEdit]);

  const updateField = (field: keyof CatalogItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.name) {
      return;
    }

    setIsLoading(true);
    try {
      if (itemToEdit && itemToEdit.id) {
        await CatalogService.update(user, itemToEdit.id, formData);
      } else {
        await CatalogService.create(user, formData);
      }

      setFormData(initialData);
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 h-full flex flex-col"
      >
        <SheetHeader className="p-4 border-b shrink-0 text-left">
          <SheetTitle>{itemToEdit ? "Element bearbeiten" : "Katalog-Position hinzufügen"}</SheetTitle>
          <SheetDescription>
            Definieren Sie Dienstleistungen oder Produkte, die Sie anbieten.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <Label className="text-xs">Typ</Label>
              <RadioGroup
                value={formData.type || "service"}
                onValueChange={(val: any) => updateField("type", val)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border p-3 flex-1 hover:bg-muted/10 transition-colors cursor-pointer">
                  <RadioGroupItem value="service" id="service" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="service" className="cursor-pointer">Dienstleistung</Label>
                    <p className="text-[10px] text-muted-foreground">
                      Zeitbasiert (z.B. Shooting)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 border p-3 flex-1 hover:bg-muted/10 transition-colors cursor-pointer">
                  <RadioGroupItem value="product" id="product" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="product" className="cursor-pointer">Produkt</Label>
                    <p className="text-[10px] text-muted-foreground">
                      Festpreis (z.B. Abzüge)
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Bezeichnung</Label>
              <Input
                id="name"
                placeholder="z.B. Bildbearbeitung"
                className="rounded-none"
                value={formData.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="price" className="text-xs">Rate / Preis</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="rounded-none"
                  value={formData.price || ""}
                  onChange={(e) => updateField("price", parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Währung</Label>
                <Select
                  value={formData.currency || "EUR"}
                  onValueChange={(val) => updateField("currency", val)}
                >
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Währung" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Einheit</Label>
              <Select
                value={formData.unit || "hour"}
                onValueChange={(val) => updateField("unit", val)}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Einheit wählen" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="hour">Pro Stunde</SelectItem>
                  <SelectItem value="day">Pro Tag</SelectItem>
                  <SelectItem value="piece">Pro Stück</SelectItem>
                  <SelectItem value="flat">Pauschale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="tax" className="text-xs">Standard-Steuersatz (%)</Label>
              <Input
                id="tax"
                type="number"
                placeholder="20"
                className="rounded-none"
                value={formData.tax_rate || "0"}
                onChange={(e) => updateField("tax_rate", parseFloat(e.target.value))}
              />
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-none"
            disabled={isLoading}
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-none"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {itemToEdit ? "Speichern" : "Erstellen"}
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}