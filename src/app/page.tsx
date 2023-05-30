import LargeHeading from "@src/components/ui/LargeHeading";
import Paragraph from "@src/components/ui/Paragraph";
import Image from "next/image";
import backgroundImg from "@images/main-bg.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row justify-center items-center h-screen p-3">
      <Image
        className="max-h-96 "
        src={backgroundImg}
        alt="saves time working with our application"
        priority
      />
      <div className="lg:-ml-32">
        <LargeHeading className="text-center text-2xl sm:text-3xl lg:text-5xl">
          Shorten your links in a blink!
        </LargeHeading>
        <Paragraph className="text-center lg:text-left">
          Urlify is a platform to shorten your links for free,{" "}
          <Link
            className="underline text-black dark:text-white"
            href="/dashboard"
          >
            try it out!
          </Link>
        </Paragraph>
      </div>
    </main>
  );
}
