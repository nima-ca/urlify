import { toast } from "@/components/ui/Toast";

interface ICopyToClipboardConfig {
  value: string;
  hasToast?: boolean;
  toastTitle?: string;
  toastMessage?: string;
}

export const copyToClipboard = ({
  value,
  hasToast = true,
  toastMessage = "value copied to clipboard successfully!",
  toastTitle = "Copied!",
}: ICopyToClipboardConfig) => {
  navigator.clipboard.writeText(value);

  if (hasToast) {
    toast({
      title: toastTitle,
      message: toastMessage,
      type: "success",
    });
  }
};
