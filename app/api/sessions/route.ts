import { NextResponse } from "next/server"

import { appClient, managementClient } from "@/lib/auth0"
import { withRateLimit } from "@/lib/rate-limit"

/**
 * @example export const GET = handleUserSessionsFetch();
 */
export const GET = withRateLimit(
  appClient.withApiAuthRequired(async (): Promise<NextResponse> => {
    try {
      const session = await appClient.getSession()
      const user_id = session?.user.sub
      const response = await managementClient.users.getSessions({
        user_id,
      })
      const { data } = response

      return NextResponse.json(data.sessions || [], {
        status: response.status,
      })
    } catch (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Error fetching user metadata" },
        { status: 500 }
      )
    }
  })
)
