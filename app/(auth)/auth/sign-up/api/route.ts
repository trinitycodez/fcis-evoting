"server-only";

import { createSession } from "@/app/lib/server/session";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
interface typeData {
  matricNum: string,
  password: string,
  passport: {
    data: number[]
  }
}


export const POST = async (req: Request) => {
  console.log("SERVER-SIDE");

  try {
    const holdValApi: typeData = await req.json();
    const { matricNum, password, passport } = holdValApi
    console.log(passport);

    const user = await prisma.student.update({
      where: {
        MatricNumber: matricNum
      },
      data: {
        Registered: true,
        Passcode: password,
        Passport: Buffer.from(passport.data)
      },
    });
    console.log(`this is the SQL result =>`, user);


    const userID = await prisma.student.findUnique({
      select: {
        ID: true
      },
      where: {
        MatricNumber: matricNum,
      }
    });

    await createSession(`${userID}`); // create session for subsequent login
    
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

