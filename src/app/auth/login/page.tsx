import LoginForm from "@src/components/LoginForm";
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
