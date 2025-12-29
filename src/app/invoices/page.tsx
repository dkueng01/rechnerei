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
  FileText,
  Download
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
import { CreateInvoiceSheet } from "@/components/create-invoice-sheet";
import { stackClientApp } from "@/stack/client";

// Mock Data
const invoices = [
  {
    id: "1",
    number: "2025-001",
    recipient: "Max Mustermann",
    date: "30.10.2025",
    amount: "€1,380.00",
    status: "Sent"
  },
  {
    id: "2",
    number: "2025-002",
    recipient: "Bäckerei Müller",
    date: "02.11.2025",
    amount: "€450.00",
    status: "Draft"
  },
];

export default function InvoicesPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Invoices</h2>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="border flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {inv.number}
                </TableCell>
                <TableCell>{inv.recipient}</TableCell>
                <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                <TableCell>{inv.amount}</TableCell>
                <TableCell>
                  <div className={`
                        inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors
                        ${inv.status === 'Sent' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}
                    `}>
                    {inv.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Print PDF</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateInvoiceSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}