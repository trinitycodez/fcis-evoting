"server-only"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


export const GET = async () => {
    const userMsg = await prisma.contestant.findMany({
        select: {
            ID: true,
            Name: true,
            PortFolio: true,
            Vote: true,
            Position: true,
            Year: true
        },
        orderBy: {
            Year: "desc",
        }
    })

    try {
        
        if (userMsg !== null) {

            const payload = {
                message: "Success",
                status: 200,
                Session: userMsg
            }
            
            console.log(payload)

            const data = JSON.stringify(payload);
            return new Response(data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.NEXT_AUTH_URL!,
                    'Access-Control-Allow-Method': 'GET',
                    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
                    'vary': 'Origin'
                }
            });

        } 
        
    } catch (error: any) {
        console.log('some error')
        const res = JSON.stringify({
            message: "Error",
            status: 401
        });
        return new Response(res);
    }
}