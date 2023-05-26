export const addDomain = (link: string): string => {
  const domain = process.env.NEXT_PUBLIC_APP_BASE_URL as string;
  const domainWithoutProtocol = domain.replace(/^https?:\/\//, "");

  return `${domainWithoutProtocol}/${link}`;
};
