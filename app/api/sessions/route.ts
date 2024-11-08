import { NextResponse } from "next/server"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

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

/**
 * @example export const DELETE = handleDeleteUserSession();
 */
export const DELETE = withRateLimit(
  appClient.withApiAuthRequired(
    async (request: Request, { params }: any): Promise<NextResponse> => {
      try {
        const { id }: { id: string } = params

        await managementClient.sessions.delete({
          id,
        })

        return NextResponse.json(
          { id },
          {
            status: 200,
          }
        )
      } catch (error) {
        console.error(error)
        return NextResponse.json(
          { error: "Error deleting user session" },
          { status: 500 }
        )
      }
    }
  )
)
