import type { Metadata } from "next";
import "./globals.css";

import { ContextProvider } from "./lib/server/context-provider";
import { updateSession, verifySession } from "./lib/server/session";
import { redirect } from "next/navigation";
import { SessionValidate } from "@/types/api-session";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

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

  const hd = headers();
  const path = hd.get('X_path')
  console.log('pathing ', path) // /*:path
  

  if ((path === '/auth/sign-up') ||
    (path === '/auth/login')) {
    return (
      <html lang="en">
        <body className="flex justify-end min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll font-App-Inter text-base text-app-text-sub z-10 relative ">
          { children }
        </body>
      </html>
    );

  } else if (
    (path === '/messages') ||
    (path === '/past-elections') ||
    (path === '/student') ||
    (path === '/about') ||
    (path === '/')) {    
      redirect('/auth/sign-up')

  } else {
    // if ((res === null)) redirect('/auth/sign-up');
    updateSession();
    const res = await verifySession();
  
    if ((res !== null)) {
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
    
    } else {
      return (
        <html lang="en">
          <body className="flex justify-end min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll font-App-Inter text-base text-app-text-sub z-10 relative ">
            {children}
          </body>
        </html>
      );

    }
  
  }
  
}

export default RootLayout

// if ((res === null)) redirect('/auth/sign-up');
// console.log("Value ", res);
// const { userMatric }: SessionValidate = res;
// const __def_user = await prisma.admin.findFirst({
//   where: {
//     MatricNumber: userMatric
//   },
//   select: {
//     MatricNumber: true
//   }
// });


// return (
//   <html lang="en">
//     <body className="flex justify-end min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll font-App-Inter text-base text-app-text-sub z-10 relative ">
//       <ContextProvider valuePass={`${__def_user}`} >
//         {children}
//       </ContextProvider>
//     </body>
//   </html>
// );