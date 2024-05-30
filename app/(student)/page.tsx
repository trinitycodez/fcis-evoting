import HomeDashboard from "@/modules/home/dashboard";
import VoteCandidatePage from "@/modules/home/sessions";
import { NextPage } from "next";
// import { verifySession } from "../lib/server/session";
// import { redirect } from "next/navigation";
// import { SessionValidate } from "@/types/api-session";
// import { prisma } from '@/app/layout' ;

const HomePage: NextPage = async () => {
  // const res = await verifySession();
  // if (res === null) redirect('/auth/sign-up');
  // console.log("Value ", res);
  // const { userMatric }: SessionValidate = res;
  // const __def_user = await prisma.student.findUnique({
  //   where: {
  //     MatricNumber: userMatric
  //   },
  //   select: {
  //     Name: true,
  //     PostalName: true
  //   }
  // });

  // (__def_user === null)? users('student')! : users('admin');

  
  return (
    <>
      {/* <HomeDashboard /> */}
      <VoteCandidatePage />
    </>
  )
}

export default HomePage