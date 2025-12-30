import { getApiClient } from "@/lib/api-client";
import { TimeEntry } from "@/lib/types";
import { CurrentUser } from "@stackframe/stack";

export const TimeEntryService = {
  async getRange(user: CurrentUser, startIso: string, endIso: string) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("time_entries")
      .select(`
        *,
        projects ( name, customers ( name ) ),
        catalog_items ( name, price )
      `)
      .eq("user_id", user.id)
      .gte("start_time", startIso)
      .lte("start_time", endIso)
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data as TimeEntry[];
  },

  async create(user: CurrentUser, entry: Partial<TimeEntry>) {
    const pg = await getApiClient(user);

    const { projects, catalog_items, duration_minutes, id, ...payload } = entry;

    const { data, error } = await pg
      .from("time_entries")
      .insert({ ...payload, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data as TimeEntry;
  },

  async update(user: CurrentUser, id: number, entry: Partial<TimeEntry>) {
    const pg = await getApiClient(user);

    const { projects, catalog_items, duration_minutes, id: _, ...payload } = entry;

    const { data, error } = await pg
      .from("time_entries")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as TimeEntry;
  },

  async delete(user: CurrentUser, id: number) {
    const pg = await getApiClient(user);
    const { error } = await pg.from("time_entries").delete().eq("id", id);
    if (error) throw error;
  }
};