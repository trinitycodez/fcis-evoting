import LoginIndex from "@/modules/login"
import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
  title: "Login | FCIS-Evoting",
}

const LoginPage:NextPage = () => {
  
  return (
    <LoginIndex />
  )
}

export default LoginPage