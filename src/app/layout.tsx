import Providers from "@/components/Provider";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { cn } from "@src/lib/utils/cn";
import "@/styles/globals.css";

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
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <ToastContainer position="bottom-center" />
      </body>
    </html>
  );
}
