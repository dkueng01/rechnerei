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

export interface TimeEntry {
  id?: number;
  user_id?: string;
  project_id?: number;
  invoice_id?: number | null;
  catalog_item_id?: number | null;
  description?: string;
  start_time: string;
  end_time: string;
  duration_minutes?: number;
  is_billable: boolean;
  created_at?: string;

  projects?: {
    name: string;
    customers?: {
      name: string;
    }
  };
  catalog_items?: {
    name: string;
    price: number;
  };
}

export interface Invoice {
  id?: number;
  user_id?: string;
  customer_id?: number | null;
  project_id?: number | null;

  invoice_number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

  issue_date: string;
  due_date?: string | null;
  performance_date?: string;

  recipient_name?: string;
  recipient_address?: string;

  subtotal: number;
  tax_total: number;
  total: number;
  currency: string;

  notes?: string;

  created_at?: string;
  updated_at?: string;

  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id?: number;
  invoice_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  position: number;
}