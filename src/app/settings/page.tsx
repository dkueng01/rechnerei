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
          <h2 className="text-xl font-bold tracking-tight">Settings</h2>
          <p className="text-xs text-muted-foreground">
            Manage your company details and invoice configurations.
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
              General
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="legal"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Legal & Tax
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="bank"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Bank & Contact
            </div>
          </TabsTrigger>
        </TabsList>

        {/* --- GENERAL TAB --- */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Logo Section */}
            <Card className="rounded-none lg:col-span-1">
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Used on invoices and in the app header.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-32 w-32 border-2 border-muted">
                  <AvatarImage src="/placeholder-logo.png" />
                  <AvatarFallback className="text-2xl bg-muted">CN</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="rounded-none w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload New
                </Button>
              </CardContent>
            </Card>

            {/* Basic Info Section */}
            <Card className="rounded-none lg:col-span-2">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Your public business information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Company Name</Label>
                  <Input defaultValue="Muster Design e.U." className="rounded-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>First Name</Label>
                    <Input defaultValue="Max" className="rounded-none" />
                  </div>
                  <div className="space-y-1">
                    <Label>Last Name</Label>
                    <Input defaultValue="Mustermann" className="rounded-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Address</Label>
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
              <CardTitle>Legal Information</CardTitle>
              <CardDescription>Defines how your invoices are legally structured.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label>Legal Form (Rechtsform)</Label>
                  <Select defaultValue="eu">
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select Legal Form" />
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
                  <Label>Commercial Register No. (FN)</Label>
                  <Input placeholder="e.g. FN 123456 x" className="rounded-none" />
                  <p className="text-[10px] text-muted-foreground">Optional if not registered.</p>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Registration Court (Firmenbuchgericht)</Label>
                <Input placeholder="e.g. Handelsgericht Wien" className="rounded-none" />
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-row items-center justify-between rounded-none border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Small Business Regulation (Kleinunternehmer)</Label>
                    <div className="text-xs text-muted-foreground">
                      Check this if you are exempt from VAT under §6 Abs.1 Z27 UStG.
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
                      <Label>VAT ID (UID-Nummer)</Label>
                      <Input placeholder="ATU..." className="rounded-none" />
                    </div>
                    <div className="space-y-1">
                      <Label>Default Tax Rate (%)</Label>
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
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>Displayed on invoices for payment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Bank Name</Label>
                  <Input placeholder="e.g. Erste Bank" className="rounded-none" />
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
                  <Label>Account Holder</Label>
                  <Input placeholder="Max Mustermann" className="rounded-none" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How customers can reach you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue="office@musterdesign.at" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Phone Number</Label>
                  <Input type="tel" defaultValue="+43 660 12345678" className="rounded-none" />
                </div>
                <div className="space-y-1">
                  <Label>Website</Label>
                  <Input defaultValue="www.musterdesign.at" className="rounded-none" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sticky Save Bar */}
        <div className="flex justify-end pt-4">
          <Button className="rounded-none min-w-[150px]">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

      </Tabs>
    </div>
  );
}