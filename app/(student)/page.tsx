import HomeDashboard from "@/modules/home/dashboard";
import VoteCandidatePage from "@/modules/home/sessions";
import { NextPage } from "next";

const HomePage:NextPage = () => {
  return (
    <>
      <HomeDashboard />
      {/* <VoteCandidatePage /> */}
    </>
  )
}

export default HomePage