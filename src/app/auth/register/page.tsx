import RegisterForm from "@src/components/RegisterForm";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Urlify",
  description: "An Open Source app to shorten URLs | Register",
};

const RegisterPage: FC = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
