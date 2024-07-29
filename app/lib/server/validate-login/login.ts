"use server";

import { cookies } from "next/headers";
import { LoginFormSchema, FormState } from "../formvalidator";

interface res {
  message: string,
  status: number,
  sessionValue: string
}

export async function Login(state: FormState, formData: FormData) {
  // Validate form fields
  console.log("did something here");
  const validatedFields = LoginFormSchema.safeParse({
    matricNum: formData.get('matricNum'),
    password: (formData.get('password') !== null) ? formData.get('password'): formData.get('otp')
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
    const { sessionValue, message, status } = data;
    if (status === 401) {
      console.log(status)
      throw message
    }
    const date = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 )
    const dateMsg = new Date( Date.now() + 60 * 1000 )
    
    console.log('came back');
    cookies().set('session', sessionValue, {
      httpOnly: true,
      secure: true,
      expires: date,
      sameSite: 'strict',
      path: '/'
    });
    cookies().set('message', 'Success', {
      httpOnly: true,
      secure: true,
      expires: dateMsg,
      sameSite: 'strict',
      path: '/auth/login'
    });
    
    
    return {
      messageServer: message,
    }
    
  } catch (error: any) {
    const dateMsg = new Date( Date.now() + 60 * 1000 )
    cookies().set('message', 'Error', {
      httpOnly: true,
      secure: true,
      expires: dateMsg,
      sameSite: 'strict',
      path: '/auth/login'
    });
    const err: string = error;
    return {
      messageServer: err,
    }
  }
}