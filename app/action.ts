"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function ActionAZ() {
    cookies().delete('message');
    console.log("did something here");
    redirect('/')
}
// to be deleted