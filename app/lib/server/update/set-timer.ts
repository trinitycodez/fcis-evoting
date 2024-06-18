"use server";

import { FormState, SetTimerFormSchema } from "../formvalidator";
import { verifySession } from "../session";

interface res {
  message: string,
  status: number
}

export async function SetTimer(state: FormState, formData: FormData) {
  // This is for updating the user profile
  console.log("did something here");
  const validatedFields = SetTimerFormSchema.safeParse({
    timerFrom: formData.get('timerFrom'),
    timerTo: formData.get('timerTo')
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // verify user 
  const { userMatric } = await verifySession() as { isAuth: boolean, userMatric: string };

  // time zone
  const getTime = (time: string) => {
    let hh = +time.substring(0, 2)
    let mm: string | number = +time.substring(3, 5)
    let newformat = (hh >= 12) ? 'PM' : 'AM';
    hh = hh % 12;
    hh = hh ? hh : 12;
    mm = mm < 10 ? '0' + mm.toString() : mm.toString();
    return `${hh}:${mm} ${newformat}`;
  }

  // Call the provider or db to create a user...
  try {
    const { timerFrom, timerTo } = validatedFields.data
    const TimerFrom = getTime(timerFrom)
    const TimerTo = getTime(timerTo)
    const Timestamp = new Date(Date.now())

    const adminData = {
      timerFrom: TimerFrom,
      timerTo: TimerTo,
      timestamp: Timestamp,
      matricNum: userMatric
    }
    
    const mainData = JSON.stringify(adminData);

    const res = await fetch(`${process.env.NEXT_AUTH_URL}/timezone-api`, {
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
    console.log('came back ')
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