import Providers from "@/components/Provider";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { cn } from "@/lib/utils/cn";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

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

          <ToastContainer position="bottom-center" />
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
