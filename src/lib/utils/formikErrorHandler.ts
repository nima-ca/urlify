import { toast } from "@/ui/Toast";
import { FormikProps } from "formik";

export const formikErrorHandler = <T>(formik: FormikProps<T>): boolean => {
  let hasError = false;
  for (const key in formik.errors) {
    if (Object.prototype.hasOwnProperty.call(formik.errors, key)) {
      const error = formik.errors[key as keyof object];
      if (error) {
        formik.setFieldTouched(key, true);
        toast({ message: error, type: "error", title: "Wrong Input" });
        hasError = true;
      }
    }
  }

  return hasError;
};
