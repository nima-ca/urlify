"use client";

import SignOutButton from "@/components/SignOutButton";
import { buttonVariants } from "@/ui/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

const NavbarMenu: FC = () => {
  const { status } = useSession();
  return status === "authenticated" ? (
    <>
      <Link className={buttonVariants({ variant: "link" })} href="/dashboard">
        Dashboard
      </Link>
      <SignOutButton />
    </>
  ) : (
    <>
      <Link
        href="/auth/register"
        className={buttonVariants({ variant: "link" })}
      >
        Register
      </Link>
      <Link href="/auth/login" className={buttonVariants({ variant: "link" })}>
        Login
      </Link>
    </>
  );
};

export default NavbarMenu;
