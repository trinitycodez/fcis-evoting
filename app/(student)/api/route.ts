"server-only"

import { nodeMail } from "@/app/config/nodemailer";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface typeData {
    data: string,
    matricNumber: string,
    dateTime: string,
    timeStamp: Date
}

export const POST = async (req: Request) => {
    console.log('SECURED SERVER')
    try {
        const holdValApi: typeData = await req.json();
        const { data, matricNumber, dateTime, timeStamp } = holdValApi

        const id = await prisma.student.findUnique({
            where: {
                MatricNumber: matricNumber
            },
            select: {
                ID: true,
                MatricNumber: true,
                // bring in OTP
            }
        })
        console.log("this is the SQL result => ", id);
        
        
        if ( id !== null ) {
            // test OTP plus ID up
            try {
                const modifyMatric = id.MatricNumber.replace('/', '-').concat('@students.unilorin.edu.ng');

                // to verify user voted
                await prisma.votes.create({
                    data: {
                        ID: id.ID,
                        Vote: data,
                        VoteTime: timeStamp
                    }
                });
    
                await prisma.validatevote.create({
                    data: {
                        ID: id.ID,
                        MatricNumber: id.MatricNumber,
                        Vote: true,
                        VoteTime: dateTime
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: modifyMatric,
                    subject: `CISSA ${dateTime}`,
                    text: `CISSA vote message to ${id.MatricNumber}`,
                    html: `
                        <span>You've successfully voted</span>
                    `
                }
            
                nodeMail.sendMail(mailOptions, (error, info) => {
                    if (error) throw error.message;
                    console.log("Recovered", info.response);
                });
                
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
                
            } catch (error) {
                const payload = JSON.stringify({
                    message: "Voted",
                    status: 401,
                })
    
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
        }

    } catch (error: any) {
        const res = JSON.stringify({
            message: "Error",
            status: 401
        });
        return new Response(res);
    }
}