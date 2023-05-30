import LargeHeading from "@src/components/ui/LargeHeading";
import { getUrl } from "@src/lib/api/v1/url/getUrl";
import { IGetUrlResponse } from "@src/types/api/v1/url/getUrl";
import { Metadata } from "next";
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
    console.log(url);
  } catch (error) {}

  if (url) {
    redirect(url.userUrl ?? "/");
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <LargeHeading>Ops!, The URL not found!</LargeHeading>
    </section>
  );
};

export default URLPage;
