"use server";

import { redirect } from "next/navigation";
import { LoginFormSchema, FormState } from "../formvalidator";

interface res {
  message: string,
  status: number
}

export async function Login(state: FormState, formData: FormData) {
  // Validate form fields
  console.log("did something here");
  const validatedFields = LoginFormSchema.safeParse({
    matricNum: formData.get('matricNum'),
    password: formData.get('password')
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
    const { matricNum, password } = validatedFields.data
    const userData = {
      matricNum: matricNum,
      password: password,
    }
    const mainData = JSON.stringify(userData);

    console.log(mainData)
    const res = await fetch(`${process.env.NEXT_AUTH_URL}/auth/login/api`, {
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
    if (data.status === 401) {
      console.log(data.status)
      throw data.message
    }

    console.log('came back')
    return {
      message: data.message,
    }
    
  } catch (error: any) {
    const err: string = error;
    return {
      message: err,
    }
  }
}