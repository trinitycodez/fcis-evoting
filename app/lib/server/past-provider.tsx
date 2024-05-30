"use client"

import { STUDENTS } from "@/types/api-students"
import { APIVotes, POSITIONS } from "@/types/api-vote"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const initialState: APIVotes =  {
    Session: [
        {
            year: '...',
            candidates: [
                {
                    PortFolio: '--',
                    Names: ['--'],
                    Votes: [0],
                    NumVoters: 0,
                    NumRegVoters: 0,
                    Position: ['--'],
                }
            ]
        }
    ]
}

const UserPastStudents = createContext<APIVotes>(initialState)

export const usePastStudentsCaller = () => {
  return useContext(UserPastStudents);
}

interface resProps {
    message: string,
    status: number,
    Session: [
        {
            Name: string,
            PortFolio: string,
            Vote: number,
            Position: string,
            Year: string
        }
    ]
}

interface propsType {
    year: string,
    candidates: {
        PortFolio: string,
        Names: string[],
        Votes: number[],
        NumVoters: number,
        NumRegVoters: number,
        Position: string[],    
        Year?: string
    } []
}

interface propsType2 {
    PortFolio: string,
    Names: string[],
    Votes: number[],
    NumVoters: number,
    NumRegVoters: number,
    Position: string[],
    Year?: string
}

//  provider component
export const PastStudentProvider = ({ children }: { children: ReactNode }) => {

    const [stdState, setState] = useState<APIVotes>();
    useEffect(() => {
        const holderVal: propsType[] = [];
                
        fetch(`http://localhost:3000/past-elections/api`, {
            method: "GET",
            mode: "cors",
            headers: {
                'API-Key': process.env.AUTH_SECRET!,
                'Origin': process.env.NEXT_AUTH_URL!,
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
                'Access-Control-Request-Method': 'GET'
            }
        })
        .then((res) =>
            res.json()
        )
        .then((res) => {
            console.log("Past Elections ", res)
            const data: resProps = res
            let NamesArr: string[] = []; // each array in a block
            let NumVotesArr: number[] = [];
            let WinnerArr: string[] = [];

            let NamesArr2: string[] = [];
            let NumVotesArr2: number[] = [];
            let WinnerArr2: string[] = [];

            let NamesArr3: string[] = [];
            let NumVotesArr3: number[] = [];
            let WinnerArr3: string[] = [];

            let NamesArr4: string[] = [];
            let NumVotesArr4: number[] = [];
            let WinnerArr4: string[] = [];

            let NamesArr5: string[] = [];
            let NumVotesArr5: number[] = [];
            let WinnerArr5: string[] = [];

            let NamesArr6: string[] = [];
            let NumVotesArr6: number[] = [];
            let WinnerArr6: string[] = [];

            let NamesArr7: string[] = [];
            let NumVotesArr7: number[] = [];
            let WinnerArr7: string[] = [];

            let NamesArr8: string[] = [];
            let NumVotesArr8: number[] = [];
            let WinnerArr8: string[] = [];

            let NamesArr9: string[] = [];
            let NumVotesArr9: number[] = [];
            let WinnerArr9: string[] = [];

            let NamesArr0: string[] = [];
            let NumVotesArr0: number[] = [];
            let WinnerArr0: string[] = [];

            let value: propsType2[] = []; // each block array of candidates

            const currentDate = new Date(Date.now()).getUTCFullYear();
            const currentMinus = currentDate - 10
            const yearArr = [currentDate-1];
            for (let h = currentDate; h > currentMinus; h--) {
                yearArr.push(h-1);
            }
            yearArr.shift();

            console.log('raw ', data.Session)
            let arr: string[] = []
            for (let k = 0; k < data.Session.length; k++) {
                arr[k] = data.Session[k].Year;
            }
            const sorted = new Set(arr)
            const numArr = Array.from(sorted);

            const func = (i: number) => {
                const newArr = data.Session.filter((value) => value.Year === numArr[i])
                // POSITIONS AVAILABLE
                const president = newArr.filter((val) => (val.PortFolio === POSITIONS[3]) )
                president.map((val) => {
                    NamesArr.push(val.Name)
                    NumVotesArr.push(val.Vote)
                    WinnerArr.push(val.Position)
                })
                const vPresdt = newArr.filter((val) => (val.PortFolio === POSITIONS[8]) )
                vPresdt.map((val) => {
                    NamesArr2.push(val.Name)
                    NumVotesArr2.push(val.Vote)
                    WinnerArr2.push(val.Position)
                })
                const genSec = newArr.filter((val) => (val.PortFolio === POSITIONS[2]) )
                genSec.map((val) => {
                    NamesArr3.push(val.Name)
                    NumVotesArr3.push(val.Vote)
                    WinnerArr3.push(val.Position)
                })
                const assGenSec = newArr.filter((val) => (val.PortFolio === POSITIONS[0]) )
                assGenSec.map((val) => {
                    NamesArr4.push(val.Name)
                    NumVotesArr4.push(val.Vote)
                    WinnerArr4.push(val.Position)
                })
                const finSec = newArr.filter((val) => (val.PortFolio === POSITIONS[1]) )
                finSec.map((val) => {
                    NamesArr5.push(val.Name)
                    NumVotesArr5.push(val.Vote)
                    WinnerArr5.push(val.Position)
                })
                const welSec = newArr.filter((val) => (val.PortFolio === POSITIONS[9]) )
                welSec.map((val) => {
                    NamesArr6.push(val.Name)
                    NumVotesArr6.push(val.Vote)
                    WinnerArr6.push(val.Position)
                })
                const socSec = newArr.filter((val) => (val.PortFolio === POSITIONS[5]) )
                socSec.map((val) => {
                    NamesArr7.push(val.Name)
                    NumVotesArr7.push(val.Vote)
                    WinnerArr7.push(val.Position)
                })
                const sportDir = newArr.filter((val) => (val.PortFolio === POSITIONS[7]) )
                sportDir.map((val) => {
                    NamesArr8.push(val.Name)
                    NumVotesArr8.push(val.Vote)
                    WinnerArr8.push(val.Position)
                })
                const pro = newArr.filter((val) => (val.PortFolio === POSITIONS[4]) )
                pro.map((val) => {
                    NamesArr9.push(val.Name)
                    NumVotesArr9.push(val.Vote)
                    WinnerArr9.push(val.Position)
                })
                const SD = newArr.filter((val) => (val.PortFolio === POSITIONS[6]) )
                SD.map((val) => {
                    NamesArr0.push(val.Name)
                    NumVotesArr0.push(val.Vote)
                    WinnerArr0.push(val.Position)
                })

                value.push({
                        PortFolio: POSITIONS[3],
                        Names: NamesArr,
                        Votes: NumVotesArr,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr
                    },
                    {
                        PortFolio: POSITIONS[8],
                        Names: NamesArr2,
                        Votes: NumVotesArr2,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr2
                    },
                    {
                        PortFolio: POSITIONS[2],
                        Names: NamesArr3,
                        Votes: NumVotesArr3,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr3
                    },
                    {
                        PortFolio: POSITIONS[0],
                        Names: NamesArr4,
                        Votes: NumVotesArr4,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr4
                    },
                    {
                        PortFolio: POSITIONS[1],
                        Names: NamesArr5,
                        Votes: NumVotesArr5,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr5
                    },
                    {
                        PortFolio: POSITIONS[9],
                        Names: NamesArr6,
                        Votes: NumVotesArr6,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr6
                    },
                    {
                        PortFolio: POSITIONS[5],
                        Names: NamesArr7,
                        Votes: NumVotesArr7,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr7
                    },
                    {
                        PortFolio: POSITIONS[7],
                        Names: NamesArr8,
                        Votes: NumVotesArr8,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr8
                    },
                    {
                        PortFolio: POSITIONS[4],
                        Names: NamesArr9,
                        Votes: NumVotesArr9,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr9
                    },
                    {
                        PortFolio: POSITIONS[6],
                        Names: NamesArr0,
                        Votes: NumVotesArr0,
                        NumVoters: 0,
                        NumRegVoters: 0,
                        Position: WinnerArr0
                    }
                )
                holderVal.push(
                    {
                        year: numArr[i],
                        candidates: value
                    }
                )

                NumVotesArr =[]; NumVotesArr2 =[]; NumVotesArr3 =[]; NumVotesArr4 =[]; NumVotesArr5 =[]; NumVotesArr6 =[]; NumVotesArr7 =[]; NumVotesArr8 =[]; NumVotesArr9 =[]; NumVotesArr0 =[];
                NamesArr =[]; NamesArr2 =[]; NamesArr3 =[];
                NamesArr4 =[]; NamesArr5 =[]; NamesArr6 =[]; NamesArr7 =[]; NamesArr8 =[]; NamesArr9 =[]; NamesArr0 =[];
                WinnerArr =[]; WinnerArr2 =[]; WinnerArr3 =[];
                WinnerArr4 =[]; WinnerArr5 =[]; WinnerArr6 =[];
                WinnerArr7 =[]; WinnerArr8 =[]; WinnerArr9 =[];
                WinnerArr0 =[];
                value =[]
            }
            
            for (let i = 0; i < numArr.length; i++) {
                let strYear = +numArr[i].substring(0, 4);
                // console.log("Year ", yearArr);
                // console.log("strYear ", strYear);
                switch (strYear) {
                    case yearArr[0]:
                        // 2023
                        if ((strYear !== currentDate) && ((strYear < currentDate) && (strYear > yearArr[yearArr.length-1]) && (strYear === yearArr[i]) )) {
                            func(i)
                        }
                        break;
                    case yearArr[1]:
                        // 2022
                        if ((strYear !== currentDate) && ((strYear < currentDate) && (strYear > currentMinus) && (strYear === yearArr[i]) )) {
                            func(i)
                        }
                        break;                    
                    default:
                        break
                }

            }

            setState({
                Session: holderVal
            })
        })
        .catch((e: Error) => {
            console.error(e.message)
        })

    }, [])

    return (
        <>
            {
                (stdState) ? 
                <UserPastStudents.Provider value={stdState} >
                    {children}
                </UserPastStudents.Provider>
                :
                <>
                    {children}
                </>
            }
        </>
    );
}