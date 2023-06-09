import LoginForm from "@src/components/LoginForm";
import { authOptions } from "@src/lib/api/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Urlify",
  description: "An Open Source app to shorten URLs | Login",
};

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  // do not allow logged in users to access this page
  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
