"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { stackClientApp } from "@/stack/client";
import { InvoiceService } from "@/services/invoice-service";
import { Invoice } from "@/lib/types";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  MoreHorizontal,
  Plus,
  Search,
  Loader2,
  FileText,
  Trash,
  CheckCircle,
  Send,
  AlertCircle,
  SquareX
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function InvoicesPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const router = useRouter();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadInvoices = async () => {
    if (!user) return;
    try {
      const data = await InvoiceService.getAll(user);
      setInvoices(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, [user]);


  const handleDelete = async (id: number) => {
    if (!confirm("Rechnung wirklich löschen? Dies kann nicht rückgängig gemacht werden.")) return;
    if (!user) return;

    try {
      await InvoiceService.delete(user, id);
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    if (!user) return;
    const oldInvoices = [...invoices];
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: newStatus as any } : inv));

    try {
      await InvoiceService.updateStatus(user, id, newStatus);
    } catch (e: any) {
      setInvoices(oldInvoices);
      console.error(e);
    }
  };


  const filteredInvoices = invoices.filter(inv =>
    inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.recipient_name && inv.recipient_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="inline-flex items-center border border-muted-foreground/20 bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Entwurf</span>;
      case 'sent':
        return <span className="inline-flex items-center border border-blue-200 bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">Versendet</span>;
      case 'paid':
        return <span className="inline-flex items-center border border-green-200 bg-green-50 text-green-700 px-2 py-0.5 text-xs font-medium dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">Bezahlt</span>;
      case 'overdue':
        return <span className="inline-flex items-center border border-red-200 bg-red-50 text-red-700 px-2 py-0.5 text-xs font-medium dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">Überfällig</span>;
      case 'cancelled':
        return <span className="inline-flex items-center border border-gray-200 bg-gray-50 text-gray-500 px-2 py-0.5 text-xs font-medium decoration-slice line-through">Storniert</span>;
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col bg-background">
      <div className="flex items-center space-y-2 gap-2 px-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Rechnungen</h2>
      </div>

      <div className="flex items-center justify-between gap-4 py-4 px-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Nr. oder Empfänger suchen..."
            className="pl-8 rounded-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => router.push('/invoices/create')} className="rounded-none">
          <Plus className="mr-2 h-4 w-4" /> Neue Rechnung
        </Button>
      </div>

      <div className="border flex flex-col bg-card mx-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[120px]">Nr.</TableHead>
              <TableHead>Empfänger</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Betrag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Lade Rechnungen...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Keine Rechnungen gefunden.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono font-medium">
                    {inv.invoice_number}
                  </TableCell>
                  <TableCell className="font-medium text-foreground/80">
                    {inv.recipient_name || "Unbekannt"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {inv.issue_date ? format(new Date(inv.issue_date), "dd.MM.yyyy", { locale: de }) : "-"}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Intl.NumberFormat('de-AT', { style: 'currency', currency: inv.currency || 'EUR' }).format(inv.total)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(inv.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
                          <span className="sr-only">Menü öffnen</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none w-48">
                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="rounded-none cursor-pointer">
                            <span>Status ändern</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="rounded-none">
                            <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, 'draft')}>
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" /> Entwurf
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, 'sent')}>
                              <Send className="mr-2 h-4 w-4 text-blue-500" /> Versendet
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, 'paid')}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Bezahlt
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, 'overdue')}>
                              <AlertCircle className="mr-2 h-4 w-4 text-red-500" /> Überfällig
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, 'cancelled')}>
                              <SquareX className="mr-2 h-4 w-4 text-red-800" /> Storniert
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive rounded-none cursor-pointer"
                          onClick={() => handleDelete(inv.id!)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}