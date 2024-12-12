import Image from "next/image"
import Placeholder from "@/public/mock.png"

import { Container, Section } from "@/components/craft"

export default function Hero() {
  return (
    <Section className="mt-10">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="!mb-0 text-[56px] leading-[62px] text-primary">
            Discover
          </h1>
          <h3 className="text-[56px] leading-[62px]">Crypto Better</h3>
          <div className="my-8 rounded-lg">
            <Image
              className="not-prose h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
