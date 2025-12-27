"use client"

import { Button } from "@/src/components/ui/button";
import { stackClientApp } from "@/src/stack/client";

export default function Dashboard() {
  const user = stackClientApp.useUser({ or: 'redirect' })

  return <div className="flex flex-col items-center justify-center h-screen">
    <h1>Dashboard</h1>
    <p>{user.displayName}</p>
    <Button onClick={() => stackClientApp.signOut()}>Sign Out</Button>
  </div>;
}