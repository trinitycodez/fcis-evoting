import { APIStudents } from "@/types/api-students";
import { ReactNode } from "react"

const ApiStudents: APIStudents = {
    Current: [
        {
            Department: "Information Technology",
            Students: [
                {
                    id: 1,
                    level: "400L",
                    matricNo: "19/52HL085",
                    name: "OLOWOYORI, Emmanuel Taiwo",
                    position: "General Secretary",
                },
                {
                    id: 2,
                    level: "300L",
                    matricNo: "20/52HL088",
                    name: "OLUSOLA, Samson",
                },
            ],
        },
        {
            Department: "Computer Science",
            Students: [
                {
                    id: 1,
                    level: "400L",
                    matricNo: "19/52HO084",
                    name: "OLOWO, Karen Bola",
                },
            ]
        },
        {
            Department: "Mass Communication",
            Students: [
                {
                    id: 1,
                    level: "400L",
                    matricNo: "19/52HJ89",
                    name: "AFOLAYAN, Anuoluwa Taiwo",
                },
                {
                    id: 2,
                    level: "200L",
                    matricNo: "21/52HJ89",
                    name: "OLUWOLE, Victor James",
                },
            ],
        },
    ],
}


const totalStudents = ApiStudents.Current;
const tableStudentTest = (val: number) => {
    const cellStudentElementTest: ReactNode[] = [];
    const totalHolderStdt = totalStudents[val].Students
    for (let q = 0; q < totalHolderStdt.length; q++) {
        const { id, matricNo, name, level, position } = totalHolderStdt[q];
        cellStudentElementTest.push(
            <tr key={q}>
                <td>{ matricNo }</td>
                <td>{ name }</td>
                <td>{ level }</td>
                <td>{ position }</td>
                <td >
                    <form id={`form${id}`} method="post" className="flex flex-row flex-nowrap gap-4">
                        <input type="text" id={`form${id}`} name={`${id}`} className="w-full h-full focus:ring-0 focus:border-app-primary border border-app-primary " />
                    </form>
                </td>
                <td>                
                    <input type="submit" form={`form${id}`} value="send" className="px-4 py-1 bg-green-700 text-app-white font-bold rounded-md" />
                </td>
            </tr>
        )
    }
    return cellStudentElementTest;
}
const tableStudent = () => {
    const cellStudentElement: ReactNode[] = [];
    for (let p = 0; p < totalStudents.length; p++) {
    const { Department } = ApiStudents.Current[p];
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
                        tableStudentTest(p)
                    }
                    </tbody>
                </table>
                </div>
            </details>
        );
    }
    return cellStudentElement;
}

// component
const StudentIndex = () => {
  return (
    <section className="xs:py-6 sm:py-10 px-2 max-w-[80vw]">
        <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] xs:mb-8 sm:mb-6 text-app-primary w-full text-start">Student Lists</h2>
        {
            tableStudent()
        }
    </section>
  )
}

export default StudentIndex