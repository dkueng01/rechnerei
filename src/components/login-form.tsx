"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "./ui/input"
import Image from "next/image"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("email"))
      }}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image src="/logo.png" alt="RECHNEREI" width={24} height={24} />
              </div>
              <span className="sr-only">RECHNEREI</span>
            </a>
            <h1 className="text-xl font-bold">Willkommen bei RECHNEREI</h1>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
              Continue with Github
            </Button>
            <Button variant="outline" type="button">
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        Mit deiner Registrierung akzeptierst du unsere <a href="/agb">AGB</a> und die <a href="/datenschutz">Datenschutzerklärung</a>.
      </FieldDescription>
    </div>
  )
}
