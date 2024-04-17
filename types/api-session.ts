import { StaticImageData } from "next/image";

export interface APIContestants {
    Contestants: {
        PortFolio: string,
        Names: string[],
        PostalName: string[],
        UserImage: StaticImageData[],
    }[]
}