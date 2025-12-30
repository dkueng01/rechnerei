import { getApiClient } from "@/lib/api-client";
import { CatalogItem } from "@/lib/types";
import { CurrentUser } from "@stackframe/stack";

export const CatalogService = {
  async getAll(user: CurrentUser) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("catalog_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as CatalogItem[];
  },

  async create(user: CurrentUser, item: Partial<CatalogItem>) {
    const pg = await getApiClient(user);
    const payload = { ...item, user_id: user.id };

    const { data, error } = await pg
      .from("catalog_items")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data as CatalogItem;
  },

  async update(user: CurrentUser, id: number, item: Partial<CatalogItem>) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("catalog_items")
      .update(item)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as CatalogItem;
  },

  async delete(user: CurrentUser, id: number) {
    const pg = await getApiClient(user);
    const { error } = await pg.from("catalog_items").delete().eq("id", id);
    if (error) throw error;
  }
};