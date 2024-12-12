import Link from "next/link"
import { UserProvider } from "@auth0/nextjs-auth0/client"

import { appClient } from "@/lib/auth0"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Auth0Logo } from "@/components/auth0-logo"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import { SubmitButton } from "@/components/submit-button"

import { SignUpForm } from "./signup-form"
import { WelcomeBackCard } from "./welcome-back-card"

export default async function Home() {
  const session = await appClient.getSession()

  return (
    <UserProvider>
      <div className="container relative h-screen lg:px-0">
        <Navbar />
        {/* {session ? (
        <a
          href="/api/auth/logout"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          <SubmitButton>Logout</SubmitButton>
        </a>
      ) : (
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <span className="text-sm">Already joined?</span>{" "}
          <a className="text-sm underline" href="/api/auth/login">
            <SubmitButton>Log in</SubmitButton>
          </a>
        </div>
      )} */}
        {/* <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgba(26,87,182,0.5)] via-[rgba(26,87,182,0)] to-transparent"
          style={{
            clipPath: "inset(0 50% 0 0)",
            transform: "translateX(-25%)",
          }}
        ></div> */}
        <Hero />
      </div>
    </UserProvider>
  )
}
