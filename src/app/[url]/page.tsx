import { buttonVariants } from "@src/components/ui/Button";
import LargeHeading from "@src/components/ui/LargeHeading";
import { ChevronLeftIcon } from "@src/components/ui/icons/ChevronLeft";
import { getUrl } from "@src/lib/api/v1/url/getUrl";
import { IGetUrlResponse } from "@src/types/api/v1/url/getUrl";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Urlify",
  description: "An Open Source app to shorten URLs | Url Not Found!",
};

export interface IUrlPageProps {
  params: { url: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const URLPage = async ({ params }: IUrlPageProps) => {
  let url: IGetUrlResponse | undefined = undefined;
  try {
    url = await getUrl(params.url ?? "");
  } catch (error) {}

  if (url?.success) {
    redirect(url.userUrl ?? "/");
  }

  return (
    <section className="flex justify-center items-center h-screen flex-col gap-6">
      <Link
        className={buttonVariants({ variant: "ghost", className: "w-fit" })}
        href="/"
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        Back to home
      </Link>
      <LargeHeading className="text-center">
        Ops, The URL is not found!
      </LargeHeading>
    </section>
  );
};

export default URLPage;
