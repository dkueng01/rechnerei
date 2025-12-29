import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import { SuspendedAppSidebar } from "@/components/suspended-app-sidebar";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RECHNEREI",
  description: "Servus to simple finances. Manage your customers, track your hustle, and create Austrian-compliant invoices in seconds. Your business, simply calculated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <StackProvider app={stackClientApp}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <StackTheme>
            <SidebarProvider>
              <Suspense fallback={<SuspendedAppSidebar />}>
                <AppSidebar />
              </Suspense>
              <main className="w-full">
                {children}
              </main>
            </SidebarProvider>
          </StackTheme>
        </body>
      </StackProvider>
    </html>
  );
}
