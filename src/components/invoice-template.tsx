export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  performanceDate: string;
  sender: {
    name: string;
    address: string;
    email: string;
    phone: string;
    iban: string;
    bic: string;
    uid?: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  items: InvoiceItem[];
  isSmallBusiness: boolean;
  taxRate: number;
}

export function InvoiceTemplate({ data }: { data: InvoiceData }) {
  const subtotal = data.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxAmount = data.isSmallBusiness ? 0 : (subtotal * (data.taxRate / 100));
  const total = subtotal + taxAmount;

  return (
    <div className="bg-white text-black p-[50px] w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:m-0 print:w-full font-mono text-sm leading-relaxed box-border">
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-xl font-bold mb-2">{data.sender.name}</h1>
          <div className="text-xs text-neutral-500">
            <p>{data.sender.address}</p>
            <p>{data.sender.email} · {data.sender.phone}</p>
            {data.sender.uid && <p>UID: {data.sender.uid}</p>}
          </div>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Rechnung</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div className="grid grid-cols-[140px_1fr]">
            <span className="text-neutral-500">Rechnungs-Nr:</span>
            <span className="font-semibold">{data.invoiceNumber}</span>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <span className="text-neutral-500">Datum:</span>
            <span>{data.date}</span>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <span className="text-neutral-500">Leistungszeitraum:</span>
            <span>{data.performanceDate}</span>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-xs uppercase tracking-wider text-neutral-400 border-b border-black pb-1 mb-2 w-full max-w-[300px]">Empfänger</h3>
        <div className="font-medium text-base">
          {data.recipient.name}
        </div>
        <div className="whitespace-pre-line text-sm mt-1">
          {data.recipient.address}
        </div>
      </section>

      <table className="w-full mb-8 border-collapse">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left py-2 text-xs uppercase tracking-wider text-neutral-500 font-normal">Beschreibung</th>
            <th className="text-right py-2 text-xs uppercase tracking-wider text-neutral-500 font-normal">Menge</th>
            <th className="text-right py-2 text-xs uppercase tracking-wider text-neutral-500 font-normal">Einzel</th>
            <th className="text-right py-2 text-xs uppercase tracking-wider text-neutral-500 font-normal">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className="border-b border-neutral-200">
              <td className="py-3">{item.description}</td>
              <td className="py-3 text-right">{item.quantity}</td>
              <td className="py-3 text-right">€ {item.price.toFixed(2)}</td>
              <td className="py-3 text-right">€ {(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-end gap-2 mb-12">
        <div className="w-[250px] flex justify-between text-sm">
          <span>Netto</span>
          <span>€ {subtotal.toFixed(2)}</span>
        </div>

        {!data.isSmallBusiness ? (
          <div className="w-[250px] flex justify-between text-sm">
            <span>USt ({data.taxRate}%)</span>
            <span>€ {taxAmount.toFixed(2)}</span>
          </div>
        ) : null}

        <div className="w-[250px] flex justify-between font-bold text-lg border-t-2 border-black pt-2 mt-2">
          <span>Gesamtbetrag</span>
          <span>€ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-dashed border-neutral-300 text-xs text-neutral-500">
        <p className="mb-4">
          {data.isSmallBusiness
            ? "Umsatzsteuerbefreit – Kleinunternehmer gem. § 6 Abs. 1 Z 27 UStG. Es erfolgt kein Steuerausweis."
            : "Beträge enthalten die gesetzliche Umsatzsteuer."
          }
          <br />
          Bitte überweisen Sie den Betrag bis zum <strong>{data.dueDate}</strong> auf folgendes Konto:
        </p>

        <div className="flex gap-8">
          <div>
            <strong>Bankverbindung:</strong><br />
            IBAN: {data.sender.iban}<br />
            BIC: {data.sender.bic}
          </div>
          <div>
            <strong>Kontakt:</strong><br />
            {data.sender.email}
          </div>
        </div>
      </div>

    </div>
  );
}