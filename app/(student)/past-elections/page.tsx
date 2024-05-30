import { PastStudentProvider } from "@/app/lib/server/past-provider"
import PastElectIndex from "@/modules/past-elections"
import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
  title: "Past Elections | FCIS-Evoting",
}  

const PastElections:NextPage = () => {
  return (
    <PastStudentProvider>
      <PastElectIndex />      
    </PastStudentProvider>
  )
}

export default PastElections