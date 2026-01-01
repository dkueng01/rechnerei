"use client";

import { useEffect, useState } from "react";
import { stackClientApp } from "@/stack/client";
import { FinancialRecord } from "@/lib/types";
import { FinanceService } from "@/services/finance-service";
import { AddTransactionSheet } from "@/components/add-transaction-sheet";
import { format } from "date-fns";
import { de } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal, Plus, Search, ArrowUpRight, ArrowDownRight,
  FileText, Loader2, Trash
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function FinancesPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });

  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await FinanceService.getFinancialRecords(user);
      setRecords(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const totalIncome = records.filter(r => r.amount > 0).reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = records.filter(r => r.amount < 0).reduce((acc, r) => acc + r.amount, 0);
  const netResult = totalIncome + totalExpense;

  const handleDelete = async (record: FinancialRecord) => {
    if (record.source === 'invoice') {
      return;
    }

    if (!confirm("Eintrag löschen?")) return;

    const dbId = parseInt(record.id.toString().split('-')[1]);

    try {
      if (user) await FinanceService.deleteTransaction(user, dbId);
      setRecords(prev => prev.filter(r => r.id !== record.id));
    } catch (e: any) {
      console.error(e);
    }
  };

  const filteredRecords = records.filter(r =>
    r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col bg-background">
      <div className="flex items-center space-y-2 gap-2 px-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Finanzen</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 pt-4 px-2">
        <div className="border p-4 bg-card flex flex-col justify-between space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Nettoergebnis (Gesamt)</span>
          <div className={`text-2xl font-mono font-bold ${netResult >= 0 ? 'text-foreground' : 'text-red-500'}`}>
            {new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(netResult)}
          </div>
        </div>
        <div className="border p-4 bg-card flex flex-col justify-between space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Einnahmen</span>
          <div className="text-2xl font-mono font-bold text-emerald-500 flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5" />
            {new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(totalIncome)}
          </div>
        </div>
        <div className="border p-4 bg-card flex flex-col justify-between space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Ausgaben</span>
          <div className="text-2xl font-mono font-bold text-rose-500 flex items-center gap-2">
            <ArrowDownRight className="h-5 w-5" />
            {new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(Math.abs(totalExpense))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-4 px-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Transaktionen suchen..."
            className="pl-8 rounded-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsSheetOpen(true)} className="rounded-none">
          <Plus className="mr-2 h-4 w-4" /> Transaktion hinzufügen
        </Button>
      </div>

      <div className="border flex flex-col bg-card mx-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Datum</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead>Kategorie</TableHead>
              <TableHead>Beleg</TableHead>
              <TableHead className="text-right">Betrag</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center"><Loader2 className="animate-spin inline mr-2" /> Lade Daten...</TableCell>
              </TableRow>
            ) : filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">Keine Transaktionen gefunden.</TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {format(new Date(rec.date), "dd.MM.yyyy", { locale: de })}
                  </TableCell>
                  <TableCell className="font-medium">
                    {rec.description}
                    {rec.source === 'invoice' && <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-1 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">Rechnung</span>}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center border px-2 py-0.5 text-xs text-muted-foreground uppercase tracking-wide bg-muted/50">
                      {rec.category || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {rec.hasReceipt ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        <span>PDF</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">-</span>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${rec.amount > 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                    {rec.amount > 0 ? '+' : ''} {rec.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {rec.source === 'manual' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
                            <span className="sr-only">Menü öffnen</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                          <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                          <DropdownMenuItem className="text-destructive rounded-none cursor-pointer" onClick={() => handleDelete(rec)}>
                            <Trash className="mr-2 h-4 w-4" /> Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddTransactionSheet
        open={isSheetOpen}
        onOpenChange={(val) => {
          setIsSheetOpen(val);
          if (!val) loadData();
        }}
      />
    </div>
  );
}