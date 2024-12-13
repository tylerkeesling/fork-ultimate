"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { SubmitButton } from "@/components/submit-button"

import { toggleMfa } from "./actions"

type ToggleMfaProps = {
  enforceMfa?: boolean
}

export function ToggleMfaForm({ enforceMfa = false }: ToggleMfaProps) {
  const [isEnabled, setIsEnabled] = useState(enforceMfa)

  return (
    <form className="" action={toggleMfa}>
      <Label className="mr-2" htmlFor="toggle-mfa">
        Enable MFA?
      </Label>
      <Switch
        className="mr-2"
        id="toggle-mfa"
        checked={isEnabled}
        onCheckedChange={(checked) => setIsEnabled(checked)}
      />
      <input type="hidden" name="toggle-mfa" value={isEnabled.toString()} />
      <SubmitButton>Save</SubmitButton>
    </form>
  )
}
