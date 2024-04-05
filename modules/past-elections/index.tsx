
const PastElectIndex = () => {
  return (
    <div className="pt-10 pb-14 ">
      <h2 className="font-bold text-[2.5rem] leading-[3rem] mb-6 text-app-primary ">Past Elections</h2>
      <details>
        <summary className="text-xl leading-[1.875rem]">2023/2024 Academic Session</summary>
        <table className="def-table text-center w-[50rem] mt-5 bg-app-white">
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
            <tr className="text-start">
              <th rowSpan={5}>President</th>
              <td>OYINDAMOLA, Elijah Israel</td>
              <td>350</td>
              <td rowSpan={5}>550</td>
              <td rowSpan={5}>600</td>
              <td>WINNER</td>
            </tr>
            <tr>
              <td>AKHIHIERO, Joshua Ohiole</td>
              <td>50</td>
              <td></td>
            </tr>
            <tr>
              <td>INUSA, John</td>
              <td>90</td>
              <td></td>
            </tr>
            <tr>
              <td>ABRAHAM, James Theophilus</td>
              <td>50</td>
              <td></td>
            </tr>
            <tr>
              <td>PHEOBE, Peace Ohiole</td>
              <td>20</td>
              <td></td>
            </tr>              
          </tbody>
        </table>
      </details>
    </div>
  )
}

export default PastElectIndex