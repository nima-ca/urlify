import Navbar from "@/components/Navbar";
import Providers from "@/components/Provider";
import { cn } from "@/lib/utils/cn";
import "@/styles/globals.css";
import { Toaster } from "@/ui/Toast";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Urlify",
  description: "An Open Source app to shorten URLs | Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {children}
          <Toaster position="bottom-right" />
          {/* @ts-expect-error Server components */}
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
