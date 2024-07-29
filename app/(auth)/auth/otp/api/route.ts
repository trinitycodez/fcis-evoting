"server-only";

import { nodeMail } from "@/app/config/nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface typeData {
    matricNum: string,
    hashed: string,
    realValue: string
}

export const POST = async (req: Request) => {
    const holdValApi: typeData = await req.json();
    const { matricNum, realValue, hashed } = holdValApi
    console.log(holdValApi);
    const user = await prisma.student.findUnique({
        where: {
            MatricNumber: matricNum
        },
        select: {
            OTP: true,
            Passcode: true,
            MatricNumber: true
        }
    });

    try {
        const modifyMatric = user?.MatricNumber.replace('/', '-').concat('@students.unilorin.edu.ng');

        if ((user?.Passcode !== null) && (user?.OTP !== null)) {
            const otpRes = await prisma.student.update({
                where: {
                    MatricNumber: matricNum
                },
                data: {
                    Passcode: hashed,
                    OTP: +realValue, // to be randomised
                    SessionUse: null
                },
                select: {
                    OTP: true
                }
            });
            
            const mailOptions = {
                from: process.env.EMAIL,
                to: modifyMatric,
                subject: "CISSA OTP",
                text: "CISSA OTP message",
                html: `
                    <h1>${otpRes.OTP}</h1><br />
                    <span>Input this on Your First Login then locate the 'Change Password' section</span>
                `
            }
        
            nodeMail.sendMail(mailOptions, (error, info) => {
                if (error) throw error.message;
                console.log("Recovered", info.response);
            });
            
            const res = JSON.stringify({
                message: 'Successful',
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
        
        throw Error;

    } catch (error: any) {
        const res = JSON.stringify({
            message: "ErrorOTP",
            status: 401
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
}