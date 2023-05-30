import CreateURLForm from "@/components/CreateURLForm";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/lib/api/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
