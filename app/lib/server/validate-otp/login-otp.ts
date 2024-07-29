"use server";

import { FormState, LoginOTPFormSchema } from "../formvalidator";
import { saltAndHash } from "@/types/prisma-sql";

interface res {
  message: string,
  status: number
}

export async function LoginOTP(stateOtp: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginOTPFormSchema.safeParse({
    matricNum: formData.get('matricNum')
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  try {
    const { matricNum } = validatedFields.data
    const hashedPassword = await saltAndHash('192999')
    const userData = {
      matricNum: matricNum,
      hashed: hashedPassword,
      realValue: '192999'
    }
    const mainData = JSON.stringify(userData);

    const res = await fetch(`${process.env.NEXT_AUTH_URL}/auth/otp/api`, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'multipart/form-data',
        'API-Key': process.env.AUTH_SECRET!,
        'Origin': process.env.NEXT_AUTH_URL!,
        'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
        'Access-Control-Request-Method': 'POST'
      },
      body: mainData,
    });
    
    const data: res = await res.json();
    const { message, status } = data;
    if (status === 401) {
      console.log(status)
      throw message
    }

    return {
      messageServer: message,
    }
    
  } catch (error: any) {
    const err: string = error;
    return {
      messageServer: err,
    }
  }
}