import { APIVotes } from "@/types/api-vote"

const apiPersons:APIVotes = {
  Session: [
    {
      year: "2023/2024",
      candidates: [
        {
          PortFolio: "President",
          Names: ["ELIJAH, Oyindamola Israel", "AKHIHIERO, Joshua Ohiole", "INUSA, John", "ABRAHAM, James Theophilus", "OHEOBE, Peace Ohiole"],
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

const totalApiSession = apiPersons.Session;
const voteTable = (nextSession:number=0) => {
  const totalApiPersons = apiPersons.Session[nextSession].candidates;
  const cellNodeElement:React.ReactNode[] = [];
  for (let k = 0; k < totalApiPersons.length; k++) {
    let i = k;
    for (let j = 0; j < totalApiPersons[i].Names.length; j++) {
      if ((j===0)) {
        cellNodeElement.push(
          <tr key={j}>
            <th rowSpan={totalApiPersons[i].Names.length}>{totalApiPersons[i].PortFolio}</th>
            <td>{totalApiPersons[i].Names[j]}</td>
            <td>{totalApiPersons[i].NumVotes[j]}</td>
            <td rowSpan={totalApiPersons[i].Names.length}>{totalApiPersons[i].NumVoters}</td>
            <td rowSpan={totalApiPersons[i].Names.length}>{totalApiPersons[i].NumRegVoters}</td>
            <td>{totalApiPersons[i].Winner[j]}</td>
          </tr>
        );
      }
      else if ((j > 0)) {
        cellNodeElement.push(
          <tr key={j}>
            <td>{totalApiPersons[i].Names[j]}</td>
            <td>{totalApiPersons[i].NumVotes[j]}</td>
            <td>{totalApiPersons[i].Winner[j]}</td>
          </tr>
        );
      }
    }
  }
  return cellNodeElement;
}
const voteTableTest = () => {
  const cellNodeElementTest:React.ReactNode[] = [];
  for (let h = 0; h < totalApiSession.length; h++) {
    cellNodeElementTest.push(
      <details className="mb-3 p-2 pb-4 shadow-md bg-app-white  rounded-md hover:-translate-y-1 transition-all duration-75">
        <summary className="text-xl leading-[1.875rem] outline-none">{totalApiSession[h].year} Academic Session</summary>
        <table className="def-table text-center w-[50rem] mt-14 bg-app-white text-base">
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
              voteTable(h)
            }
          </tbody>
        </table>
      </details>
    )
  }
  return cellNodeElementTest;
}
// component
const PastElectIndex = () => {

  return (
    <div className="pt-10 pb-14 ">
      <h2 className="font-bold text-[2.5rem] leading-[3rem] mb-6 text-app-primary ">Past Elections</h2>
      {
        voteTableTest()
      }
    </div>
  )
}

export default PastElectIndex