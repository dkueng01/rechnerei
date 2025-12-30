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
  Package,
  Clock,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect, useCallback } from "react";
import { CreateCatalogItemSheet } from "@/components/create-catalog-item-sheet";
import { stackClientApp } from "@/stack/client";
import { CatalogItem } from "@/lib/types";
import { CatalogService } from "@/services/catalog-service";

export default function CatalogPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadItems = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await CatalogService.getAll(user);
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (item: CatalogItem) => {
    setEditingItem(item);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    try {
      await CatalogService.delete(user, id);
      loadItems();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = items.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Katalog</h2>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Elemente suchen..."
            className="pl-8 rounded-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleOpenCreate} className="rounded-none">
          <Plus className="mr-2 h-4 w-4" /> Element hinzufügen
        </Button>
      </div>

      <div className="border flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bezeichnung</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Preis</TableHead>
              <TableHead>Einheit</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Laden...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Keine Einträge gefunden.
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {item.type === 'service' ? (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>Dienstleistung</span>
                        </>
                      ) : (
                        <>
                          <Package className="h-3 w-3" />
                          <span>Produkt</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    € {item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground uppercase text-xs">
                    {item.unit}
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
                        <DropdownMenuItem
                          className="rounded-none"
                          onClick={() => handleOpenEdit(item)}
                        >
                          Details bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive rounded-none"
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          Löschen
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

      <CreateCatalogItemSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSuccess={loadItems}
        itemToEdit={editingItem}
      />
    </div>
  );
}