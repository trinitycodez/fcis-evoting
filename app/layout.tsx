import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "./lib/server/context-provider";
import { verifySession } from "./lib/server/session";
import { redirect } from "next/navigation";
import { SessionValidate } from "@/types/api-session";
import { PrismaClient } from "@prisma/client";

export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: "Home | FCIS-Evoting",
  description: "Home-page for FCIS E-voting",
  keywords: "FCIS, CIS, CISSA, E-voting, Internet voting, CISSA online voting",
};

const prisma = new PrismaClient();

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const res = await verifySession();
  if (res === null) redirect('/auth/sign-up');
  console.log("Value ", res);
  const { userMatric }: SessionValidate = res;
  const __def_user = await prisma.admin.findFirst({
    where: {
      MatricNumber: userMatric
    },
    select: {
      MatricNumber: true
    }
  });


  return (
    <html lang="en">
      <body className="flex justify-end min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll font-App-Inter text-base text-app-text-sub z-10 relative ">
        <ContextProvider valuePass={`${__def_user}`} >
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}

export default RootLayout