import ThemeToggle from "@/components/ThemeToggle";
import LargeHeading from "@/ui/LargeHeading";
import { LinkIcon } from "@/ui/icons/Link";
import Link from "next/link";

import MobileNavbar from "@/components/MobileNavbar";
import NavbarMenu from "@/components/NavbarMenu";

const Navbar = async () => {
  return (
    <nav className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-40 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex justify-center items-center">
          <LinkIcon className="mr-4 h-10 w-10 text-slate-900 dark:text-slate-300" />
          <LargeHeading
            size="sm"
            className="text-slate-900 dark:text-slate-300"
          >
            Urlify
          </LargeHeading>
        </Link>

        <div className="flex justify-between items-center gap-5">
          <ThemeToggle />
          <div className="hidden md:flex justify-between items-center gap-5">
            {/* @ts-expect-error server components */}
            <NavbarMenu />
          </div>
          <MobileNavbar>
            <div className="md:hidden mt-4 flex flex-col justify-between items-center gap-2">
              {/* @ts-expect-error server components */}
              <NavbarMenu />
            </div>
          </MobileNavbar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
