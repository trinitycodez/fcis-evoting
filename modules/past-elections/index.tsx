"use client"

import { usePastStudentsCaller } from "@/app/lib/server/past-provider";
import { APIVotes } from "@/types/api-vote"
import { useEffect, useState } from "react";

/*
const apiPersons: APIVotes = {
  Session: [
    {
      year: "2023/2024",
      candidates: [
        {
          PortFolio: "President",
          Names: ["ELIJAH, Oyindamola Israel", "AKHIHIERO, Joshua Ohiole", "INUSA, John Yahaya", "ABRAHAM, James Theophilus", "OHEOBE, Peace Ohiole"],
          NumVotes: [350, 50, 90, 50, 20],
          NumVoters: 550,
          NumRegVoters: 600,
          Winner: ["WINNER", "", "", "", ""],
        },
        {
          PortFolio: "Vice President",
          Names: ["JOSEPH, Pascaline Ovayoza", "IBRAHIM, Aisha", "ADEYEYE, Abigail"],
          NumVotes: [150, 150, 250],
          NumVoters: 550,
          NumRegVoters: 600,
          Winner: ["", "", "WINNER"],
        },
        {
          PortFolio: "General Secretary",
          Names: ["OLOWOYORI, Emmanuel Taiwo"],
          NumVotes: [459],
          NumVoters: 550,
          NumRegVoters: 600,
          Winner: ["WINNER"],
        },
      ]
    },
    {
      year: "2024/2025",
      candidates: [
        {
          PortFolio: "President",
          Names: ["AYILARA, Opstimistic"],
          NumVotes: [2400],
          NumVoters: 2700,
          NumRegVoters: 2700,
          Winner: ["WINNER"],
        },
      ]
    },
  ]
}
*/

// const totalApiSession = apiPersons.Session;
const voteTable = (nextSession: number, { Session }: APIVotes) => {
  const totalApiPersons = Session[nextSession].candidates;
  const cellNodeElement:React.ReactNode[] = [];
  for (let k = 0; k < totalApiPersons.length; k++) {
    let i = k;
    for (let j = 0; j < totalApiPersons[i].Names.length; j++) {
      if ((j===0)) {
        cellNodeElement.push(
          <tr key={j}>
            <th rowSpan={totalApiPersons[i].Names.length}>{totalApiPersons[i].PortFolio}</th>
            <td>{totalApiPersons[i].Names[j]}</td>
            <td>{totalApiPersons[i].Votes[j]}</td>
            <td rowSpan={totalApiPersons[i].Names.length}>{totalApiPersons[i].NumVoters}</td>
            <td rowSpan={totalApiPersons[i].Names.length}>{totalApiPersons[i].NumRegVoters}</td>
            <td>{totalApiPersons[i].Position[j]}</td>
          </tr>
        );
      }
      else if ((j > 0)) {
        cellNodeElement.push(
          <tr key={j}>
            <td>{totalApiPersons[i].Names[j]}</td>
            <td>{totalApiPersons[i].Votes[j]}</td>
            <td>{totalApiPersons[i].Position[j]}</td>
          </tr>
        );
      }
    }
  }
  return cellNodeElement;
}
const voteTableTest = (totalApiSession: APIVotes) => {
  const { Session } = totalApiSession
  const cellNodeElementTest: React.ReactNode[] = [];
  for (let h = 0; h < Session.length; h++) {
    cellNodeElementTest.push(
      <details key={h} className="mb-6 p-2 pb-4 shadow-md bg-app-white rounded-md hover:-translate-y-1 transition-all duration-75">
        <summary className="xs:text-lg md:text-xl leading-[1.875rem] outline-none">{Session[h].year} Academic Session</summary>
        <div className="overflow-x-auto pb-4">
          <table className="def-table text-center xs:w-[40rem] xp:w-[50rem] mt-14 bg-app-white text-base mx-auto">
            <thead className="border-y border-app-grey">
              <tr>
                <th>Port-folio</th>
                <th>Names</th>
                <th>Numbers of Votes</th>
                <th>Numbers of Voters</th>
                <th>Numbers of Registered Voters</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody className="bg-app-grey-white">
              {
                voteTable(h, totalApiSession)
              }
            </tbody>
          </table>
        </div>
      </details>
    )
  }
  return cellNodeElementTest;
}

// component
const PastElectIndex = () => {

  const userPastStudents = usePastStudentsCaller(); // session user (admin | student) students
  const [isState, setState] = useState<APIVotes>(); // prompt icon

  useEffect(() => {
    setState(userPastStudents)
  }, [])

  return (
    <section className="xs:pt-6 sm:pt-10 pb-14 px-2 max-w-[80vw] ">
      <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] mb-6 text-app-primary ">Past Elections</h2>
      { (!isState) && <span className='xs:text-xs xp:text-sm md:text-base pl-4 font-bold'>Loading...</span> }
        { isState && 
          voteTableTest(isState)
        }
    </section>
  )
}

export default PastElectIndex