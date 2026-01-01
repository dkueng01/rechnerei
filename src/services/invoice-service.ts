import { InvoiceData } from "@/components/invoice-template";
import { getApiClient } from "@/lib/api-client";
import { CurrentUser } from "@stackframe/stack";

export const InvoiceService = {
  async getNextNumber(user: CurrentUser): Promise<string> {
    const client = await getApiClient(user);
    const currentYear = new Date().getFullYear();
    const prefix = `${currentYear}-`;

    const { data } = await client
      .from("invoices")
      .select("invoice_number")
      .ilike("invoice_number", `${prefix}%`)
      .order("invoice_number", { ascending: false })
      .limit(1)
      .single();

    if (!data) {
      return `${prefix}001`;
    }

    const lastNum = data.invoice_number;
    const sequence = parseInt(lastNum.split("-")[1] || "0", 10);
    const nextSequence = (sequence + 1).toString().padStart(3, "0");

    return `${prefix}${nextSequence}`;
  },

  async create(
    user: CurrentUser,
    data: InvoiceData,
    meta: {
      customerId?: string,
      projectId?: string,
      linkedTimeEntryIds?: number[]
    }
  ) {
    const client = await getApiClient(user);

    const subtotal = data.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal;

    const { data: invoice, error: invoiceError } = await client
      .from("invoices")
      .insert({
        user_id: user.id,
        invoice_number: data.invoiceNumber,
        customer_id: meta.customerId ? parseInt(meta.customerId) : null,
        project_id: meta.projectId ? parseInt(meta.projectId) : null,
        issue_date: data.date,
        due_date: data.dueDate || null,
        performance_date: data.performanceDate,
        recipient_name: data.recipient.name,
        recipient_address: data.recipient.address,
        subtotal: subtotal,
        total: total,
        status: 'draft'
      })
      .select()
      .single();

    if (invoiceError) throw new Error(`Fehler beim Erstellen der Rechnung: ${invoiceError.message}`);
    if (!invoice) throw new Error("Rechnung wurde nicht erstellt.");

    const newInvoiceId = invoice.id;

    if (data.items.length > 0) {
      const dbItems = data.items.map((item, index) => ({
        invoice_id: newInvoiceId,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.price,
        amount: item.quantity * item.price,
        position: index
      }));

      const { error: itemsError } = await client
        .from("invoice_items")
        .insert(dbItems);

      if (itemsError) {
        console.error("Fehler bei Items, lösche Rechnung...", itemsError);
        await client.from("invoices").delete().eq("id", newInvoiceId);
        throw new Error(`Fehler beim Speichern der Positionen: ${itemsError.message}`);
      }
    }

    if (meta.linkedTimeEntryIds && meta.linkedTimeEntryIds.length > 0) {
      const { error: timeError } = await client
        .from("time_entries")
        .update({ invoice_id: newInvoiceId })
        .in("id", meta.linkedTimeEntryIds);

      if (timeError) {
        console.error("Fehler beim Verknüpfen der Zeiten", timeError);
      }
    }

    return newInvoiceId;
  }
};