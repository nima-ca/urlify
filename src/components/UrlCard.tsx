import Paragraph from "@/ui/Paragraph";
import { CopyIcon } from "@/ui/icons/Copy";
import { QRCodeIcon } from "@/ui/icons/QrCode";
import { copyToClipboard } from "@src/lib/utils/copyToClipboard";
import { QRCodeSVG } from "qrcode.react";
import { FC, useState } from "react";
import { CancelIcon } from "@/ui/icons/CancelIcon";

interface UrlCardProps {
  link: string;
}

const UrlCard: FC<UrlCardProps> = ({ link }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-14 border rounded-md border-slate-300  flex items-center justify-between px-5">
        <Paragraph size="sm" className="mb-0 text-sm">
          {link}
        </Paragraph>
        <div className="flex gap-3 text-slate-900 dark:text-slate-100">
          <span
            onClick={() =>
              copyToClipboard({
                value: link,
                toastMessage: "link Copied Successfully!",
              })
            }
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
          >
            <CopyIcon className="w-5 h-5" />
          </span>
          <span
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
          >
            <QRCodeIcon className="w-5 h-5" />
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="flex items-center justify-center w-screen h-screen fixed top-0 left-0 z-50">
          <div
            onClick={() => setIsModalOpen(false)}
            className="w-screen h-screen fixed bg-black/40 top-0 left-0"
          />
          <div className="w-64 h-64w-64 p-7 relative bg-white dark:bg-slate-700 flex items-center justify-center">
            <CancelIcon
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 h-5 w-5 cursor-pointer"
            />
            <QRCodeSVG height="180px" width="180px" value={link} />
          </div>
        </div>
      )}
    </>
  );
};

export default UrlCard;
