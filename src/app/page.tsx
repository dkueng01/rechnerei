"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()

  return <div className="flex flex-col items-center justify-center h-screen">
    <h1>RECHNEREI</h1>
    <Button onClick={() => router.push("/dashboard")}>Sign In</Button>
  </div>;
}