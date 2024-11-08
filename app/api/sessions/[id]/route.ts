import { NextResponse } from "next/server"

import { appClient, managementClient } from "@/lib/auth0"
import { withRateLimit } from "@/lib/rate-limit"

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
