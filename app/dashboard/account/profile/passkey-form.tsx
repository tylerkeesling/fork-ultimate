"use client"

import moment from "moment"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/submit-button"

import { revokePasskey } from "./actions"

export type Passkey = {
  id: string
  last_auth_at: string
  user_agent: string
  credential_device_type?: string
}

interface PasskeyProps {
  passkey?: Passkey
}

export function PasskeyForm({ passkey }: PasskeyProps) {
  return (
    <Card>
      <form
        action={async (formData: FormData) => {
          const { error } = await revokePasskey(formData)

          if (error) {
            toast.error(error)
          } else {
            toast.success("Your passkey has has been deleted.")
          }
        }}
      >
        <CardHeader>
          <CardTitle>Passkeys</CardTitle>
        </CardHeader>
        <CardContent>
          {!passkey && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label className="flex flex-col space-y-2">
                  <p className="max-w-fit font-normal leading-snug text-muted-foreground">
                    You currently do not have any registered passkeys.
                  </p>
                </Label>
              </div>
            </div>
          )}

          {passkey && (
            <div className="flex w-full justify-between">
              <Label className="flex flex-col space-y-1">
                <span className="leading-6">{passkey?.id}</span>
                <p className="max-w-fit font-normal leading-snug text-muted-foreground">
                  <span>{passkey?.user_agent}</span>
                </p>
              </Label>
              <Label>
                <span>
                  {moment(passkey?.last_auth_at).format(
                    "MMMM DD, YYYY \\a\\t HH:MM:SS"
                  )}
                </span>
              </Label>
              <Label>
                <Badge
                  variant="default"
                  className="ml-3 h-fit bg-slate-400 font-light text-black"
                >
                  {passkey?.credential_device_type == "single_device"
                    ? "DEVICE BOUND"
                    : "Other"}
                </Badge>
              </Label>
              <input
                type="hidden"
                id="authentication_method_id"
                name="authentication_method_id"
                value={passkey?.id}
              />
            </div>
          )}
        </CardContent>
        {passkey && (
          <CardFooter className="flex justify-end">
            <SubmitButton variant="destructive">Revoke</SubmitButton>
          </CardFooter>
        )}
      </form>
    </Card>
  )
}

{
  /* <Label className="flex flex-col space-y-1">
Name
{passkey.id}

</Label>
<Badge
variant="default"
className="ml-3 h-fit bg-green-300 font-light text-black hover:bg-green-300"
>
Current
</Badge> */
}
