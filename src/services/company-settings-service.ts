import { getApiClient } from "@/lib/api-client";
import { CompanySettings } from "@/lib/types";
import { CurrentUser } from "@stackframe/stack";

export const CompanySettingsService = {
  async get(user: CurrentUser) {
    const pg = await getApiClient(user);
    const { data, error } = await pg
      .from("company_settings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // If no settings exist yet, return null (not an error)
    if (error && error.code === 'PGRST116') return null;
    if (error) throw error;

    return data as CompanySettings;
  },

  async upsert(user: CurrentUser, settings: Partial<CompanySettings>) {
    const pg = await getApiClient(user);

    // We explicitly set user_id to ensure security
    const payload = {
      ...settings,
      user_id: user.id,
      updated_at: new Date().toISOString()
    };

    // onConflict: user_id allows us to update if exists, insert if not
    const { data, error } = await pg
      .from("company_settings")
      .upsert(payload, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    return data as CompanySettings;
  }
};