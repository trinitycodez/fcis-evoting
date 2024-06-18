import type { Metadata } from "next";
import "./globals.css";

import { ContextProvider } from "./lib/server/context-provider";
import { verifySession } from "./lib/server/session";
import { redirect } from "next/navigation";
import { SessionValidate } from "@/types/api-session";
import { PrismaClient } from "@prisma/client";
import { cookies, headers } from "next/headers";
import { LoginProvider } from "./lib/server/login-provider";

export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: "Home | FCIS-Evoting",
  description: "Home-page for FCIS E-voting",
  keywords: "FCIS, CIS, CISSA, E-voting, Internet voting, CISSA online voting",
};

export const prisma = new PrismaClient(); // export this

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const hd = headers();
  const path = hd.get('X_path')
  console.log('pathing ', path)

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
    (path === '/students') ||
    (path === '/about') ||
    (path === '/')) {
      redirect('/auth/sign-up')

  } else {
    // if ((res === null)) redirect('/auth/sign-up');
    const res = await verifySession();
    const state = cookies().get('message')?.value
    
    if ((res !== null)) {
      // state messages
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

      const __def_general = await prisma.student.findUnique({
        where: {
          MatricNumber: userMatric
        },
        select: {
          Name: true,
          PostalName: true,
          Passport: true
        }
      });
      const totalReg = await prisma.student.count({
        where: {
          Registered: true
        }
      })
      
      const sendIMG = () => {
        let loadImg: string = ''
        if (__def_general?.Passport) {
          const arr = new Uint8Array(__def_general.Passport!)
          let l = btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
          loadImg = `data:image/png;base64,${l}`
        }
        return loadImg
      }

      const jsonObj = {
        admin_stds: __def_user,
        others: {
          ...__def_general,
          Passport: sendIMG()
        }
      }

      const jsonValue = JSON.stringify(jsonObj);
      
      return (
        <html lang="en">
          <body className="flex justify-end min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll font-App-Inter text-base text-app-text-sub z-10 relative ">
            <ContextProvider valuePass={`${jsonValue}`} total={totalReg}>
            {/* <ContextProvider valuePass={`${jsonValue}`}> */}
              <LoginProvider valuePass={`${state}`}>
                { children }
              </LoginProvider>
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