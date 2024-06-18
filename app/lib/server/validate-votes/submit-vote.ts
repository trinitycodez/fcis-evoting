"use server"

import { FormState } from "../formvalidator";
import { verifySession } from "../session";
import { SessionValidate } from "@/types/api-session";
import { redirect } from "next/navigation";
import { DAYS, MONTHS } from "@/types/api-msg";

interface res {
    message: string,
    status: number
}

const fullDate = new Date(Date.now());
const DateTime = (): string => {
    // let year = fullDate.getFullYear().toString()
    let month: string|number = fullDate.getMonth() // month 0
    let day: string|number = fullDate.getDay() // sun 0
    let date = fullDate.getDate().toString() // of the month
    let hh = fullDate.getHours();
    let mm: string | number = fullDate.getMinutes();
    // Check whether AM or PM
    let newformat = (hh >= 12) ? 'PM' : 'AM'; 
    // Find current hour in AM-PM Format
    hh = hh % 12;
    // To display "0" as "12"
    hh = hh ? hh : 12;
    mm = mm < 10 ? '0' + mm.toString() : mm.toString();

    if (+date > 3) date += 'th'
    else if (date === '3') date += 'rd'
    else if (date === '2') date += 'nd'
    else if (date === '1') date += 'st'
    
    if (day === DAYS['Sun']) day = 'Sunday';
    if (day === DAYS['Mon']) day = 'Monday';
    if (day === DAYS['Tue']) day = 'Tuesday';
    if (day === DAYS['Wed']) day = 'Wednesday';
    if (day === DAYS['Thu']) day = 'Thursday';
    if (day === DAYS['Fri']) day = 'Friday';
    if (day === DAYS['Sat']) day = 'Saturday';

    let dateTime = ''
    switch (month) {
        case MONTHS['Jan']:
            month = 'Jan';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Feb']:
            month = 'Feb';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Mar']:
            month = 'Mar';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Apr']:
            month = 'Apr';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['May']:
            month = 'May';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Jun']:
            month = 'Jun';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Jul']:
            month = 'Jul';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Aug']:
            month = 'Aug';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Sep']:
            month = 'Sep';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Oct']:
            month = 'Oct';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Nov']:
            month = 'Nov';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
        case MONTHS['Dec']:
            month = 'Dec';
            dateTime = `${day} ${date} ${month}, ${hh}:${mm} ${newformat}`; // date
            return dateTime;
    
        default:
            return ''
    }
}

export async function VotedCandidates(state: FormState, formData: FormData) {

    // Validate form fields
    const validatedFields = {
        president: (formData.get('President') !== null) ? formData.get('President') : '',
        vicePresident: (formData.get('Vice_President') !== null) ? formData.get('Vice_President') : '',
        genSec: (formData.get('General_Secretary') !== null) ? formData.get('General_Secretary') : '',
        asstGenSec: (formData.get('Assistant_General_Secretary') !== null) ? formData.get('Assistant_General_Secretary') : '',
        finSec: (formData.get('Financial_Secretary') !== null) ? formData.get('Financial_Secretary') : '',
        welfareSec: (formData.get('Welfare_Secretary') !== null) ? formData.get('Welfare_Secretary') : '',
        sportDir: (formData.get('Sport_Director') !== null) ? formData.get('Sport_Director') : '',
        socSec: (formData.get('Social_Secretary') !== null) ? formData.get('Social_Secretary') : '',
        software: (formData.get('Software_Director') !== null) ? formData.get('Software_Director') : '',
        pro: (formData.get('Public_Relations_Officer') !== null) ? formData.get('Public_Relations_Officer') : ''
    }

    // If any form fields are invalid, return early
    const { president, vicePresident, genSec, asstGenSec, finSec, welfareSec, socSec, sportDir, software, pro } = validatedFields;

    const res = await verifySession();
    if (res === null) redirect('/auth/sign-up');
    const { userMatric }: SessionValidate = res;
    const date = DateTime();


    const rawData = JSON.stringify([president, vicePresident, genSec, asstGenSec, finSec, welfareSec, socSec, sportDir, software, pro])
    // Call the provider or db to create a user...
    try {
        const votedCandidatesData = {
            data: rawData,
            matricNumber: userMatric,
            dateTime: date,
            timeStamp: fullDate
        }
        const mainData = JSON.stringify(votedCandidatesData);

        console.log(mainData)
        const res = await fetch(`${process.env.NEXT_AUTH_URL}/api`, {
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
            message: message
        }
        
    } catch (error: any) {
        const err: string = error;
        return {
            message: err,
        }
    }
}