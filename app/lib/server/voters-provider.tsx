"use client"

import { APIContestants } from "@/types/api-session";
import { POSITIONS } from "@/types/api-vote";
import { StaticImageData } from "next/image";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import image from '@/assets/images/ProfilePic.png'

export const useVotersContext = () => {
  return useContext(VotersContext);
}

type resProps = [{
    MatricNumber: string,
    Name: string,
    Position: string,
    PortFolio: string,
    Year: string,
    PostalName: string
}]


interface propsType2 {
    MatricNumbers: string[],
    Names: string[],
    PostalName: string[],
    UserImage: StaticImageData[],
    PortFolio: string
}

const initialState: APIContestants = {
    Contestants: [{
        PortFolio: '',
        Names: [''],
        PostalName: [''],
        UserImage: [image],
        MatricNumbers: ['']
    }]
}
const VotersContext = createContext<APIContestants>(initialState)


// provider component
export const VotersProvider = ({ valuePass, children }: { valuePass: string, children: ReactNode }) => {
    const [stdState, setState] = useState<APIContestants>();
    const res: resProps = JSON.parse(valuePass);

    useEffect(() => {
        let NamesArr: string[] = []; // each array in a block
        let UserImagesArr: StaticImageData[] = [];
        let PostalNamesArr: string[] = [];
        let MatricNumbersArr: string[] = [];

        let NamesArr2: string[] = [];
        let UserImagesArr2: StaticImageData[] = [];
        let PostalNamesArr2: string[] = [];
        let MatricNumbersArr2: string[] = [];

        let NamesArr3: string[] = [];
        let UserImagesArr3: StaticImageData[] = [];
        let PostalNamesArr3: string[] = [];
        let MatricNumbersArr3: string[] = [];

        let NamesArr4: string[] = [];
        let UserImagesArr4: StaticImageData[] = [];
        let PostalNamesArr4: string[] = [];
        let MatricNumbersArr4: string[] = [];

        let NamesArr5: string[] = [];
        let UserImagesArr5: StaticImageData[] = [];
        let PostalNamesArr5: string[] = [];
        let MatricNumbersArr5: string[] = [];

        let NamesArr6: string[] = [];
        let UserImagesArr6: StaticImageData[] = [];
        let PostalNamesArr6: string[] = [];
        let MatricNumbersArr6: string[] = [];

        let NamesArr7: string[] = [];
        let UserImagesArr7: StaticImageData[] = [];
        let PostalNamesArr7: string[] = [];
        let MatricNumbersArr7: string[] = [];

        let NamesArr8: string[] = [];
        let UserImagesArr8: StaticImageData[] = [];
        let PostalNamesArr8: string[] = [];
        let MatricNumbersArr8: string[] = [];

        let NamesArr9: string[] = [];
        let UserImagesArr9: StaticImageData[] = [];
        let PostalNamesArr9: string[] = [];
        let MatricNumbersArr9: string[] = [];

        let NamesArr0: string[] = [];
        let UserImagesArr0: StaticImageData[] = [];
        let PostalNamesArr0: string[] = [];
        let MatricNumbersArr0: string[] = [];

        let value: propsType2[] = []; // each block array of candidates

        const currentDate = new Date(Date.now()).getUTCFullYear();

        const newArr = res.filter((value) => value.Year === currentDate.toString().concat(`/${currentDate+1}`))
        console.log(newArr)
        // POSITIONS AVAILABLE
        const president = newArr.filter((val) => (val.PortFolio === POSITIONS[3]) )
        president.map((val) => {
            NamesArr.push(val.Name)
            UserImagesArr.push()
            PostalNamesArr.push(val.PostalName)
            MatricNumbersArr.push(val.MatricNumber)
        })
        const vPresdt = newArr.filter((val) => (val.PortFolio === POSITIONS[8]) )
        vPresdt.map((val) => {
            NamesArr2.push(val.Name)
            UserImagesArr2.push()
            PostalNamesArr2.push(val.PostalName)
            MatricNumbersArr2.push(val.MatricNumber)
        })
        const genSec = newArr.filter((val) => (val.PortFolio === POSITIONS[2]) )
        genSec.map((val) => {
            NamesArr3.push(val.Name)
            UserImagesArr3.push()
            PostalNamesArr3.push(val.PostalName)
            MatricNumbersArr3.push(val.MatricNumber)
        })
        const assGenSec = newArr.filter((val) => (val.PortFolio === POSITIONS[0]) )
        assGenSec.map((val) => {
            NamesArr4.push(val.Name)
            UserImagesArr4.push()
            PostalNamesArr4.push(val.PostalName)
            MatricNumbersArr4.push(val.MatricNumber)
        })
        const finSec = newArr.filter((val) => (val.PortFolio === POSITIONS[1]) )
        finSec.map((val) => {
            NamesArr5.push(val.Name)
            UserImagesArr5.push()
            PostalNamesArr5.push(val.PostalName)
            MatricNumbersArr5.push(val.MatricNumber)
        })
        const welSec = newArr.filter((val) => (val.PortFolio === POSITIONS[9]) )
        welSec.map((val) => {
            NamesArr6.push(val.Name)
            UserImagesArr6.push()
            PostalNamesArr6.push(val.PostalName)
            MatricNumbersArr6.push(val.MatricNumber)
        })
        const socSec = newArr.filter((val) => (val.PortFolio === POSITIONS[5]) )
        socSec.map((val) => {
            NamesArr7.push(val.Name)
            UserImagesArr7.push()
            PostalNamesArr7.push(val.PostalName)
            MatricNumbersArr7.push(val.MatricNumber)
        })
        const sportDir = newArr.filter((val) => (val.PortFolio === POSITIONS[7]) )
        sportDir.map((val) => {
            NamesArr8.push(val.Name)
            UserImagesArr8.push()
            PostalNamesArr8.push(val.PostalName)
            MatricNumbersArr8.push(val.MatricNumber)
        })
        const pro = newArr.filter((val) => (val.PortFolio === POSITIONS[4]) )
        pro.map((val) => {
            NamesArr9.push(val.Name)
            UserImagesArr9.push()
            PostalNamesArr9.push(val.PostalName)
            MatricNumbersArr9.push(val.MatricNumber)
        })
        const SD = newArr.filter((val) => (val.PortFolio === POSITIONS[6]) )
        SD.map((val) => {
            NamesArr0.push(val.Name)
            UserImagesArr0.push()
            PostalNamesArr0.push(val.PostalName)
            MatricNumbersArr0.push(val.MatricNumber)
        })

        value.push({
                PortFolio: POSITIONS[3],
                Names: NamesArr,
                PostalName: PostalNamesArr,
                UserImage: UserImagesArr,
                MatricNumbers: MatricNumbersArr
            },
            {
                PortFolio: POSITIONS[8],
                Names: NamesArr2,
                PostalName: PostalNamesArr2,
                UserImage: UserImagesArr2,
                MatricNumbers: MatricNumbersArr2
            },
            {
                PortFolio: POSITIONS[2],
                Names: NamesArr3,
                PostalName: PostalNamesArr3,
                UserImage: UserImagesArr3,
                MatricNumbers: MatricNumbersArr3
            },
            {
                PortFolio: POSITIONS[0],
                Names: NamesArr4,
                PostalName: PostalNamesArr4,
                UserImage: UserImagesArr4,
                MatricNumbers: MatricNumbersArr4
            },
            {
                PortFolio: POSITIONS[1],
                Names: NamesArr5,
                PostalName: PostalNamesArr5,
                UserImage: UserImagesArr5,
                MatricNumbers: MatricNumbersArr5
            },
            {
                PortFolio: POSITIONS[9],
                Names: NamesArr6,
                PostalName: PostalNamesArr6,
                UserImage: UserImagesArr6,
                MatricNumbers: MatricNumbersArr6
            },
            {
                PortFolio: POSITIONS[5],
                Names: NamesArr7,
                PostalName: PostalNamesArr7,
                UserImage: UserImagesArr7,
                MatricNumbers: MatricNumbersArr7
            },
            {
                PortFolio: POSITIONS[7],
                Names: NamesArr8,
                PostalName: PostalNamesArr8,
                UserImage: UserImagesArr8,
                MatricNumbers: MatricNumbersArr8
            },
            {
                PortFolio: POSITIONS[4],
                Names: NamesArr9,
                PostalName: PostalNamesArr9,
                UserImage: UserImagesArr9,
                MatricNumbers: MatricNumbersArr9
            },
            {
                PortFolio: POSITIONS[6],
                Names: NamesArr0,
                PostalName: PostalNamesArr0,
                UserImage: UserImagesArr0,
                MatricNumbers: MatricNumbersArr0
            }
        )
        
        if (value) setState({
            Contestants: value
        })

    }, [])
    
    return (
        <>
            {
                (stdState) ?
                <VotersContext.Provider value={stdState}>
                    { children }
                </VotersContext.Provider>
                :
                <>
                    { children }
                </>
            }
        </>
    );
}