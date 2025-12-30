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
          <SheetTitle>Katalog-Position hinzufügen</SheetTitle>
          <SheetDescription>
            Definieren Sie Dienstleistungen oder Produkte, die Sie anbieten.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">

            <div className="space-y-1">
              <Label className="text-xs">Typ</Label>
              <RadioGroup defaultValue="service" className="flex gap-4">
                <div className="flex items-center space-x-2 border p-3 flex-1 hover:bg-muted/10 transition-colors">
                  <RadioGroupItem value="service" id="service" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="service">Dienstleistung</Label>
                    <p className="text-[10px] text-muted-foreground">
                      Zeitbasiert (z.B. Shooting, Bearbeitung)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 border p-3 flex-1 hover:bg-muted/10 transition-colors">
                  <RadioGroupItem value="product" id="product" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="product">Produkt</Label>
                    <p className="text-[10px] text-muted-foreground">
                      Festpreis (z.B. Abzüge, Rahmen)
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Bezeichnung</Label>
              <Input id="name" placeholder="z.B. Bildbearbeitung" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="price" className="text-xs">Rate / Preis</Label>
                <Input id="price" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Währung</Label>
                <Select defaultValue="eur">
                  <SelectTrigger>
                    <SelectValue placeholder="Währung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Einheit</Label>
              <Select defaultValue="hour">
                <SelectTrigger>
                  <SelectValue placeholder="Einheit wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">Pro Stunde</SelectItem>
                  <SelectItem value="day">Pro Tag</SelectItem>
                  <SelectItem value="piece">Pro Stück</SelectItem>
                  <SelectItem value="flat">Pauschale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="tax" className="text-xs">Standard-Steuersatz (%)</Label>
              <Input id="tax" type="number" placeholder="20" />
            </div>

          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Abbrechen
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Speichern
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}