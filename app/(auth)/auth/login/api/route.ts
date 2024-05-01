"server-only";

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
                MatricNumber: true,
                Passcode: true,
            }
        });

        console.log(`this is the SQL result =>`, users);
        
        const res = await plainTextRes(password, users!.Passcode);
        if ( res === true ) {
            const payload = JSON.stringify({
                message: "Success",
                status: 200
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
        throw new Error();

    } catch (error: any) {
        const res = JSON.stringify({
            message: "Error",
            status: 401
        });
        return new Response(res);
    }
}

