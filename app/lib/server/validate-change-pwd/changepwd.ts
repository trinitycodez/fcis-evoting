"use server";

import { ChangePasswordSchema, FormState } from "../formvalidator";

interface res {
    message: string,
    status: number,
    sessionValue: string
}

export async function ChangePassword(state: FormState, formData: FormData) {
    // Validate form fields
    console.log("did something here");
    const validatedFields = ChangePasswordSchema.safeParse({
        password1: formData.get('password1'),
        password2: formData.get('password2')
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
        const { password1, password2 } = validatedFields.data
        const userData = {
            password1: password1,
            password2: password2,
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
        const { message, status } = data;
        if (status === 401) {
            console.log(status)
            throw message
        }

        console.log('came back');

        return {
            message: message,
        }

    } catch (error: any) {
        const err: string = error;
        return {
            message: err,
        }
    }
}