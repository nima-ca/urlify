import RegisterForm from "@src/components/RegisterForm";
import { FC } from "react";

const RegisterPage: FC = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
