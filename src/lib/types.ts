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