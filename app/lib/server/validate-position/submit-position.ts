"use server";

import { redirect } from "next/navigation";
import { FormState, CandidatesFormSchema } from "../formvalidator";
import { verifySession } from "../session";
import { SessionValidate } from "@/types/api-session";

interface res {
    message: string,
    status: number
}
interface inside {
    value: string[]
}

export async function SubmitPosition(state: FormState, formData: FormData) {
    // Validate form fields
    const { value } = formData.entries().next() as inside
    const ID = value[0]
    const position = value[1]
    console.log(formData.get('1'));
    const validatedFields = CandidatesFormSchema.safeParse({
        nominee: position
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        console.log(validatedFields.error)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await verifySession();
    if (res === null) redirect('/auth/sign-up');
    const { userMatric }: SessionValidate = res;
    const date = new Date(Date.now());
    const yearReq = date.getUTCFullYear();
    const year = yearReq.toString() + `/${yearReq+1}`;

    console.log(year);
    // Call the provider or db to create a user...
    try {
        const { nominee } = validatedFields.data
        const userData = {
           ID: +ID,
           value: nominee,
           matricNum: userMatric,
           dateTime: date,
           date: year
        }
        const mainData = JSON.stringify(userData);

        const res = await fetch(`${process.env.NEXT_AUTH_URL}/students/api`, {
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
        const { message } = data;
        if (data.status === 401) {
            console.log(data.status)
            throw data.message
        }
        
        console.log('came back to action');    
        
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