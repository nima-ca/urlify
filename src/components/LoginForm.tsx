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
import LargeHeading from "./ui/LargeHeading";
import { toast } from "./ui/Toast";
import { GithubIcon } from "./ui/icons/Github";
import { GoogleIcon } from "./ui/icons/Google";

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
  const formik: FormikProps<ILoginFormikProps> = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      //   signIn("credentials", {
      //     email: values.email,
      //     password: values.password,
      //   });
    },
  });

  const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState<boolean>(false);
  const [isGithubLoggingIn, setIsGithubLoggingIn] = useState<boolean>(false);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = formikErrorHandler(formik);
    if (hasError) return;

    formik.handleSubmit();
  };

  const toggleLoadingState = (
    provider: "google" | "github",
    state: boolean
  ) => {
    if (provider === "google") setIsGoogleLoggingIn(state);
    if (provider === "github") setIsGithubLoggingIn(state);
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    toggleLoadingState(provider, true);
    try {
      await signIn(provider);
    } catch (error) {
      toast({
        title: "Login failed",
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex flex-col gap-3 w-3/4 md:w-2/4 lg:w-1/4 "
    >
      <LargeHeading>Welcome Back</LargeHeading>
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
      <Button type="submit">login</Button>
      <div className="flex justify-between items-center gap-2">
        <Button
          type="submit"
          className="w-full"
          isLoading={isGoogleLoggingIn}
          disabled={isGithubLoggingIn || isGoogleLoggingIn}
          onClick={() => handleOAuthLogin("google")}
        >
          <GoogleIcon className="h-5 w-5 mr-2" />
          Google
        </Button>
        <Button
          type="submit"
          className="w-full"
          isLoading={isGithubLoggingIn}
          disabled={isGithubLoggingIn || isGoogleLoggingIn}
          onClick={() => handleOAuthLogin("github")}
        >
          <GithubIcon className="h-5 w-5 mr-2" />
          Github
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
