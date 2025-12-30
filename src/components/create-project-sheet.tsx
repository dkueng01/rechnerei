import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

interface CreateProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectSheet({ open, onOpenChange }: CreateProjectSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 h-full flex flex-col"
      >
        <SheetHeader className="p-4 border-b shrink-0 text-left">
          <SheetTitle>Projekt erstellen</SheetTitle>
          <SheetDescription>
            Erstellen Sie ein neues Projekt für Zeiterfassung und Rechnungen.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" placeholder="100 Jahre Party" />
              <p className="text-[10px] text-muted-foreground">Der Anzeigename des Projekts.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Kunde</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Kunde wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raggal">Feuerwehr Raggal</SelectItem>
                  <SelectItem value="acme">Acme Inc</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">Kunden für direkte Verrechnung verknüpfen.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Ausgaben-Tags</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tags wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Entwicklung</SelectItem>
                  <SelectItem value="planning">Planung</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">Tags kategorisieren Projektausgaben.</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Beschreibung</Label>
              <Textarea
                id="description"
                placeholder="Kurzbeschreibung des Projekts hinzufügen."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="estimate" className="text-xs">Zeit-Schätzung (Stunden)</Label>
                <Input id="estimate" type="number" placeholder="0" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <Select defaultValue="progress">
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">In Arbeit</SelectItem>
                    <SelectItem value="completed">Abgeschlossen</SelectItem>
                    <SelectItem value="hold">Pausiert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="rate" className="text-xs">Stundensatz</Label>
                <Input id="rate" type="number" placeholder="0.00" />
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
            Projekt erstellen
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}