import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import { GithubIcon } from "@/ui/icons/Github";
import { GoogleIcon } from "@/ui/icons/Google";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";

interface IOAuthProps {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const OAuth: FC<IOAuthProps> = ({ isLoading, setIsLoading }) => {
  const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState<boolean>(false);
  const [isGithubLoggingIn, setIsGithubLoggingIn] = useState<boolean>(false);

  const toggleLoadingState = (
    provider: "google" | "github",
    state: boolean
  ) => {
    setIsLoading(state);
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
    <div className="flex justify-between items-center gap-2">
      <Button
        type="submit"
        className="w-full"
        isLoading={isGoogleLoggingIn}
        disabled={isGithubLoggingIn || isGoogleLoggingIn || isLoading}
        onClick={() => handleOAuthLogin("google")}
      >
        <GoogleIcon className="h-5 w-5 mr-2" />
        Google
      </Button>
      <Button
        type="submit"
        className="w-full"
        isLoading={isGithubLoggingIn}
        disabled={isGithubLoggingIn || isGoogleLoggingIn || isLoading}
        onClick={() => handleOAuthLogin("github")}
      >
        <GithubIcon className="h-5 w-5 mr-2" />
        Github
      </Button>
    </div>
  );
};

export default OAuth;
