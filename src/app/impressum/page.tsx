import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-slate-900">Impressum</CardTitle>
            <CardDescription className="text-slate-500 text-lg">
              Informationspflicht laut § 5 E-Commerce Gesetz, § 14 Unternehmensgesetzbuch, § 63 Gewerbeordnung und Offenlegungspflicht laut § 25 Mediengesetz.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">

            <section>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Medieninhaber & Herausgeber</h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-2 text-slate-700">
                <p className="font-medium text-slate-900">
                    [Dein Firmenname / Dein Vor- & Nachname]
                </p>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-slate-400" />
                  <span>
                    Musterstraße 1<br />
                    1010 Wien, Österreich
                  </span>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Kontaktdaten</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a href="mailto:office@rechnerei.at" className="hover:underline">office@rechnerei.at</a>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <a href="tel:+43123456789" className="hover:underline">+43 123 456 789</a>
                </div>
                <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <a href="https://rechnerei.at" className="hover:underline">www.rechnerei.at</a>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Unternehmensdaten</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">

                <div className="sm:col-span-1">
                  <dt className="font-medium text-slate-500">UID-Nummer</dt>
                  <dd className="text-slate-900 mt-1">[ATU12345678]</dd>
                </div>

                 <div className="sm:col-span-1">
                  <dt className="font-medium text-slate-500">Rechtsform</dt>
                  <dd className="text-slate-900 mt-1">[z.B. Einzelunternehmer / GmbH]</dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="font-medium text-slate-500">Unternehmensgegenstand</dt>
                  <dd className="text-slate-900 mt-1">Entwicklung und Vertrieb von Softwarelösungen (SaaS).</dd>
                </div>
              </dl>
            </section>

            <Separator />

            <section className="text-sm text-slate-600 space-y-4">
               <div>
                  <h4 className="font-semibold text-slate-900">Mitgliedschaften</h4>
                  <p>Mitglied der WKÖ, [Wirtschaftskammer Wien], [Fachgruppe Unternehmensberatung, Buchhaltung und Informationstechnologie]</p>
               </div>

               <div>
                  <h4 className="font-semibold text-slate-900">Anwendbare Rechtsvorschriften</h4>
                  <p>Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ris.bka.gv.at</a></p>
               </div>

               <div>
                  <h4 className="font-semibold text-slate-900">Aufsichtsbehörde/Gewerbebehörde</h4>
                  <p>[Magistratisches Bezirksamt des ... Bezirkes / Bezirkshauptmannschaft ...]</p>
               </div>
            </section>

            <Separator />

            <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Online-Streitbeilegung</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten: 
                    <a href="http://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">http://ec.europa.eu/odr</a>.
                    <br />
                    Sie können allfällige Beschwerde auch an die oben angegebene E-Mail-Adresse richten.
                </p>
            </section>

            <div className="bg-slate-50 p-5 rounded-lg text-xs text-slate-500 leading-relaxed border border-slate-100">
                <p className="mb-2">
                    <strong className="text-slate-700">Haftung für Inhalte dieser Webseite:</strong> Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns, korrekte und aktuelle Informationen bereitzustellen. Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Webseite übernehmen, speziell für jene, die seitens Dritter bereitgestellt wurden.
                </p>
                <p className="mb-2">
                    <strong className="text-slate-700">Haftung für Links auf dieser Webseite:</strong> Unsere Webseite enthält Links zu anderen Webseiten, für deren Inhalt wir nicht verantwortlich sind. Haftung für verlinkte Websites besteht laut § 17 ECG für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind und wir Links sofort entfernen würden, wenn uns Rechtswidrigkeiten bekannt werden.
                </p>
                <p>
                    <strong className="text-slate-700">Urheberrechtshinweis:</strong> Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht.
                </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}