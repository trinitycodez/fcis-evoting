import SignUpIndex from "@/modules/sign-up";
import { initialType } from "@/types/sign-up";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Sign-up | FCIS-Evoting",
}
export interface dataSubmitProps extends initialType {};

const SignInPage:NextPage = () => {

  return (
    <SignUpIndex />
  )
}

export default SignInPage