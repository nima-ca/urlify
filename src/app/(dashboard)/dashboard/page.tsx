import CreateURLForm from "@/components/CreateURLForm";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/lib/api/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Urlify",
  description: "An Open Source app to shorten URLs | Dashboard",
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-7 px-4">
        <LargeHeading>Here you can make your links shorter!</LargeHeading>
        <CreateURLForm />
      </div>
    </section>
  );
};

export default DashboardPage;
