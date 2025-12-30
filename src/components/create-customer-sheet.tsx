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
import { Customer } from "@/lib/types";
import { CustomerService } from "@/services/customer-service";
import { useEffect, useState } from "react";
import { stackClientApp } from "@/stack/client";
import { Loader2 } from "lucide-react";

interface CreateCustomerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  customerToEdit?: Customer | null;
}

const emptyData: Partial<Customer> = {
  name: "",
  email: "",
  billing_email: "",
  phone: "",
  website: "",
  contact_person: "",
  address_line_1: "",
  address_line_2: "",
  country: "",
  city: "",
  state: "",
  postal_code: "",
  vat_number: "",
  note: "",
};

export function CreateCustomerSheet({ open, onOpenChange, onSuccess, customerToEdit }: CreateCustomerSheetProps) {
  const user = stackClientApp.useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>(emptyData);

  useEffect(() => {
    if (open) {
      if (customerToEdit) {
        setFormData(customerToEdit);
      } else {
        setFormData(emptyData);
      }
    }
  }, [open, customerToEdit]);

  const updateField = (field: keyof Customer, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.name) {
      return;
    }

    setIsLoading(true);
    try {
      if (customerToEdit && customerToEdit.id) {
        await CustomerService.update(user, customerToEdit.id, formData);
      } else {
        await CustomerService.create(user, formData);
      }

      setFormData(emptyData);
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
      <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full">

        <SheetHeader className="p-4 border-b shrink-0">
          <SheetTitle>{customerToEdit ? "Kunde bearbeiten" : "Kunde anlegen"}</SheetTitle>
          <SheetDescription>
            {customerToEdit ? "Ändern Sie die Details des Kunden." : "Fügen Sie einen neuen Kunden hinzu."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Allgemein</h3>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input
                  id="name"
                  placeholder="Acme Inc"
                  className="rounded-none"
                  value={formData.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="acme@beispiel.com"
                  className="rounded-none"
                  value={formData.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="billingEmail" className="text-xs">Rechnungs-E-Mail</Label>
                <Input
                  id="billingEmail"
                  type="email"
                  placeholder="buchhaltung@beispiel.com"
                  className="rounded-none"
                  value={formData.billing_email || ""}
                  onChange={(e) => updateField("billing_email", e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground">Zusätzliche E-Mail für den Rechnungsversand.</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">Telefon</Label>
                <Input
                  id="phone"
                  placeholder="+43 1 1234567"
                  className="rounded-none"
                  value={formData.phone || ""}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="website" className="text-xs">Webseite</Label>
                <Input
                  id="website"
                  placeholder="acme.com"
                  className="rounded-none"
                  value={formData.website || ""}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="contactPerson" className="text-xs">Kontaktperson</Label>
                <Input
                  id="contactPerson"
                  placeholder="Max Mustermann"
                  className="rounded-none"
                  value={formData.contact_person || ""}
                  onChange={(e) => updateField("contact_person", e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Details</h3>

              <div className="space-y-1">
                <Label htmlFor="address1" className="text-xs">Adresse Zeile 1</Label>
                <Input
                  id="address1"
                  placeholder="Musterstraße 1"
                  className="rounded-none"
                  value={formData.address_line_1 || ""}
                  onChange={(e) => updateField("address_line_1", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address2" className="text-xs">Adresse Zeile 2</Label>
                <Input
                  id="address2"
                  placeholder="Top 3"
                  className="rounded-none"
                  value={formData.address_line_2 || ""}
                  onChange={(e) => updateField("address_line_2", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Land</Label>
                  <Select onValueChange={(val) => updateField("country", val)} value={formData.country || "at"}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Land wählen" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="at">Österreich</SelectItem>
                      <SelectItem value="de">Deutschland</SelectItem>
                      <SelectItem value="ch">Schweiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Stadt</Label>
                  <Input
                    placeholder="Wien"
                    className="rounded-none"
                    value={formData.city || ""}
                    onChange={(e) => updateField("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Bundesland</Label>
                  <Input
                    placeholder="Wien"
                    className="rounded-none"
                    value={formData.state || ""}
                    onChange={(e) => updateField("state", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">PLZ</Label>
                  <Input
                    placeholder="1010"
                    className="rounded-none"
                    value={formData.postal_code || ""}
                    onChange={(e) => updateField("postal_code", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat" className="text-xs">UID-Nummer / Steuernummer</Label>
                <Input
                  id="vat"
                  placeholder="UID eingeben"
                  className="rounded-none"
                  value={formData.vat_number || ""}
                  onChange={(e) => updateField("vat_number", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-xs">Notiz</Label>
                <Textarea
                  id="note"
                  placeholder="Zusätzliche Informationen..."
                  className="min-h-[100px] rounded-none"
                  value={formData.note || ""}
                  onChange={(e) => updateField("note", e.target.value)}
                />
              </div>

            </div>
          </div>
        </div>

        <SheetFooter className="p-4 border-t shrink-0 flex flex-row gap-2 sm:justify-end">
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
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {customerToEdit ? "Speichern" : "Erstellen"}
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}