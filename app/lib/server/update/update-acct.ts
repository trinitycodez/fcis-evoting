"use server";

import { ModalFormSchema, FormState } from "../formvalidator";

export async function Update(state: FormState, formData: FormData) {
    // Validate form fields
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

    // Call the provider or db to create a user...
    console.log(validatedFields.data);
}