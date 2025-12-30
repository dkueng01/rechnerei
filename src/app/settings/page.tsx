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
import { Upload, Save, Building2, Gavel, Wallet } from "lucide-react";
import { stackClientApp } from "@/stack/client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isSmallBusiness, setIsSmallBusiness] = useState(true);

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

        {/* --- GENERAL TAB --- */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Logo Section */}
            <Card className="rounded-none lg:col-span-1">
              <CardHeader>
                <CardTitle>Firmenlogo</CardTitle>
                <CardDescription>Wird auf Rechnungen und im App-Header verwendet.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-32 w-32 border-2 border-muted">
                  <AvatarImage src="/placeholder-logo.png" />
                  <AvatarFallback className="text-2xl bg-muted">CN</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="rounded-none w-full">
                  <Upload className="mr-2 h-4 w-4" /> Neues hochladen
                </Button>
              </CardContent>
            </Card>

            {/* Basic Info Section */}
            <Card className="rounded-none lg:col-span-2">
              <CardHeader>
                <CardTitle>Unternehmensdetails</CardTitle>
                <CardDescription>Ihre öffentlichen Unternehmensdaten.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Firmenname</Label>
                  <Input defaultValue="Muster Design e.U." className="rounded-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Vorname</Label>
                    <Input defaultValue="Max" className="rounded-none" />
                  </div>
                  <div className="space-y-1">
                    <Label>Nachname</Label>
                    <Input defaultValue="Mustermann" className="rounded-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Adresse</Label>
                  <Textarea defaultValue="Musterstraße 12&#10;1010 Wien" className="rounded-none min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- LEGAL & TAX TAB --- */}
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
                  <Select defaultValue="eu">
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
                  <Input placeholder="z.B. FN 123456 x" className="rounded-none" />
                  <p className="text-[10px] text-muted-foreground">Optional falls nicht registriert.</p>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Firmenbuchgericht</Label>
                <Input placeholder="z.B. Handelsgericht Wien" className="rounded-none" />
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
                    checked={isSmallBusiness}
                    onCheckedChange={setIsSmallBusiness}
                  />
                </div>

                {!isSmallBusiness && (
                  <div className="mt-4 grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1">
                      <Label>UID-Nummer</Label>
                      <Input placeholder="ATU..." className="rounded-none" />
                    </div>
                    <div className="space-y-1">
                      <Label>Standard-Steuersatz (%)</Label>
                      <Input type="number" defaultValue="20" className="rounded-none" />
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* --- BANK & CONTACT TAB --- */}
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
                  <Input placeholder="z.B. Erste Bank" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>IBAN</Label>
                  <Input placeholder="AT12 0000 0000 0000 0000" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>BIC / SWIFT</Label>
                  <Input placeholder="BANKATWW" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Kontoinhaber</Label>
                  <Input placeholder="Max Mustermann" className="rounded-none" />
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
                  <Input type="email" defaultValue="office@musterdesign.at" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Telefonnummer</Label>
                  <Input type="tel" defaultValue="+43 660 12345678" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Webseite</Label>
                  <Input defaultValue="www.musterdesign.at" className="rounded-none" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sticky Save Bar */}
        <div className="flex justify-end pt-4">
          <Button className="rounded-none min-w-[150px]">
            <Save className="mr-2 h-4 w-4" /> Änderungen speichern
          </Button>
        </div>

      </Tabs>
    </div>
  );
}