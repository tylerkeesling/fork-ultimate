import { ArrowRightIcon } from "lucide-react"

import { appClient } from "@/lib/auth0"

import { SubmitButton } from "./submit-button"

export default async function Navbar() {
  const session = await appClient.getSession()
  return (
    <header
      className={`bg-background" fixed left-4 right-4 top-4 z-50 mx-auto max-w-5xl rounded-lg border border-border transition-all duration-300`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">uphold</h1>
        </div>
        <nav>
          <ul className="flex space-x-2">
            {session ? (
              <li>
                <a href="/api/auth/logout">
                  <SubmitButton className="text-xl" variant="ghost">
                    Logout
                  </SubmitButton>
                </a>
              </li>
            ) : (
              <>
                <li>
                  <a href="/api/auth/login">
                    <SubmitButton className="text-xl" variant="ghost">
                      Login
                    </SubmitButton>
                  </a>
                </li>
                <li>
                  <div className="md:right-8 md:top-8">
                    <a className="" href="/api/auth/login?screen_hint=signup">
                      <SubmitButton className="text-lg">
                        Get Started <ArrowRightIcon className="ml-1.5 size-5" />
                      </SubmitButton>
                    </a>
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
