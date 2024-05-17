"server-only";
// "use server";

import { createSession } from "@/app/lib/server/session";
import { plainTextRes } from "@/types/prisma-sql";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface typeData {
    matricNum: string,
    password: string
}

export const POST = async (req: Request) => {

    try {
        const holdValApi: typeData = await req.json();
        const { matricNum, password } = holdValApi
        console.log(holdValApi);
        
        const users = await prisma.student.findUnique({
            where: {
                MatricNumber: matricNum
            },
            select: {
                ID: true,
                MatricNumber: true,
                Passcode: true
            }
        });

        console.log("this is the SQL result =>", users);
        
        const res = await plainTextRes(password, users!.Passcode);
        if ( res === true ) {
            const cookie = await createSession(users!.MatricNumber); // create session for subsequent login
            const res: {data: [string]} = JSON.parse(cookie)
            const [ session ] = res.data;
            console.log('data_bidding ', session);
            
            await prisma.student.update({
                where: {
                    MatricNumber: matricNum
                },
                data: {
                    SessionUse: session
                }
            });

            const payload = JSON.stringify({
                message: "Success",
                status: 200,
                sessionValue: session
            });

            return new Response(payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.NEXT_AUTH_URL!,
                    'Access-Control-Allow-Method': 'POST',
                    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
                    'vary': 'Origin'
                }
            });
        }
        
        throw Error;

    } catch (error: any) {
        const res = JSON.stringify({
            message: "Error",
            status: 401
        });
        return new Response(res);
    }
}

