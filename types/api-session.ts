import { StaticImageData } from "next/image";

export interface APIContestants {
    Contestants: {
        MatricNumbers: string[],
        PortFolio: string,
        Names: string[],
        PostalName: string[],
        UserImage: StaticImageData[],
        Year?: string
    }[]
}

export interface SessionValidate { 
    isAuth: boolean,
    userMatric: string
}