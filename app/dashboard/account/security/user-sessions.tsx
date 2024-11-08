"use client"

import { useCallback, useEffect, useState } from "react"
import moment from "moment"
import { toast } from "sonner"
import { UAParser } from "ua-parser-js"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/spinner"

// import { Toaster } from "@/components/ui/toaster"
// import { useToast } from "@/components/ui/use-toast"

interface KeyValueMap {
  [key: string]: any
}

type UserSessionsProps = {
  user: KeyValueMap
  sessions?: KeyValueMap[]
  onFetch?: () => Promise<{ sessions?: KeyValueMap[]; status: number }>
  onDelete?: (sessionId: string) => Promise<{
    id?: string
    status: number
  }>
}

const onFetch1 = async () => {
  const response = await fetch("/api/sessions", {
    method: "GET",
  })
  const status = response.status
  const sessions = await response.json()
  return { status, sessions }
}

const onDelete1 = async (sessionId: string) => {
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}

export default function UserSessions({
  user,
  sessions,
  onFetch,
  onDelete,
}: UserSessionsProps) {
  //   const { toast } = useToast()
  const [currentSessions, setCurrentSessions] = useState<
    KeyValueMap[] | undefined
  >(sessions)
  const [fetching, setFetching] = useState(false)
  const [isRevokingSession, setIsRevokingSession] = useState<string | null>(
    null
  )

  const handleRevokeSession = (sessionId: string) => async () => {
    setIsRevokingSession(sessionId)
    const response = await onDelete1(sessionId)

    if (response.status !== 200) {
      setIsRevokingSession(null)

      return toast.error(
        "There was a problem removing the session. Try and later."
      )
      //   return toast({
      //     title: "Info",
      //     description:
      //       "There was a problem removing the session. Try again later.",
      //   })
    }

    const { id } = response

    setCurrentSessions((prev) => prev?.filter((session) => session.id !== id))

    setIsRevokingSession(null)
  }

  const handleFetchSessions = useCallback(
    async function handleFetchSessions() {
      setFetching(true)
      const response = await onFetch1()

      if (response.status !== 200) {
        return setFetching(false)
      }

      setCurrentSessions(response.sessions)
      setFetching(false)
    },
    [onFetch1]
  )

  useEffect(() => {
    ;(async () => {
      if (!sessions) {
        await handleFetchSessions()
      }
    })()
  }, [sessions])

  return (
    <>
      {/* <Toaster /> */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>View your active sessions.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-4 pt-0 md:p-6 md:pt-0">
          {fetching && (
            <div className="justify-left flex w-full items-center">
              <Spinner />
              <span className="text-sm text-muted-foreground">
                Retrieving your active sessions...
              </span>
            </div>
          )}

          {!currentSessions && !fetching && (
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label className="flex flex-col space-y-2">
                  <p className="max-w-fit font-normal leading-snug text-muted-foreground">
                    There was a problem listing all user sessions. Try again
                    later.
                  </p>
                </Label>
              </div>
            </div>
          )}

          {currentSessions &&
            currentSessions
              .sort(({ id }) => (id === user.sid ? -1 : 1))
              .map((session, idx) => {
                const { id } = session
                const lastUA = new UAParser(
                  session.device?.last_user_agent || "unknown"
                ).getResult()

                return (
                  <div
                    key={`session-${idx}-${id}`}
                    className="flex flex-col gap-6"
                  >
                    {idx > 0 && <Separator />}
                    <div
                      key={id}
                      className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-x-2 md:space-y-0"
                    >
                      <Label className="flex flex-col space-y-1">
                        <span className="leading-6">
                          {`Session on ${lastUA.browser.name} - ${lastUA.os.name} [${lastUA.os.version}]`}

                          {id === user.sid && (
                            <Badge
                              variant="default"
                              className="ml-3 h-fit bg-green-300 font-light text-black hover:bg-green-300"
                            >
                              Current
                            </Badge>
                          )}
                        </span>
                        <p className="max-w-fit font-normal leading-snug text-muted-foreground">
                          Last activity{" "}
                          <span
                            className="cursor-help underline decoration-dotted"
                            title={session.updated_at}
                          >
                            {moment(session.updated_at).fromNow()}
                          </span>{" "}
                          from location{" "}
                          <span
                            className="cursor-help underline decoration-dotted"
                            title={session.device?.last_ip}
                          >
                            {session.device?.last_ip}
                          </span>
                          .
                          <br />
                          First sign-in on{" "}
                          <span
                            className="cursor-help underline decoration-dotted"
                            title={session.created_at}
                          >
                            {moment(session.created_at).format(
                              "MMMM DD, YYYY \\a\\t HH:MM:SS"
                            )}
                          </span>
                          .
                        </p>
                      </Label>
                      <div className="flex items-center justify-end space-x-24 md:min-w-24">
                        <Button
                          className="h-fit min-w-24"
                          variant="outline"
                          onClick={handleRevokeSession(id)}
                          disabled={isRevokingSession === id}
                        >
                          {isRevokingSession === id && <Spinner />}
                          Sign out
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
        </CardContent>
      </Card>
    </>
  )
}
