"server-only"

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

interface typeData {
    data: string,
    matricNumber: string,
    dateTime: string
}


export const GET = async () => {
    const year = new Date(Date.now()).getUTCFullYear().toString();
    const userMsg = await prisma.message.findMany({
        select: {
            ID: true,
            Statement: true,
            MessageDate: true
        },
        orderBy: {
            RowsNumber: "desc"
        }
    })

    try {
        
        if (userMsg !== null) {

            if (userMsg.length === 0) {
                const payload = {
                    message: "Success",
                    status: 201,
                    Session: {
                        year: year,
                        messages: [{ Statement: "No Message" }]
                    }
                }
        
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

            const payload = {
                message: "Success",
                status: 200,
                Session: {
                    year: year,
                    messages: userMsg
                }
            }

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
        console.log('danger')
        const res = JSON.stringify({
            message: "Error",
            status: 401
        });
        return new Response(res);
    }
}


export const POST = async (req: Request) => {
console.log('got here')
    try {
        const holdValApi: typeData = await req.json();
        const { data, matricNumber, dateTime } = holdValApi
        const id =  await prisma.admin.findFirst({
            where: {
                MatricNumber: matricNumber
            },
            select: {
                ID: true,
                MatricNumber: true
            }
        })
                
        console.log("this is the SQL result =>", id);
        
        if ( id !== null ) {
            await prisma.message.create({
                data: {
                    ID: id.MatricNumber,
                    AdminID: id.ID,
                    Statement: data,
                    BackupStatement: data,
                    MessageDate: dateTime
                }
            })

            const payload = JSON.stringify({
                message: "Success",
                status: 200,
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