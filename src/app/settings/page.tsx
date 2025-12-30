"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Upload, Save, Building2, Gavel, Wallet, Loader2 } from "lucide-react";
import { stackClientApp } from "@/stack/client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/utils/uploadthing";
import { CompanySettings } from "@/lib/types";
import { CompanySettingsService } from "@/services/company-settings-service";
import { deleteFile } from "../actions/delete-file";

const initialSettings: CompanySettings = {
  company_name: "",
  logo_url: "",
  first_name: "",
  last_name: "",
  address: "",
  legal_form: "eu",
  commercial_register_number: "",
  registration_court: "",
  is_small_business: true,
  vat_id: "",
  default_tax_rate: 20,
  bank_name: "",
  iban: "",
  bic: "",
  account_holder: "",
  contact_email: "",
  contact_phone: "",
  website: ""
};

export default function SettingsPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CompanySettings>(initialSettings);

  useEffect(() => {
    async function loadSettings() {
      if (!user) return;
      try {
        const data = await CompanySettingsService.get(user);
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await CompanySettingsService.upsert(user, formData);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof CompanySettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const isValid = img.width <= 500 && img.height <= 500;
        URL.revokeObjectURL(img.src);
        resolve(isValid);
      };
    });
  };

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2 mb-6">
        <SidebarTrigger className="m-0" />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight">Einstellungen</h2>
          <p className="text-xs text-muted-foreground">
            Verwalten Sie Ihre Unternehmensdaten und Rechnungsoptionen.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="flex-1 flex flex-col space-y-4">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-6">
          <TabsTrigger
            value="general"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Allgemein
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="legal"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Recht & Steuern
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="bank"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Bank & Kontakt
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-none lg:col-span-1">
              <CardHeader>
                <CardTitle>Firmenlogo</CardTitle>
                <CardDescription>Wird auf Rechnungen und im App-Header verwendet.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-32 w-32 border-2 border-muted">
                  <AvatarImage src={formData.logo_url || ""} />
                  <AvatarFallback className="text-2xl bg-muted">Logo</AvatarFallback>
                </Avatar>
                <div className="w-full mb-1">
                  <UploadButton
                    endpoint="companyLogo"
                    onBeforeUploadBegin={async (files) => {
                      const file = files[0];
                      const isValidDimensions = await checkImageDimensions(file);

                      if (!isValidDimensions) {
                        return [];
                      }

                      return files;
                    }}
                    onClientUploadComplete={async (res) => {
                      if (res?.[0]) {
                        const newUrl = res[0].url;
                        const oldUrl = formData.logo_url;

                        if (!user) return;

                        try {
                          await CompanySettingsService.upsert(user, {
                            logo_url: newUrl
                          });

                          if (oldUrl && oldUrl !== newUrl) {
                            await deleteFile(oldUrl);
                          }

                          updateField("logo_url", newUrl);

                        } catch (error) {
                          console.error("Failed to save logo to DB", error);
                          await deleteFile(newUrl);
                        }
                      }
                    }}
                    appearance={{
                      button: "rounded-none w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm h-9 px-4 py-2",
                      allowedContent: "hidden"
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">Erlaubtes Format: PNG (max. 500x500px, 1 MB)</p>
              </CardContent>
            </Card>

            <Card className="rounded-none lg:col-span-2">
              <CardHeader>
                <CardTitle>Unternehmensdetails</CardTitle>
                <CardDescription>Ihre öffentlichen Unternehmensdaten.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Firmenname</Label>
                  <Input
                    value={formData.company_name || ""}
                    onChange={(e) => updateField("company_name", e.target.value)}
                    className="rounded-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Vorname</Label>
                    <Input
                      value={formData.first_name || ""}
                      onChange={(e) => updateField("first_name", e.target.value)}
                      className="rounded-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Nachname</Label>
                    <Input
                      value={formData.last_name || ""}
                      onChange={(e) => updateField("last_name", e.target.value)}
                      className="rounded-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Adresse</Label>
                  <Textarea
                    value={formData.address || ""}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="rounded-none min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Rechtliche Informationen</CardTitle>
              <CardDescription>Definiert die rechtliche Struktur Ihrer Rechnungen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label>Rechtsform</Label>
                  <Select
                    value={formData.legal_form}
                    onValueChange={(val) => updateField("legal_form", val)}
                  >
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Rechtsform wählen" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="eu">Einzelunternehmen (e.U.)</SelectItem>
                      <SelectItem value="gmbh">GmbH</SelectItem>
                      <SelectItem value="og">OG</SelectItem>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="freelance">Freiberufler / Neue Selbständige</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Firmenbuchnummer (FN)</Label>
                  <Input
                    value={formData.commercial_register_number || ""}
                    onChange={(e) => updateField("commercial_register_number", e.target.value)}
                    className="rounded-none"
                  />
                  <p className="text-[10px] text-muted-foreground">Optional falls nicht registriert.</p>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Firmenbuchgericht</Label>
                <Input
                  value={formData.registration_court || ""}
                  onChange={(e) => updateField("registration_court", e.target.value)}
                  className="rounded-none"
                />
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-row items-center justify-between rounded-none border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Kleinunternehmer-Regelung</Label>
                    <div className="text-xs text-muted-foreground">
                      Aktivieren, wenn Sie gemäß §6 Abs.1 Z27 UStG umsatzsteuerbefreit sind.
                    </div>
                  </div>
                  <Switch
                    checked={formData.is_small_business}
                    onCheckedChange={(c) => updateField("is_small_business", c)}
                  />
                </div>

                {!formData.is_small_business && (
                  <div className="mt-4 grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1">
                      <Label>UID-Nummer</Label>
                      <Input
                        value={formData.vat_id || ""}
                        onChange={(e) => updateField("vat_id", e.target.value)}
                        className="rounded-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Standard-Steuersatz (%)</Label>
                      <Input
                        type="number"
                        value={formData.default_tax_rate}
                        onChange={(e) => updateField("default_tax_rate", parseFloat(e.target.value))}
                        className="rounded-none"
                      />
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle>Bankverbindung</CardTitle>
                <CardDescription>Wird auf Rechnungen für Zahlungen angezeigt.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Bankname</Label>
                  <Input value={formData.bank_name || ""} onChange={(e) => updateField("bank_name", e.target.value)} className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>IBAN</Label>
                  <Input value={formData.iban || ""} onChange={(e) => updateField("iban", e.target.value)} className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>BIC / SWIFT</Label>
                  <Input value={formData.bic || ""} onChange={(e) => updateField("bic", e.target.value)} className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Kontoinhaber</Label>
                  <Input value={formData.account_holder || ""} onChange={(e) => updateField("account_holder", e.target.value)} className="rounded-none" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none">
              <CardHeader>
                <CardTitle>Kontaktinformationen</CardTitle>
                <CardDescription>Wie Kunden Sie erreichen können.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>E-Mail Adresse</Label>
                  <Input type="email" value={formData.contact_email || ""} onChange={(e) => updateField("contact_email", e.target.value)} className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Telefonnummer</Label>
                  <Input type="tel" value={formData.contact_phone || ""} onChange={(e) => updateField("contact_phone", e.target.value)} className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Webseite</Label>
                  <Input value={formData.website || ""} onChange={(e) => updateField("website", e.target.value)} className="rounded-none" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <div className="flex justify-end pt-4">
          <Button className="rounded-none min-w-[150px]" onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Änderungen speichern
          </Button>
        </div>

      </Tabs>
    </div>
  );
}