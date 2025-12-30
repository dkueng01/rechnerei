"use client";

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
import { useState, useEffect } from "react";
import { Project, Customer } from "@/lib/types";
import { ProjectService } from "@/services/project-service";
import { CustomerService } from "@/services/customer-service";
import { stackClientApp } from "@/stack/client";
import { Loader2 } from "lucide-react";

interface CreateProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  projectToEdit?: Project | null;
}

const initialData: Partial<Project> = {
  name: "",
  customer_id: null,
  description: "",
  time_estimate: 0,
  status: "in_progress",
  hourly_rate: 0,
  currency: "EUR",
};

export function CreateProjectSheet({ open, onOpenChange, onSuccess, projectToEdit }: CreateProjectSheetProps) {
  const user = stackClientApp.useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>(initialData);

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      if (user && open) {
        try {
          const data = await CustomerService.getAll(user);
          setCustomers(data);
        } catch (e) { console.error("Failed to load customers", e); }
      }
    }
    fetchCustomers();
  }, [user, open]);

  useEffect(() => {
    if (open) {
      if (projectToEdit) {
        setFormData(projectToEdit);
      } else {
        setFormData(initialData);
      }
    }
  }, [open, projectToEdit]);

  const updateField = (field: keyof Project, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.name) {
      return;
    }

    setIsLoading(true);
    try {
      if (projectToEdit && projectToEdit.id) {
        await ProjectService.update(user, projectToEdit.id, formData);
      } else {
        await ProjectService.create(user, formData);
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
          <SheetTitle>{projectToEdit ? "Projekt bearbeiten" : "Projekt erstellen"}</SheetTitle>
          <SheetDescription>
            Erstellen Sie ein neues Projekt für Zeiterfassung und Rechnungen.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input
                id="name"
                placeholder="100 Jahre Party"
                className="rounded-none"
                value={formData.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">Der Anzeigename des Projekts.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Kunde</Label>
              <Select
                value={formData.customer_id?.toString() || ""}
                onValueChange={(val) => updateField("customer_id", parseInt(val))}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Kunde wählen" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {customers.map(c => (
                    <SelectItem key={c.id} value={c.id!.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">Kunden für direkte Verrechnung verknüpfen.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs">Beschreibung</Label>
              <Textarea
                id="description"
                placeholder="Kurzbeschreibung des Projekts hinzufügen."
                className="min-h-[100px] rounded-none"
                value={formData.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimate" className="text-xs">Zeit-Schätzung (h)</Label>
                <Input
                  id="estimate"
                  type="number"
                  placeholder="0"
                  className="rounded-none"
                  value={formData.time_estimate || ""}
                  onChange={(e) => updateField("time_estimate", parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Status</Label>
                <Select
                  value={formData.status || "in_progress"}
                  onValueChange={(val: any) => updateField("status", val)}
                >
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="in_progress">In Arbeit</SelectItem>
                    <SelectItem value="completed">Abgeschlossen</SelectItem>
                    <SelectItem value="on_hold">Pausiert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate" className="text-xs">Stundensatz</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="0.00"
                  className="rounded-none"
                  value={formData.hourly_rate || ""}
                  onChange={(e) => updateField("hourly_rate", parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
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
                    <SelectItem value="USD">USD</SelectItem>
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
            {projectToEdit ? "Speichern" : "Projekt erstellen"}
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}