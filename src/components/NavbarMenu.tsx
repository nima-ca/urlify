import SignOutButton from "@/components/SignOutButton";
import { buttonVariants } from "@/ui/Button";
import { authOptions } from "@src/lib/api/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

const NavbarMenu = async () => {
  const session = await getServerSession(authOptions);

  return session ? (
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
