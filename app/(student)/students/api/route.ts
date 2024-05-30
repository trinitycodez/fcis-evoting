"server-only"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface typeData {
    ID: number,
    value: string,
    matricNum: string,
    dateTime: Date,
    date: string
}

export const GET = async () => {
    const userMsg = await prisma.student.findMany({
        select: {
            ID: true,
            MatricNumber: true,
            Name: true,
            LevelClass: true,
            PortFolio: true,
            Department: true,
            Gender: true
        },
        orderBy: {
            Department: "asc"
        }
    })

    try {
        
        if (userMsg !== null) {

            const payload = {
                message: "Success",
                status: 200,
                Current: userMsg
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

export const POST = async (req: Request) => {
    console.log('SECURED SERVER')
    try {
        const holdValApi: typeData = await req.json();
        const { ID, value, matricNum, dateTime, date } = holdValApi

        const id = await prisma.admin.findFirst({
            where: {
                MatricNumber: matricNum
            }
        })

        console.log("this is the SQL result =>", id);

        if ( id !== null && (ID !== null) ) {
            if (value !== 'delete') {
                const db = await prisma.student.update({
                    where: {
                        ID: ID
                    },
                    data: {
                        PortFolio: value
                    }, 
                    select: {
                        ID: true,
                        MatricNumber: true,
                        Name: true
                    }
                })
                const checker = await prisma.contestant.findUnique({
                    where: {
                        ID: db.ID
                    },
                    select: {
                        ID: true
                    }
                })
                if (checker === null) {
                    await prisma.contestant.create({
                        data: {
                            ID: db.ID,
                            Name: db.Name,
                            MatricNumber: db.MatricNumber,
                            PortFolio: value,
                            VoteTime: dateTime,
                            Year: date
                        }
                    })
                } else {
                    await prisma.contestant.update({
                        where: {
                            ID: db.ID
                        },
                        data: {
                            PortFolio: value,
                            VoteTime: dateTime,
                            Year: date                        
                        }
                    })
                }
            } else {
                await prisma.student.update({
                    where: {
                        ID: ID
                    },
                    data: {
                        PortFolio: null
                    }
                })
                await prisma.contestant.delete({
                    where: {
                        ID: ID
                    }
                })
            }

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