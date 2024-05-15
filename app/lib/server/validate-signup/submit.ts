"use server"

import { SignupFormSchema, FormState } from "../formvalidator" 
import { deleteSession } from "../session"
import { saltAndHash } from "@/types/prisma-sql"

interface res {
  message: string,
  status: number
}

export async function Submit(state: FormState, formData: FormData) {

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    matricNum: formData.get('matricNum'),
    password: formData.get('password'),
    passport: formData.get('userImage')
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  deleteSession();

  // blob image to upload
  const file: Blob | null = formData.get('userImage') as unknown as Blob;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(buffer);


  // Call the provider or db to create a user...
  try {
    const { matricNum, password } = validatedFields.data
    const hashedPassword = await saltAndHash(password)
    const userData = {
      matricNum: matricNum,
      password: hashedPassword,
      passport: buffer,
    }
    const mainData = JSON.stringify(userData);

    const res = await fetch(`${process.env.NEXT_AUTH_URL}/auth/sign-up/api`, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.AUTH_SECRET!,
        'Origin': process.env.NEXT_AUTH_URL!,
        'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
        'Access-Control-Request-Method': 'POST'
      },
      body: mainData,
    });

    const data: res = await res.json();
    if (data.status === 401) {
      throw data.message;
    }
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


// import { join } from "path"
// import { writeFile } from "fs/promises"

  // const path = join('/', 'assets', file.name)
  // await writeFile(path, buffer);

