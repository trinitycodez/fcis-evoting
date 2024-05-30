"server-only";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface typeData {
  nickname: string,
  passport: {
    data: number[]
  },
  matricNum: string
}

export const POST = async (req: Request) => {
  console.log("SERVER-SIDE DATA UPDATE");

  try {
    const holdValApi: typeData = await req.json();
    const { nickname, passport, matricNum } = holdValApi

    console.log("this server ", matricNum)
    const user = await prisma.student.update({
      where: {
        MatricNumber: matricNum
      },
      data: {
        PostalName: nickname,
        // Passport: Buffer.from(passport.data) // not allowed for second upload
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
