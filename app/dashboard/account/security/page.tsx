import { appClient, managementClient } from "@/lib/auth0"
import { SUPPORTED_PROVIDERS } from "@/lib/mfa-policy"
import { PageHeader } from "@/components/page-header"

import { MFAEnrollmentForm } from "./mfa-enrollment-form"
import UserSessions from "./user-sessions"

export default appClient.withPageAuthRequired(
  async function Profile() {
    const session = await appClient.getSession()
    const userId = session?.user.sub

    const [factorsResponse, enrollmentsResponse, sessionsResponse] =
      await Promise.all([
        managementClient.guardian.getFactors(),
        managementClient.users.getAuthenticationMethods({ id: userId }),
        managementClient.users.getSessions({ user_id: userId }),
      ])

    const factors = factorsResponse.data
    const enrollments = enrollmentsResponse.data
    const sessions = sessionsResponse.data.sessions

    const filteredFactors = factors
      .filter((factor: any) => {
        let factorName: string = factor.name

        return SUPPORTED_PROVIDERS.includes(factorName) && factor.enabled
      })
      .map((factor: any) => {
        const enrollmentInfo = enrollments.find((enrollment: any) => {
          let factorName: string = factor.name

          if (factor.name === "sms" || factor.name === "voice") {
            factorName = "phone"
          }

          return enrollment.type.includes(factorName)
        })

        return {
          ...factor,
          enrollmentId: enrollmentInfo?.id,
        }
      })

    return (
      <div className="space-y-2">
        <PageHeader
          title="Security"
          description="Manage your account's security settings."
        />

        <MFAEnrollmentForm factors={filteredFactors} />
        <UserSessions user={session!.user} sessions={sessions} />
      </div>
    )
  },
  { returnTo: "/dashboard/account/security" }
)
