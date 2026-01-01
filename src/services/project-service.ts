import { getApiClient } from "@/lib/api-client";
import { Project } from "@/lib/types";
import { CurrentUser } from "@stackframe/stack";

export const ProjectService = {
  async getAll(user: CurrentUser) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("projects")
      .select("*, customers:customers!fk_projects_customer(name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Project[];
  },

  async create(user: CurrentUser, project: Partial<Project>) {
    const pg = await getApiClient(user);

    const { customers, id, ...rest } = project;

    const payload = { ...rest, user_id: user.id };

    const { data, error } = await pg
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async update(user: CurrentUser, id: number, project: Partial<Project>) {
    const pg = await getApiClient(user);

    const { customers, id: _, ...rest } = project;

    const { data, error } = await pg
      .from("projects")
      .update(rest)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async delete(user: CurrentUser, id: number) {
    const pg = await getApiClient(user);
    const { error } = await pg.from("projects").delete().eq("id", id);
    if (error) throw error;
  }
};