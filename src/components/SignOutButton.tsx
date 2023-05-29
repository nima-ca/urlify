"use client";

import { FC, useState } from "react";
import Button from "@/ui/Button";
import { signOut } from "next-auth/react";

const SignOutButton: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Button
      isLoading={isLoading}
      onClick={() => {
        setIsLoading(true);
        signOut();
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
