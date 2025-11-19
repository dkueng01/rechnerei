import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Eye, Server, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PrivacyPage() {
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
          <CardHeader className="pb-4 border-b border-slate-100 bg-white rounded-t-xl">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Lock className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">Datenschutzerklärung</CardTitle>
            </div>
            <CardDescription>
              Wir nehmen den Schutz deiner Daten sehr ernst. Hier erklären wir transparent nach Art. 13 DSGVO, was mit deinen Daten passiert.
              <br/>Stand: November 2025
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">

              <AccordionItem value="item-1" className="px-6">
                <AccordionTrigger className="text-lg font-medium">1. Verantwortlicher</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br/><br/>
                  <strong>[Dein Firmenname / Name]</strong><br/>
                  [Deine Adresse]<br/>
                  [PLZ Ort]<br/>
                  Österreich<br/><br/>
                  E-Mail: office@rechnerei.at
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="px-6">
                <AccordionTrigger className="text-lg font-medium">2. Hosting & Log-Files</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  <div className="flex gap-3 items-start mb-4">
                    <Server className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                    <p>
                      Unsere Website wird bei einem externen Dienstleister gehostet (z.B. Vercel, AWS).
                      Wenn du unsere Website besuchst, speichert der Webserver automatisch ein sogenanntes Server-Logfile,
                      das z.B. den Namen der angeforderten Datei, deine IP-Adresse, Datum und Uhrzeit des Abrufs,
                      übertragene Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf dokumentiert.
                      Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen
                      an einer korrekten Darstellung unseres Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="px-6">
                <AccordionTrigger className="text-lg font-medium">3. Registrierung & SaaS-Nutzung</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Wenn du ein Konto bei RECHNEREI erstellst, verarbeiten wir deine angegebenen Daten
                  (Name, Firmenname, E-Mail, Passwort-Hash, Rechnungsdaten).
                  Diese Daten sind für die Vertragserfüllung (Nutzung der Software) zwingend erforderlich (Art. 6 Abs. 1 lit. b DSGVO).
                  Wir nutzen diese Daten ausschließlich, um dir die Funktionen der Software bereitzustellen, Rechnungen zu generieren
                  und den Kundenservice zu gewährleisten.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="px-6">
                <AccordionTrigger className="text-lg font-medium">4. Zahlungsabwicklung (Stripe)</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  <div className="flex gap-3 items-start mb-4">
                    <CreditCard className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                    <p>
                      Für die Abwicklung der Zahlung (Lifetime-Lizenz) nutzen wir den Zahlungsdienstleister <strong>Stripe Payments Europe, Ltd.</strong>
                      (Irland). Die Übermittlung deiner Zahlungsdaten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsabwicklung).
                      Wir selbst speichern keine Kreditkartendaten. Stripe verarbeitet diese Daten eigenständig als Verantwortlicher bzw. Auftragsverarbeiter.
                      Weitere Infos: <a href="https://stripe.com/at/privacy" target="_blank" className="text-blue-600 underline">Datenschutz bei Stripe</a>.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

               <AccordionItem value="item-5" className="px-6">
                <AccordionTrigger className="text-lg font-medium">5. Deine Rechte</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                   Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten,
                   deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
                   Sperrung oder Löschung dieser Daten. Wende dich dazu einfach an die im Impressum angegebene E-Mail-Adresse.
                   Außerdem hast du ein Beschwerderecht bei der österreichischen Datenschutzbehörde (DSB).
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}