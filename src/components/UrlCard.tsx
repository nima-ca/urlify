import { FC } from "react";
import { QRCodeIcon } from "@/ui/icons/QrCode";
import { CopyIcon } from "@/ui/icons/Copy";
import Paragraph from "@/ui/Paragraph";

interface UrlCardProps {
  link: string;
}

const UrlCard: FC<UrlCardProps> = ({ link }) => {
  return (
    <div className="w-full h-14 border rounded-md border-slate-300  flex items-center justify-between px-5">
      <Paragraph size="sm" className="mb-0 text-sm">
        {link}
      </Paragraph>
      <div className="flex gap-3 text-slate-900 dark:text-slate-100">
        <span className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer">
          <CopyIcon className="w-5 h-5" />
        </span>
        <span className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer">
          <QRCodeIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};

export default UrlCard;
