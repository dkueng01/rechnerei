import { CurrentUser } from "@stackframe/stack";
import { Transaction, FinancialRecord, Invoice } from "@/lib/types";
import { getApiClient } from "@/lib/api-client";

export const FinanceService = {

  async getFinancialRecords(user: CurrentUser): Promise<FinancialRecord[]> {
    const client = await getApiClient(user);
    const [txResponse, invResponse] = await Promise.all([
      client
        .from("transactions")
        .select("*")
        .order("date", { ascending: false }),

      client
        .from("invoices")
        .select("*")
        .eq("status", "paid")
        .order("issue_date", { ascending: false })
    ]);

    if (txResponse.error) throw txResponse.error;
    if (invResponse.error) throw invResponse.error;

    const manualTransactions = txResponse.data as Transaction[];
    const paidInvoices = invResponse.data as Invoice[];

    const recordsFromTx: FinancialRecord[] = manualTransactions.map(tx => ({
      id: `tx-${tx.id}`,
      source: 'manual',
      date: tx.date,
      description: tx.description,
      amount: tx.type === 'expense' ? -tx.amount : tx.amount,
      type: tx.type,
      category: tx.category,
      hasReceipt: !!tx.receipt_url,
      originalObject: tx
    }));

    const recordsFromInv: FinancialRecord[] = paidInvoices.map(inv => ({
      id: `inv-${inv.id}`,
      source: 'invoice',
      date: inv.issue_date,
      description: `Rechnung #${inv.invoice_number} (${inv.recipient_name})`,
      amount: inv.total,
      type: 'income',
      category: 'Sales',
      hasReceipt: false,
      originalObject: inv
    }));

    const allRecords = [...recordsFromTx, ...recordsFromInv].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return allRecords;
  },

  async createTransaction(user: CurrentUser, data: Partial<Transaction>) {
    const client = await getApiClient(user);

    const payload = { ...data, user_id: user.id };

    const { error } = await client
      .from("transactions")
      .insert(payload);

    if (error) throw error;
  },

  async deleteTransaction(user: CurrentUser, id: number) {
    const client = await getApiClient(user);
    const { error } = await client.from("transactions").delete().eq("id", id);
    if (error) throw error;
  }
};