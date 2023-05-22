"use client";

import Button from "@/ui/Button";
import { Input } from "@/ui/Input";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@src/lib/api/constants";
import { formikErrorHandler } from "@src/lib/utils/formikErrorHandler";
import { FormikProps, useFormik } from "formik";
import { signIn } from "next-auth/react";
import { FC, FormEvent, useState } from "react";
import * as yup from "yup";
import OAuth from "@/components/OAuth";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import { toast } from "@/ui/Toast";
import { useRouter } from "next/navigation";

export interface ILoginFormikProps {
  email: string;
  password: string;
}

const initialValues: ILoginFormikProps = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),

  password: yup
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Your password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `Your password must be less than ${PASSWORD_MAX_LENGTH} characters`
    )
    .required("Please enter your password"),
});

const LoginForm: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik: FormikProps<ILoginFormikProps> = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      setIsLoading(true);
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (res?.ok) {
          router.push("/dashboard");
          toast({
            message: "You logged in successfully!",
            title: "Login successful",
            type: "success",
          });
        }

        if (!res?.ok) {
          toast({
            message: "Email or Password incorrect",
            title: "Login failed",
            type: "error",
          });
        }
      } catch (error) {
        toast({
          message: "Something went wrong",
          title: "Login failed",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = formikErrorHandler(formik);
    if (hasError) return;

    formik.handleSubmit();
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex flex-col gap-3 w-3/4 md:w-2/4 lg:w-1/4 "
    >
      <LargeHeading className="text-center">Welcome Back</LargeHeading>
      <Paragraph>Sign In to your account 🚀</Paragraph>
      <Input
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Email"
        error={Boolean(formik.errors.email && formik.touched.email)}
      />
      <Input
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Password"
        error={Boolean(formik.errors.password && formik.touched.password)}
      />
      <Button isLoading={isLoading} type="submit">
        login
      </Button>
      <div className="w-full h-0.5 bg-slate-400"></div>
      <OAuth />
    </form>
  );
};

export default LoginForm;
