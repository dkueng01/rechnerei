import { getApiClient } from "@/lib/api-client";
import { Customer } from "@/lib/types";
import { CurrentUser } from "@stackframe/stack";

export const CustomerService = {
  async getAll(user: CurrentUser) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Customer[];
  },

  async create(user: CurrentUser, customer: Partial<Customer>) {
    const pg = await getApiClient(user);

    const payload = {
      ...customer,
      user_id: user.id,
    };

    const { data, error } = await pg
      .from("customers")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  },

  async update(user: CurrentUser, id: number, customer: Partial<Customer>) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("customers")
      .update(customer)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  },

  async delete(user: CurrentUser, id: number) {
    const pg = await getApiClient(user);
    const { error } = await pg.from("customers").delete().eq("id", id);
    if (error) throw error;
  }
};