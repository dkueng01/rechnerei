import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg border-slate-200">
          <CardHeader className="pb-6 border-b border-slate-100 bg-white rounded-t-xl">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                    <Scale className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">Allgemeine Geschäftsbedingungen (AGB)</CardTitle>
            </div>
            <CardDescription>
              Für die Nutzung der Software "RECHNEREI". <br/>
              Stand: November 2025
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8 text-slate-700 leading-relaxed">

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Geltungsbereich</h3>
              <p>
                Diese AGB gelten für alle Geschäftsbeziehungen zwischen [Dein Firmenname] (nachfolgend "Anbieter") und den Kunden
                (nachfolgend "Nutzer") über die Nutzung der Software "RECHNEREI". Das Angebot richtet sich primär an Unternehmer (B2B),
                aber auch an Gründer in der Vorbereitungsphase.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Vertragsgegenstand & Leistung</h3>
              <p className="mb-2">
                Der Anbieter stellt dem Nutzer eine webbasierte Software (SaaS) zur Erstellung von Rechnungen und Kundenverwaltung zur Verfügung.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Die Software ist über das Internet zugänglich (Cloud-Lösung).</li>
                <li>Die Verfügbarkeit wird mit 99% im Jahresmittel gewährleistet (ausgenommen Wartungsarbeiten).</li>
                <li>Der Anbieter ist berechtigt, die Software technisch weiterzuentwickeln.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Testphase & Vertragsschluss</h3>
              <p>
                Der Nutzer kann die Software 14 Tage kostenlos testen. Der Test endet automatisch, ohne dass es einer Kündigung bedarf.
                Möchte der Nutzer die Software weiter verwenden, muss er die kostenpflichtige "Lifetime-Lizenz" erwerben.
                Der Vertrag kommt durch die Bestellung und die Annahme (Freischaltung des Accounts nach Zahlung) zustande.
              </p>
            </section>

            <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                4. Einmalkauf ("Lifetime Deal")
              </h3>
              <p className="text-sm mb-2">
                Im Gegensatz zu Abo-Modellen erwirbt der Nutzer gegen eine einmalige Zahlung das Recht, die Software
                für die <strong>Lebensdauer des Produktes</strong> "RECHNEREI" zu nutzen.
              </p>
              <p className="text-sm text-slate-500 italic">
                "Lifetime" bezieht sich auf die Lebensdauer des Software-Produkts, nicht des Nutzers.
                Sollte der Dienst eingestellt werden (z.B. aus wirtschaftlichen Gründen), endet das Nutzungsrecht.
                Der Anbieter verpflichtet sich in diesem Fall, den Nutzern mindestens 3 Monate vorher Bescheid zu geben
                und eine Datenexport-Möglichkeit bereitzustellen.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">5. Zahlungsbedingungen</h3>
              <p>
                Die Preise verstehen sich in Euro zzgl. der gesetzlichen Umsatzsteuer (sofern nicht anders ausgewiesen).
                Die Zahlung ist sofort nach Vertragsabschluss fällig. Die Rechnung wird dem Nutzer per E-Mail zugesandt.
              </p>
            </section>

             <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">6. Haftung</h3>
              <p>
                Der Anbieter haftet für Vorsatz und grobe Fahrlässigkeit uneingeschränkt.
                Bei leichter Fahrlässigkeit ist die Haftung bei Verletzung vertragswesentlicher Pflichten beschränkt
                auf den vertragstypischen, vorhersehbaren Schaden.
                Für Unternehmer (B2B) ist die Haftung für leichte Fahrlässigkeit sowie für Folgeschäden und entgangenen Gewinn ausgeschlossen.
                Der Anbieter übernimmt keine steuerliche Beratung. Der Nutzer ist selbst für die steuerliche Korrektheit seiner Rechnungen verantwortlich.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">7. Schlussbestimmungen</h3>
              <p>
                Es gilt österreichisches Recht. Erfüllungsort und Gerichtsstand ist Wien, sofern der Kunde Unternehmer ist.
              </p>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}