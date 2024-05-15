import MSGIndex from "@/modules/messages"
import { Metadata, NextPage } from "next"

export const revalidate = 180

export const metadata: Metadata = {
  title: "Messages | FCIS-Evoting",
} 

const MSGNotification:NextPage = () => {
  return (
    <MSGIndex />
  )
}

export default MSGNotification