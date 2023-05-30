"use client";

import UrlCard from "@/components/UrlCard";
import { addDomain } from "@/lib/utils/addDomain";
import { createUrlSchema } from "@/lib/utils/validationSchema";
import Button from "@/ui/Button";
import { Input } from "@/ui/Input";
import { toast } from "@/ui/Toast";
import { createUrl } from "@src/lib/api/v1/url/createUrl";
import { formikErrorHandler } from "@src/lib/utils/formikErrorHandler";
import { useFormik } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface ICreateUrlFormikProps {
  userUrl: string;
}

const CreateURLForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdLinks, setCreatedLinks] = useState<string[]>([]);

  const formik = useFormik<ICreateUrlFormikProps>({
    initialValues: {
      userUrl: "",
    },
    validationSchema: createUrlSchema,
    async onSubmit(values) {
      try {
        setIsLoading(true);
        const res = await createUrl(values.userUrl);
        if (res.success) {
          setCreatedLinks((prevLinks) => [...prevLinks, res.link ?? ""]);
          toast({
            message: "Url created successfully",
            title: "URL",
            type: "success",
          });
        }

        if (!res.success && res.error) {
          const errorMessage = res.error.message;
          toast({
            message:
              typeof errorMessage === "string" ? errorMessage : errorMessage[0],
            title: "URL",
            type: "error",
          });
          return;
        }
      } catch (error) {
        toast({
          message: "Something went wrong",
          title: "URL",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setTouched({});
  }, []);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = formikErrorHandler(formik);
    if (hasError) return;

    formik.handleSubmit();
  };

  return (
    <div className="relative">
      <form
        className="flex justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          id="userUrl"
          name="userUrl"
          value={formik.values.userUrl}
          onChange={formik.handleChange}
          placeholder="Enter your Link"
          error={Boolean(formik.errors.userUrl && formik.touched.userUrl)}
        />
        <Button type="submit" isLoading={isLoading} className="">
          Create
        </Button>
      </form>

      <div className="flex flex-col absolute w-full mt-3 gap-2 ">
        {createdLinks.map((link, index) => (
          <UrlCard key={`link-${index}`} link={addDomain(link)} />
        ))}
      </div>
    </div>
  );
};

export default CreateURLForm;
