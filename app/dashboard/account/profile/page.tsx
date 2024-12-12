import { appClient, managementClient } from "@/lib/auth0"
import { PageHeader } from "@/components/page-header"

import { DeleteAccountForm } from "./delete-account-form"
import { DisplayNameForm } from "./display-name-form"
import { PasskeyForm } from "./passkey-form"

export default appClient.withPageAuthRequired(
  async function Profile() {
    const session = await appClient.getSession()
    const userId = session?.user.sub

    const { data: enrollments } =
      await managementClient.users.getAuthenticationMethods({ id: userId })

    const passkey: any = enrollments.find((enrollment: any) => {
      return enrollment.type.includes("passkey")
    })

    return (
      <div className="space-y-2">
        <PageHeader
          title="Profile"
          description="Manage your personal information."
        />

        <DisplayNameForm displayName={session?.user.name} />
        <PasskeyForm passkey={passkey} />
        <DeleteAccountForm />
      </div>
    )
  },
  { returnTo: "/dashboard/account/profile" }
)
