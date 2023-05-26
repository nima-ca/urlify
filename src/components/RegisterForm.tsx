"use client";

import { formikErrorHandler } from "@src/lib/utils/formikErrorHandler";
import { FormikProps, useFormik } from "formik";
import { FC, FormEvent, useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import OAuth from "./OAuth";
import { signUpSchema } from "@src/lib/utils/validationSchema";
import { registerWithCredentials } from "@src/lib/api/v1/auth/register";
import { useRouter } from "next/navigation";
import { toast } from "./ui/Toast";
import { IApiError } from "@src/types/api/api";
import { AxiosError } from "axios";

export interface IRegisterFormikProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: IRegisterFormikProps = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik: FormikProps<IRegisterFormikProps> = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    async onSubmit(values) {
      setIsLoading(true);
      try {
        const res = await registerWithCredentials({
          ...values,
        });

        if (res.success) {
          router.push("/auth/login");
          toast({
            message: "Your account has been created successfully",
            title: "Register successful",
            type: "success",
          });
        }
      } catch (error) {
        const _error = error as AxiosError;
        const apiError = _error.response?.data as IApiError;
        if (apiError.error) {
          const message = apiError.error.message;
          toast({
            message: typeof message === "string" ? message : message[0],
            title: "Register failed",
            type: "error",
          });
          return;
        }

        toast({
          message: "Something went wrong",
          title: "Register failed",
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

    if (formik.values.password !== formik.values.confirmPassword) {
      formik.setFieldError(
        "password",
        "Password and Confirm Password are not the same"
      );
      formik.setFieldTouched("password", true);
      formik.setFieldError(
        "confirmPassword",
        "Password and Confirm Password are not the same"
      );
      formik.setFieldTouched("confirmPassword", true);
      return;
    }

    formik.handleSubmit();
  };

  useEffect(() => {
    formik.setTouched({});
  }, []);

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex flex-col gap-3 w-3/4 md:w-2/4 lg:w-1/4 "
    >
      <LargeHeading className="text-center lg:text-5xl lg:text-center">
        Welcome to Urlify
      </LargeHeading>
      <Paragraph>Create your account here 🧑‍🚀</Paragraph>
      <Input
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Name"
        error={Boolean(formik.errors.name && formik.touched.name)}
      />
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
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Password"
        error={Boolean(formik.errors.password && formik.touched.password)}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Confirm Password"
        error={Boolean(
          formik.errors.confirmPassword && formik.touched.confirmPassword
        )}
      />
      <Button isLoading={isLoading} type="submit">
        Register
      </Button>
      <div className="w-full h-0.5 bg-slate-400"></div>
      <OAuth />
    </form>
  );
};

export default RegisterForm;
