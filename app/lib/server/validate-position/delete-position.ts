"use server";

import { redirect } from "next/navigation";
import { FormState } from "../formvalidator";
import { verifySession } from "../session";
import { SessionValidate } from "@/types/api-session";

interface res {
    message: string,
    status: number
}

export async function DeletePosition(statePosition: FormState, id: number) {

    const res = await verifySession();
    if (res === null) redirect('/auth/sign-up');
    const { userMatric }: SessionValidate = res;

    // Call the provider or db to create a user...
    try {
        const userData = {
           ID: id,
           value: 'delete',
           matricNum: userMatric
        }
        const mainData = JSON.stringify(userData);

        console.log(mainData)
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