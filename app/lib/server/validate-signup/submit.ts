"use server"

import * as bcrypt from "bcrypt"
import { SignupFormSchema, FormState } from "../formvalidator" 

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

  // blob image to upload
  const file: File | null = formData.get('userImage') as unknown as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(buffer);


  // Call the provider or db to create a user...
  try {
    const { matricNum, password } = validatedFields.data
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
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


// type hold = {
//     matric: string,
//     image: string,
//     password: string,
//     message?: string
// }
// export class Submit {
//     public sms!: hold;
    
//     constructor(public matric: string, public image: string, private _password: string, ) {}

//     async send () {
//         const data = {
//             matric: this.matric, 
//             image: this.image,
//             password: this._password,
//         }
//         this.sms = await fetch("/auth/sign-up/api", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })
//         .then((res) =>
//             res.json()
//         )
//         .then((res) => {
//             return res
//         })
//         .catch((e: Error) => { 
//             return e.message;
//         })
//     }
// }
// import { join } from "path"
// import { writeFile } from "fs/promises"

  // const path = join('/', 'assets', file.name)
  // await writeFile(path, buffer);

