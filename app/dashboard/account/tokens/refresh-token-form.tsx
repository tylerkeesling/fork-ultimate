"use client"

import { toast } from "sonner"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SubmitButton } from "@/components/submit-button"

import { refreshTokens } from "./actions"

export function RefreshTokenForm() {
  return (
    <Card>
      <form
        action={async () => {
          const { error } = await refreshTokens()

          if (error) {
            toast.error(error)
          } else {
            toast.success("Your tokens have been refreshed.")
          }
        }}
      >
        <CardHeader>
          <CardTitle>Refresh Token</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <SubmitButton variant="default">Refresh Token</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
