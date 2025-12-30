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
import { CreateProjectSheet } from "@/components/create-project-sheet";
import { stackClientApp } from "@/stack/client";
import { Project } from "@/lib/types";
import { ProjectService } from "@/services/project-service";

export default function ProjectsPage() {
  const user = stackClientApp.useUser({ or: 'redirect' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProjects = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await ProjectService.getAll(user);
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    try {
      await ProjectService.delete(user, id);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.customers?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-2 p-2 py-6 min-h-screen flex flex-col">
      <div className="flex items-center space-y-2 gap-2">
        <SidebarTrigger className="m-0" />
        <h2 className="text-xl font-bold tracking-tight">Projekte</h2>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Projekte suchen..."
            className="pl-8 rounded-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleOpenCreate} className="rounded-none">
          <Plus className="mr-2 h-4 w-4" /> Projekt erstellen
        </Button>
      </div>

      <div className="border flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projekt</TableHead>
              <TableHead>Kunde</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Satz / h</TableHead>
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
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Keine Projekte gefunden.
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5 rounded-none">
                        <AvatarFallback className="text-[9px] rounded-none">
                          {project.customers?.name?.substring(0, 2).toUpperCase() || "UN"}
                        </AvatarFallback>
                      </Avatar>
                      {project.customers?.name || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors uppercase">
                      {project.status === 'in_progress' ? 'In Arbeit' :
                        project.status === 'completed' ? 'Fertig' : 'Pausiert'}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.hourly_rate ? `€ ${project.hourly_rate}` : '-'}
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
                        <DropdownMenuItem className="rounded-none">Zeit erfassen</DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-none"
                          onClick={() => handleOpenEdit(project)}
                        >
                          Details bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive rounded-none"
                          onClick={() => project.id && handleDelete(project.id)}
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

      <CreateProjectSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSuccess={loadProjects}
        projectToEdit={editingProject}
      />
    </div>
  );
}