"use client";

import { FC } from "react";
import Button from "@/ui/Button";
import { signOut } from "next-auth/react";

const SignOutButton: FC = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export default SignOutButton;
