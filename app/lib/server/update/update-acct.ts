"use server";

import { ModalFormSchema, FormState } from "../formvalidator";

interface res {
  message: string,
  status: number
}

export async function Update(state: FormState, formData: FormData) {
    // This is for updating the user profile
    console.log("did something here");
    const validatedFields = ModalFormSchema.safeParse({
      nickname: formData.get('nickname'),
      passport: formData.get('passport')
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.log(validatedFields.error)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

  // blob image to upload
  const file: Blob | null = formData.get('userImage') as unknown as Blob;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(buffer);

  // Call the provider or db to create a user...
  try {
    const { nickname, passport } = validatedFields.data
    const userData = {
      nickname: nickname,
      passport: passport,
    }
    const mainData = JSON.stringify(userData);

    const res = await fetch(`${process.env.NEXT_AUTH_URL}/modal-api`, {
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