"server-only";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface typeData {
    timerFrom: string,
    timerTo: string,
    timestamp: Date,
    matricNum: string
}

export const POST = async (req: Request) => {
    console.log("SERVER-SIDE DATA UPDATE");

    try {
        const holdValApi: typeData = await req.json();
        const { timerFrom, timerTo, timestamp, matricNum } = holdValApi

        const id = await prisma.admin.findFirst({
            where: {
                MatricNumber: matricNum
            },
            select: { ID: true }
        })

        console.log("This is server ", id)

        if ( id !== null ) {
            const checker = await prisma.timer.findFirst({
                where: {
                    AdminID: id.ID
                },
                select: {
                    ID: true
                }
            });

            if (checker === null) {
                await prisma.timer.create({
                    data: {
                        AdminID: id.ID,
                        StartTime: timerFrom,
                        EndTime: timerTo,
                        StampedTime: timestamp
                    },
                });

            } else {
                await prisma.timer.update({
                    where: {
                        ID: checker.ID
                    },
                    data: {
                        StartTime: timerFrom,
                        EndTime: timerTo,
                        StampedTime: timestamp
                    },
                });
            }
        
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

        }


    } catch (error: any) {
        const res = JSON.stringify({
            message: "Error",
            status: 401
        });
        return new Response(res);
    }
}
