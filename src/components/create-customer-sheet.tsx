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
          <SheetTitle>Kunden anlegen</SheetTitle>
          <SheetDescription>
            Fügen Sie einen neuen Kunden hinzu, um Rechnungen und Zeiterfassung zu verwalten.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Allgemein</h3>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input id="name" placeholder="Acme Inc" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">E-Mail</Label>
                <Input id="email" type="email" placeholder="acme@beispiel.com" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="billingEmail" className="text-xs">Rechnungs-E-Mail</Label>
                <Input id="billingEmail" type="email" placeholder="buchhaltung@beispiel.com" />
                <p className="text-[10px] text-muted-foreground">Zusätzliche E-Mail für den Rechnungsversand.</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">Telefon</Label>
                <Input id="phone" placeholder="+43 1 1234567" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="website" className="text-xs">Webseite</Label>
                <Input id="website" placeholder="acme.com" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="contactPerson" className="text-xs">Kontaktperson</Label>
                <Input id="contactPerson" placeholder="Max Mustermann" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Details</h3>

              <div className="space-y-1">
                <Label className="text-xs">Adresse suchen</Label>
                <Input placeholder="Suchen..." />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address1" className="text-xs">Adresse Zeile 1</Label>
                <Input id="address1" placeholder="Musterstraße 1" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address2" className="text-xs">Adresse Zeile 2</Label>
                <Input id="address2" placeholder="Top 3" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Land</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Land wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="at">Österreich</SelectItem>
                      <SelectItem value="de">Deutschland</SelectItem>
                      <SelectItem value="ch">Schweiz</SelectItem>
                      <SelectItem value="us">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Stadt</Label>
                  <Input placeholder="Wien" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Bundesland</Label>
                  <Input placeholder="Wien" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">PLZ</Label>
                  <Input placeholder="1010" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Ausgaben-Tags</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tags wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="development">Entwicklung</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Tags helfen bei der Kategorisierung von Ausgaben.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat" className="text-xs">UID-Nummer / Steuernummer</Label>
                <Input id="vat" placeholder="UID eingeben" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-xs">Notiz</Label>
                <Textarea id="note" placeholder="Zusätzliche Informationen..." className="min-h-[100px]" />
              </div>

            </div>
          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 sm:justify-end">
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
            Erstellen
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}