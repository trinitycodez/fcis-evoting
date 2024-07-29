import SignUpIndex from "@/modules/sign-up";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Sign-up | FCIS-Evoting",
}

const SignInPage:NextPage = () => {

  return (
    <SignUpIndex />
  )
}

export default SignInPage