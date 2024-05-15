"server-only";

import { decrypt, verifySession } from "@/app/lib/server/session";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";


const prisma = new PrismaClient();
interface typeData {
  nickname: string,
  passport: {
    data: number[]
  }
}


export const POST = async (req: Request) => {
  console.log("SERVER-SIDE DATA UPDATE");

  try {
    const holdValApi: typeData = await req.json();
    const { nickname, passport } = holdValApi
    console.log(passport);

    const ukey = await verifySession() as {isAuth:boolean, userMatric:string};
    const { userMatric } = ukey;

    const user = await prisma.student.update({
      where: {
        MatricNumber: userMatric
      },
      data: {
        PostalName: nickname,
        Passport: Buffer.from(passport.data)
      },
    });

    console.log("User SQL retrived ", user);

    const res = JSON.stringify({
      message: "Success",
      status: 200
    });

    return new Response(res, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.NEXT_AUTH_URL!,
        'Access-Control-Allow-Method': 'POST',
        'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
        'vary': 'Origin'
      }
    });

  } catch (error: any) {
    const res = JSON.stringify({
      message: "Error",
      status: 401
    });
    return new Response(res);
  }
}
