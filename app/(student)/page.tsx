import HomeDashboard from "@/modules/home/dashboard";
import VoteCandidatePage from "@/modules/home/sessions";
import { NextPage } from "next";
import { verifySession } from "../lib/server/session";
import { redirect } from "next/navigation";
import { SessionValidate } from "@/types/api-session";
import { prisma } from '@/app/layout' ;
import { VotersProvider } from "../lib/server/voters-provider";
import { NumVotesProvider } from "../lib/server/numvotes-provider";

const HomePage: NextPage = async () => {
  const res = await verifySession();
  if (res === null) redirect('/auth/sign-up');
  console.log("Value ", res);
  const { userMatric }: SessionValidate = res;
  const __def_verifyVote = await prisma.validatevote.findFirst({
    where: {
      MatricNumber: userMatric
    },
    select: {
      Vote: true // to verify whether user voted or not
    }
  });

  const __def_user = await prisma.contestant.findMany({
    select: {
      MatricNumber: true,
      Name: true,
      Position: true,
      PortFolio: true,
      Year: true,
      PostalName: true
    }
  });

  const __def_getTime = await prisma.timer.findFirst({
    select: {
      StartTime: true,
      EndTime: true
    }
  })

  const __def_numVotes = await prisma.votes.findMany();

  const value = JSON.stringify(__def_user);
  
  return (
    <>
      {
        (__def_verifyVote?.Vote) ?
        <NumVotesProvider valuePass={__def_numVotes} getTime={__def_getTime}>
          <HomeDashboard />
        </NumVotesProvider>
        :
        <VotersProvider valuePass={value}>
          <VoteCandidatePage />
        </VotersProvider>
      }
    </>
  )
}

export default HomePage