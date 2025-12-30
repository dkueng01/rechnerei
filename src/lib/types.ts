export interface CompanySettings {
  id?: number;
  user_id?: string;
  company_name: string;
  logo_url: string | null;
  first_name: string;
  last_name: string;
  address: string;
  legal_form: string;
  commercial_register_number: string;
  registration_court: string;
  is_small_business: boolean;
  vat_id: string;
  default_tax_rate: number;
  bank_name: string;
  iban: string;
  bic: string;
  account_holder: string;
  contact_email: string;
  contact_phone: string;
  website: string;
}

export interface Customer {
  id?: number;
  user_id?: string;
  name: string;
  email?: string;
  billing_email?: string;
  phone?: string;
  website?: string;
  contact_person?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  vat_number?: string;
  note?: string;
  created_at?: string;
}

export interface CatalogItem {
  id?: number;
  user_id?: string;
  name: string;
  type: 'service' | 'product';
  price: number;
  currency: string;
  unit: string;
  tax_rate: number;
  created_at?: string;
}

export interface Project {
  id?: number;
  user_id?: string;
  customer_id?: number | null;
  name: string;
  description?: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  time_estimate?: number;
  hourly_rate?: number;
  currency: string;
  created_at?: string;

  customers?: {
    name: string;
  };
}