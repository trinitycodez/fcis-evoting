"use client"

import { APIStudents, STUDENTS } from "@/types/api-students"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const initialState: APIStudents =  {
  Current: [
    {
        Department: '...',
        Students: [
            {
                ID: 0,
                LevelClass: '--',
                MatricNumber: '--',
                Name: '--',
                PortFolio: '--',
                Gender: '--',
            }
        ]
    }
  ]
}

const UserStudents = createContext<APIStudents>(initialState)

export const useStudentsCaller = () => {
  return useContext(UserStudents);
}

interface resProps {
    message: string,
    status: number,
    Current: [
        {
            ID: number,
            MatricNumber: string,
            Name: string,
            LevelClass: string,
            PortFolio?: string,
            Department: string,
            Gender: string
        }
    ]
}

interface propsType {
    Department: string,
    Students: {
        ID: number,
        MatricNumber: string,
        Name: string,
        LevelClass: string,
        PortFolio?: string,
        Department: string,
        Gender: string
    } []
}

interface propsType2 {
    ID: number,
    MatricNumber: string,
    Name: string,
    LevelClass: string,
    PortFolio?: string,
    Department: string,
    Gender: string
}


export const StudentProvider = ({ children }: { children: ReactNode }) => {

    const [stdState, setState] = useState<APIStudents>();
    useEffect(() => {
        const holderVal1: propsType[] = [];
        const caller = (value: propsType2[], department: string) => {
            holderVal1.push(
                {
                    Department: department,
                    Students: value
                }
            )
        }

        fetch(`http://localhost:3000/students/api`, {
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
            console.log(res)
            let value1: propsType2[] = [];
            let value2: propsType2[] = [];
            let value3: propsType2[] = [];
            let value4: propsType2[] = [];
            let value5: propsType2[] = [];
            const data: resProps = res
            let iterate = 0
            let changeItr = 0
            console.log('raw ', data.Current)
            for (let i = 0; i < 5; i++) {
                // const department = STUDENTS[i]; // department
                console.log(iterate)
                for (let j = iterate; j < data.Current.length; j++) {
                    switch (changeItr) {
                        case 0:
                            if (data.Current[j].Department === STUDENTS[0]) {
                                value1.push(data.Current[j]) // [{...}]
                                iterate += 1;
                            } else if (changeItr === 0) {
                                caller(value1, STUDENTS[0])
                                changeItr = 1
                            }
                        case 1:
                            if (data.Current[j].Department === STUDENTS[1]) {
                                value2.push(data.Current[j]) // [{...}]
                                iterate += 1;
                            } else if (changeItr === 1) {
                                caller(value2, STUDENTS[1])
                                changeItr = 2
                            }
                        case 2:
                            if (data.Current[j].Department === STUDENTS[2]) {
                                value3.push(data.Current[j]) // [{...}]
                                iterate += 1;
                            } else if (changeItr === 2) {
                                caller(value3, STUDENTS[2])
                                changeItr = 3
                            }
                        case 3:
                            if (data.Current[j].Department === STUDENTS[3]) {
                                value4.push(data.Current[j]) // [{...}]
                                iterate += 1;
                            } else if (changeItr === 3) {
                                caller(value4, STUDENTS[3])
                                changeItr = 4
                            }
                        case 4:
                            if (data.Current[j].Department === STUDENTS[4]) {
                                value5.push(data.Current[j]) // [{...}]
                                iterate += 1;
                                console.log(value5)
                                console.log(iterate)
                            } 
                        default:
                            if (changeItr === 4) {
                                caller(value5, STUDENTS[4])
                                break;
                            }
                            break
                    }
                }
            }

            console.log('dataset ', holderVal1)
            setState({
                Current: holderVal1
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
                <UserStudents.Provider value={stdState} >
                    {children}
                </UserStudents.Provider>
                :
                <>
                    {children}
                </>
            }
        </>
    );
}