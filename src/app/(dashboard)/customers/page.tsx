"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Plus, Search, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CreateCustomerSheet } from "@/components/create-customer-sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { stackClientApp } from "@/stack/client";

const customers = [
  {
    id: "1",
    name: "Feuerwehr Raggal",
    contact: "Patrick Jenny",
    email: "fueheee@raggal.com",
    invoices: 0,
    projects: 0,
    status: "active",
  },
];

export default function CustomersPage() {
  const user = stackClientApp.useUser({ or: 'redirect' })
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen">
      <div className="flex items-center items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Kunden</h2>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kunden suchen..."
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Kunde hinzufügen
        </Button>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Ansprechperson</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Rechnungen</TableHead>
              <TableHead>Projekte</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">FR</AvatarFallback>
                    </Avatar>
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.contact}</TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell className="text-muted-foreground">{customer.invoices || "-"}</TableCell>
                <TableCell className="text-muted-foreground">{customer.projects || "-"}</TableCell>
                <TableCell>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menü öffnen</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                      <DropdownMenuItem>Details bearbeiten</DropdownMenuItem>
                      <DropdownMenuItem>Rechnung erstellen</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Löschen</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateCustomerSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}