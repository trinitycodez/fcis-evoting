"server-only";

import { nodeMail } from "@/app/config/nodemailer";
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
    let changeRes = 'Signed';

    const getUser = await prisma.student.findUnique({
      where: {
        MatricNumber: matricNum
      },
      select: {
        Passcode: true,
      }
    })

    // if (getUser === null) {
    if (getUser?.Passcode === null) {
      const modifyMatric = matricNum.replace('/', '-').concat('@students.unilorin.edu.ng');
      const user = await prisma.student.update({
        where: {
          MatricNumber: matricNum
        },
        data: {
          Registered: true,
          Passcode: password,
          OTP: 944903, // to be randomised
          Passport: Buffer.from(passport.data)
        },
        select: {
          OTP: true
        }
      });
      changeRes = 'Success'
      console.log('something');

      const mailOptions = {
        from: process.env.EMAIL,
        to: modifyMatric,
        subject: "CISSA OTP",
        text: "CISSA OTP message",
        html: `
          <body>
            <h1>${user.OTP}</h1><br />
            <span>Input this on Your First Login then subsequently use your password.</span>
          </body>
        `
      }

      nodeMail.sendMail(mailOptions, (error, info) => {
        if (error) throw error.message;
        console.log("Delivered", info.response);
      });
      
    } 

    const res = JSON.stringify({
      message: changeRes,
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

