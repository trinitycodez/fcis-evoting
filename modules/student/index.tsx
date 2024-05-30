"use client";

import { useSomeContext } from "@/app/lib/server/context-provider";
import { useStudentsCaller } from "@/app/lib/server/students-provider";
import { DeletePosition } from "@/app/lib/server/validate-position/delete-position";
import { SubmitPosition } from "@/app/lib/server/validate-position/submit-position";
import { jsonObj } from "@/types/all-user";
import { APIStudents } from "@/types/api-students";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react"
import { useFormState } from "react-dom";

/*
const ApiStudents: APIStudents = {
    Current: [
        {
            Department: "Information Technology",
            Students: [
                {
                    ID: 1,
                    LevelClass: "400L",
                    MatricNumber: "19/52HL085",
                    Name: "OLOWOYORI, Emmanuel Taiwo",
                    PortFolio: "General Secretary",
                    Gender: "M"
                },
                {
                    ID: 2,
                    LevelClass: "300L",
                    MatricNumber: "20/52HL088",
                    Name: "OLUSOLA, Samson",
                    PortFolio: "",
                    Gender: "M"
                },
            ],
        },
        {
            Department: "Computer Science",
            Students: [
                {
                    ID: 3,
                    LevelClass: "400L",
                    MatricNumber: "19/52HO084",
                    Name: "OLOWO, Karen Bola",
                    PortFolio: "",
                    Gender: "F"
                },
            ]
        },
        {
            Department: "Mass Communication",
            Students: [
                {
                    ID: 4,
                    LevelClass: "400L",
                    MatricNumber: "19/52HJ089",
                    Name: "AFOLAYAN, Anuoluwa Taiwo",
                    PortFolio: "",
                    Gender: "F"
                },
                {
                    ID: 5,
                    LevelClass: "200L",
                    MatricNumber: "21/52HJ089",
                    Name: "OLUWOLE, Victor James",
                    PortFolio: "",
                    Gender: "M"
                },
            ],
        },
    ],
} */


// component
const StudentIndex = () => {

    const user = useSomeContext(); // session user admin (object[]) | student (null)
    const { admin_stds }: jsonObj = JSON.parse(user); // together
    const userStudents = useStudentsCaller(); // session user (admin | student) students

    const router = useRouter();
    const [isState, setState] = useState<APIStudents>(); // prompt icon
    const [state, submitAction] = useFormState(SubmitPosition, undefined);
    const [statePosition, deletePosition] = useFormState(DeletePosition, undefined);
    
    const displayClear = () => {
        router.refresh() // not working
    }

    const tableStudentTest = (val: number, totalStudents: APIStudents) => {
        const cellStudentElementTest: ReactNode[] = [];
        const totalHolderStdt = totalStudents.Current[val].Students
        for (let q = 0; q < totalHolderStdt.length; q++) {
            const { ID, MatricNumber, Name, LevelClass, PortFolio } = totalHolderStdt[q];
            cellStudentElementTest.push(
                <tr key={q} className="h-fit">
                    <td>{ MatricNumber }</td>
                    <td>{ Name }</td>
                    <td>{ LevelClass }</td>
                    <td>{ PortFolio }</td>
                    <td>
                        <form action={ (formData) => { submitAction(formData) }} id={`form${ID}`} method="POST" className="flex flex-row flex-nowrap gap-4">
                            <select id={`formID${ID}`} name={`${ID}`} className="w-full h-full focus:ring-0 focus:border-app-primary border border-app-primary ">
                                <option value="">--</option>
                                <option value="President">President</option>
                                <option value="Vice President">Vice President</option>
                                <option value="General Secretary">General Secretary</option>
                                <option value="Assistant General Secretary">Assistant General Secretary</option>
                                <option value="Financial Secretary">Financial Secretary</option>
                                <option value="Social Secretary">Social Secretary</option>
                                <option value="Welfare Secretary">Welfare Secretary</option>
                                <option value="Sport Director">Sport Director</option>
                                <option value="Software Director">Software Director</option>
                                <option value="Public Relations Officer">Public Relations Officer</option>
                            </select>
                        </form>
                    </td>
                    <td className="flex flex-row h-full w-full justify-center items-center">                
                        <input type="submit" form={`form${ID}`} value="send" className="px-2 py-1 bg-green-600 text-app-white rounded-s-md tracking-wide cursor-pointer" />
                        <form action={ () => { deletePosition(ID) }} method="POST" id={`form${ID}`}>
                            <button type="submit" name={`${ID}`} className="bg-red-600 text-app-white px-2 py-1 rounded-e-md">delete</button>
                        </form>
                    </td>
                </tr>
            )
        }
        return cellStudentElementTest;
    }

    const tableStudent = (totalStudents: APIStudents) => {
        const cellStudentElement: ReactNode[] = [];
        for (let p = 0; p < totalStudents.Current.length; p++) {
        const { Department } = totalStudents.Current[p];
            cellStudentElement.push(
                <details key={p} className="mb-6 p-2 pb-4 shadow-md bg-app-white rounded-md hover:-translate-y-1 transition-all duration-75">
                    <summary className="xs:text-lg md:text-xl leading-[1.875rem] outline-none">{ Department }</summary>
                    <div className="overflow-x-auto pb-4">
                    <table className="def-table text-center xs:w-[40rem] xp:w-[50rem] mt-14 bg-app-white text-base mx-auto">
                        <thead className="border-y border-app-grey">
                            <tr>
                                <th>Matric Number</th>
                                <th>Name</th>
                                <th>Level</th>
                                <th>Position</th>
                                <th>State Position</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-app-grey-white">
                        {
                            tableStudentTest(p, totalStudents)
                        }
                        </tbody>
                    </table>
                    </div>
                </details>
            );
        }
        return cellStudentElement;
    }

    useEffect(() => {
        setState(userStudents)
    }, [])

    if (state?.message === 'Success') {
        'use server'
        state.message = '';
        alert("Successfully set office position");
        displayClear();
    } else if (state?.message === 'Error') {
        'use server'
        state.message = '';
        alert("Unable to set office position. Kindly check your internet connection or try again.");
    }
    if (statePosition?.message === 'Success') {
        'use server'
        statePosition.message = '';
        alert("Successfully deleted office position");
    } else if (statePosition?.message === 'Error') {
        'use server'
        statePosition.message = '';
        alert("Unable to delete office position. Kindly check your internet connection or try again.");
    }


    return (
        (admin_stds.matricNumber !== null) ?
        <section className="xs:py-6 sm:py-10 px-2 max-w-[80vw]">
            <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] xs:mb-8 sm:mb-6 text-app-primary w-full text-start">Student Lists</h2>
            { (!isState) && <span className='xs:text-xs xp:text-sm md:text-base pl-4 font-bold'>Loading...</span> }
            { isState && tableStudent(isState) }
        </section>
        :
        <></>
    )
}

export default StudentIndex