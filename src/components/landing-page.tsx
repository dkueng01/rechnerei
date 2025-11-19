import Image from "next/image";
import { Button } from "./ui/button";
import { stackClientApp } from "@/stack/client";

export function LandingPage() {
  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <nav className="fixed w-full z-50 glass-panel border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Image
                src="/logo.png"
                alt="Rechnerei Logo"
                width={48}
                height={48}
                className="h-12 w-auto drop-shadow-sm"
              />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                RECHNEREI
              </span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition">
                Funktionen
              </a>
              <a href="#compliance" className="hover:text-blue-600 transition">
                Rechtssicherheit
              </a>
              <a href="#pricing" className="hover:text-blue-600 transition">
                Preise
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2" onClick={() => stackClientApp.redirectToSignIn()}>
                Login
              </Button>
              <Button className="px-5 py-2.5 transition shadow-lg shadow-slate-900/20" onClick={() => stackClientApp.redirectToSignUp()}>
                Kostenlos testen
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 hero-glow z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 border border-blue-100">
              Made for Austria 🇦🇹
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Rechnungen schreiben.
              <br />
              <span className="text-gradient">Rechtssicher & Einfach.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Die All-in-One Lösung für österreichische KMUs. Von Zeiterfassung
              bis zur Finanzamts-konformen Rechnung für jede Unternehmensform.
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl mt-12">
            <div className="relative rounded-2xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-3xl lg:p-4">
              <Image
                src="/dashboard.png"
                alt="Rechnerei Dashboard UI"
                width={1200}
                height={800}
                className="rounded-xl shadow-2xl ring-1 ring-slate-900/10 w-full h-auto bg-white"
              />
            </div>
          </div>
        </div>
      </header>

      <section id="compliance" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Für jede Rechtsform in Österreich. Garantiert.
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Schluss mit der Unsicherheit. RECHNEREI passt sich automatisch
                deiner Unternehmensform an und sorgt dafür, dass alle
                gesetzlichen Pflichtangaben auf deiner Rechnung stehen.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">
                      Kleinunternehmerregelung
                    </h4>
                    <p className="text-slate-500">
                      Automatische Hinweise zur Steuerbefreiung.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">
                      GmbH & KG
                    </h4>
                    <p className="text-slate-500">
                      UID, Firmenbuchnummer und Handelsgericht korrekt
                      platziert.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">
                      EPU / Neue Selbstständige
                    </h4>
                    <p className="text-slate-500">
                      Einfache Vorlagen für den schnellen Start.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-yellow-100 to-blue-100 rounded-full opacity-50 blur-3xl"></div>
              <div className="relative bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                  <div className="font-mono text-sm text-slate-400">
                    RECHNUNG-2025-001
                  </div>
                  <div className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded uppercase">
                    Konform
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-32 bg-slate-100 rounded w-full mt-6 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm">
                    Automatische Prüfung auf Pflichtangaben (§ 11 UStG)
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className="h-8 bg-slate-800 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Mehr als nur Rechnungen
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Das Betriebssystem für deinen Unternehmenserfolg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Zeiterfassung
              </h3>
              <p className="text-slate-600">
                Erfasse deine Arbeitszeit direkt auf Projekte und wandle sie mit
                einem Klick in eine Rechnung um.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 text-yellow-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kundenmanagement (CRM)
              </h3>
              <p className="text-slate-600">
                Alle Kontaktdaten, vergangene Rechnungen und offene Angebote an
                einem zentralen Ort.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Angebote schreiben
              </h3>
              <p className="text-slate-600">
                Erstelle professionelle Angebote. Wird das Angebot angenommen,
                wird daraus automatisch eine Rechnung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-blue-50 to-yellow-50 rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Schluss mit monatlichen Abos
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Wir glauben an Fairness. Einmal zahlen, für immer nutzen. Teste
              RECHNEREI 14 Tage lang völlig risikofrei, bevor du dich
              entscheidest.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl ring-1 ring-slate-200 overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-bold text-xs uppercase tracking-wide mb-6 w-fit">
                  Early Bird Angebot
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Lifetime Lizenz
                </h3>
                <p className="text-slate-500 mb-6">
                  Hol dir den vollen Funktionsumfang. Inklusive aller
                  zukünftigen Updates und Premium-Features.
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900">
                    €149
                  </span>
                  <span className="text-lg text-slate-400 line-through">
                    €299
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-8">
                  Einmalzahlung zzgl. USt.
                </p>

                <button
                  className="block w-full bg-primary text-white text-center cursor-pointer font-bold py-4 rounded-xl hover:bg-primary/90 transition shadow-lg"
                  onClick={() => stackClientApp.redirectToSignUp()}
                >
                  Jetzt 14 Tage gratis testen
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Keine Kreditkarte für den Test nötig.
                </p>
              </div>

              <div className="bg-slate-50 p-8 md:p-12 flex-1 border-t md:border-t-0 md:border-l border-slate-100">
                <h4 className="font-bold text-slate-900 mb-6">
                  Alles inklusive:
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-slate-600">
                      Unbegrenzte Rechnungen & Angebote
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-slate-600">
                      Kundenverwaltung (CRM)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-slate-600">
                      Zeiterfassung integriert
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-slate-600">
                      Export für den Steuerberater
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-slate-600">
                      Österreich-konform (RKSV ready)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-slate-600">
                      Kostenlose Updates für immer
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-slate-500">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              Sichere Zahlung via Stripe • Rechnung mit ausgewiesener USt.
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 px-8 py-16 text-center md:px-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Bereit für weniger Bürokratie?
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                Starte noch heute und erstelle deine erste rechtssichere
                Rechnung in unter 2 Minuten. Keine Kreditkarte erforderlich.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  className="bg-white text-slate-900 font-bold py-4 px-8 cursor-pointer rounded-xl hover:bg-accent"
                  onClick={() => stackClientApp.redirectToSignUp()}
                >
                  Jetzt kostenlos registrieren
                </button>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                14 Tage kostenlos testen • Jederzeit kündbar
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="font-bold text-lg text-slate-900">
                  RECHNEREI
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Einfache, rechtssichere Buchhaltung für Österreichs Unternehmer.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Funktionen
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Preise
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Impressum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    AGB
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>support@rechnerei.at</li>
                <li>Vorarlberg, Österreich</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
            &copy; 2025 RECHNEREI. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
