"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { stackClientApp } from "@/stack/client";
import { AddTransactionSheet } from "@/components/add-transaction-sheet";

const transactions = [
  {
    id: "1",
    date: "2025-10-30",
    description: "Adobe Creative Cloud",
    category: "Subscription",
    amount: -65.99,
    type: "expense",
    hasReceipt: true,
  },
  {
    id: "2",
    date: "2025-10-28",
    description: "Invoice #2025-001 (Feuerwehr Raggal)",
    category: "Sales",
    amount: 1380.00,
    type: "income",
    hasReceipt: false,
  },
  {
    id: "3",
    date: "2025-10-25",
    description: "Office Supplies (Ink, Paper)",
    category: "Office",
    amount: -45.50,
    type: "expense",
    hasReceipt: true,
  },
];

export default function FinancesPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Finanzen</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 pt-4">
        <div className="border p-4 bg-background flex flex-col justify-between space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Nettoergebnis (Monat)</span>
          <div className="text-2xl font-mono font-bold">€ 1,268.51</div>
        </div>
        <div className="border p-4 bg-background flex flex-col justify-between space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Einnahmen</span>
          <div className="text-2xl font-mono font-bold text-emerald-500 flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5" /> € 1,380.00
          </div>
        </div>
        <div className="border p-4 bg-background flex flex-col justify-between space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Ausgaben</span>
          <div className="text-2xl font-mono font-bold text-rose-500 flex items-center gap-2">
            <ArrowDownRight className="h-5 w-5" /> € 111.49
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Transaktionen suchen..."
            className="pl-8 rounded-none"
          />
        </div>
        <Button onClick={() => setIsSheetOpen(true)} className="rounded-none">
          <Plus className="mr-2 h-4 w-4" /> Transaktion hinzufügen
        </Button>
      </div>

      <div className="border flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead>Kategorie</TableHead>
              <TableHead>Beleg</TableHead>
              <TableHead className="text-right">Betrag</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="text-muted-foreground font-mono text-xs">{tx.date}</TableCell>
                <TableCell className="font-medium">{tx.description}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center border px-2 py-0.5 text-xs text-muted-foreground uppercase tracking-wide">
                    {tx.category === 'Subscription' ? 'Abo' : tx.category === 'Sales' ? 'Verkauf' : tx.category === 'Office' ? 'Büro' : tx.category}
                  </span>
                </TableCell>
                <TableCell>
                  {tx.hasReceipt ? (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span>PDF</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">-</span>
                  )}
                </TableCell>
                <TableCell className={`text-right font-mono ${tx.type === 'income' ? 'text-emerald-500' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''} {tx.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
                        <span className="sr-only">Menü öffnen</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-none">
                      <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-none">Bearbeiten</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-none">Beleg anzeigen</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive rounded-none">Löschen</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddTransactionSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}