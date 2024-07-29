import ResetPassword from "@/modules/reset-password"
import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
  title: "Reset Password | FCIS-Evoting",
}  

const ChangePassword: NextPage = () => {
  return (
    <>
        <ResetPassword />
    </>
  )
}

export default ChangePassword