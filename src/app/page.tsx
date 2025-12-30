"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { stackClientApp } from "@/stack/client";

export default function LandingPage() {
  const user = stackClientApp.useUser();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-none">
              <span className="font-mono text-lg">R</span>
            </div>
            RECHNEREI
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="rounded-none">Zum Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/handler/sign-in">
                  <Button variant="ghost" className="rounded-none hidden sm:inline-flex">Anmelden</Button>
                </Link>
                <Link href="/handler/sign-up">
                  <Button className="rounded-none">Kostenlos starten</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="py-24 lg:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center border px-3 py-1 text-sm font-mono text-muted-foreground bg-muted/30">
              <span className="w-2 h-2 bg-emerald-500 mr-2 animate-pulse"></span>
              v0.1.0 Jetzt Verfügbar
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Weniger Büro, <br />
              <span className="text-primary">Mehr Business.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Das All-in-One Finanz-Cockpit für Österreichs Kleinunternehmer.
              Erfasse Arbeitszeiten, verwalte Kunden und erstelle rechtssichere Rechnungen ohne Kopfzerbrechen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/handler/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-none w-full h-12 px-8 text-base">
                  Jetzt loslegen <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="rounded-none w-full h-12 px-8 text-base">
                  Funktionen ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border p-8 space-y-4 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Smarte Rechnungen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Erstelle Kleinunternehmer-konforme Rechnungen in Sekunden. Automatischer PDF-Export, bereit für Druck oder E-Mail.
              </p>
              <ul className="space-y-2 pt-4 text-sm text-muted-foreground">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-500" /> A4 PDF Export</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-500" /> Kundenverwaltung</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-500" /> Zahlungsstatus</li>
              </ul>
            </div>

            <div className="bg-background border p-8 space-y-4 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Zeiterfassung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Logge Stunden für jedes Projekt. Unterscheide nahtlos zwischen verrechenbaren Dienstleistungen und Produkten.
              </p>
              <ul className="space-y-2 pt-4 text-sm text-muted-foreground">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Projekt-basierter Timer</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Leistungskatalog</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Monatsübersicht</li>
              </ul>
            </div>

            <div className="bg-background border p-8 space-y-4 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Einfache Finanzen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Behalte deine Einnahmen-Ausgaben-Rechnung im Blick. Lade Belege hoch und kategorisiere Ausgaben sofort.
              </p>
              <ul className="space-y-2 pt-4 text-sm text-muted-foreground">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-amber-500" /> Beleg-Upload</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-amber-500" /> Gewinn & Verlust Ansicht</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-amber-500" /> Steuer-Vorbereitung</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Gebaut für Geschwindigkeit. Designt für Fokus.</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Kein Schnickschnack, keine runden Ecken, nur die Daten, die du brauchst, um dein Business zu führen.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto border bg-neutral-950 p-2 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500"></div>

            <div className="h-12 border-b flex items-center px-4 gap-4 bg-background">
              <div className="w-32 h-4 bg-muted animate-pulse"></div>
              <div className="ml-auto flex gap-2">
                <div className="w-8 h-8 border bg-muted/20"></div>
                <div className="w-8 h-8 border bg-muted/20"></div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 p-4 h-[400px]">
              <div className="hidden md:block col-span-1 border bg-muted/5 p-4 space-y-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-8 w-full bg-muted/20 border-l-2 border-transparent hover:border-primary hover:bg-muted/40 transition-all"></div>
                ))}
              </div>
              <div className="col-span-4 md:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 border bg-background p-4 space-y-2">
                    <div className="w-8 h-8 bg-emerald-500/20"></div>
                    <div className="w-16 h-4 bg-muted"></div>
                  </div>
                  <div className="h-24 border bg-background p-4 space-y-2">
                    <div className="w-8 h-8 bg-blue-500/20"></div>
                    <div className="w-16 h-4 bg-muted"></div>
                  </div>
                  <div className="h-24 border bg-background p-4 space-y-2">
                    <div className="w-8 h-8 bg-amber-500/20"></div>
                    <div className="w-16 h-4 bg-muted"></div>
                  </div>
                </div>
                <div className="h-64 border bg-background relative overflow-hidden flex items-center justify-center">
                  <span className="text-muted-foreground/20 font-mono text-4xl font-bold tracking-widest rotate-[-12deg]">
                    DEIN DASHBOARD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Bereit, dein Business zu organisieren?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/handler/sign-up">
              <Button size="lg" className="rounded-none h-12 px-8">
                Jetzt kostenlos starten
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Keine Kreditkarte erforderlich</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; 2025 RECHNEREI. Made in Austria <span className="text-red-500">♥</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Impressum</Link>
            <Link href="#" className="hover:text-foreground">Datenschutz</Link>
            <Link href="#" className="hover:text-foreground">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}