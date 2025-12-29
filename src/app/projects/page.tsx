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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Plus,
  Search,
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
import { CreateProjectSheet } from "@/components/create-project-sheet";
import { stackClientApp } from "@/stack/client";

const projects = [
  {
    id: "1",
    name: "100 Jahre Party",
    customer: "Feuerwehr Raggal",
    totalTime: "4h 15m",
    status: "In Progress",
    amount: "€170.00"
  },
  {
    id: "2",
    name: "Website Redesign",
    customer: "Bäckerei Müller",
    totalTime: "12h 00m",
    status: "In Progress",
    amount: "€960.00"
  },
];

export default function ProjectsPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Projects</h2>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[9px]">FR</AvatarFallback>
                    </Avatar>
                    {project.customer}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{project.totalTime}</TableCell>
                <TableCell className="text-muted-foreground">{project.amount}</TableCell>
                <TableCell>
                  <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                    {project.status}
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
                      <DropdownMenuItem>Log time</DropdownMenuItem>
                      <DropdownMenuItem>Edit details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateProjectSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}