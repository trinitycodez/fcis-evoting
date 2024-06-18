"use client"
import { ReactNode, useContext, useEffect, useState } from "react";
import CanvasChart from "./chartCanvas";
import { useRegStudtContext, useSomeContext } from "@/app/lib/server/context-provider";
import { jsonObj } from "@/types/all-user";
import { useNumVotesContext } from "@/app/lib/server/numvotes-provider";
import PieCanvasChart from "./pieCanvas";
import Addition from "@/icons/addition.icon";
import ModalIndex from "@/app/lib/ui";
import { UserContext } from "@/app/(student)/template";

export type propsType = {
  Position: string;
  labels: string[];
  results: number[];
}[]
export type propsType2 = {
  Position: string;
  labels: string[];
  results: number[];
}

const presentChart = (val: propsType) => {
  console.log(val);
  let holdParent: ReactNode[] = []
  for (let i = 0; i < val.length; i++) {
    if (val[i].labels.length === 0) {
      continue;
    } else if ((val[i].labels.length > 0) && (val[i].labels.length < 5)) {
      holdParent.push(<PieCanvasChart value={val[i]} />);
    } else if (val[i].labels.length >= 5) {
      holdParent.push(<CanvasChart value={val[i]} />);
    }
  }
  return holdParent
}

// this is the dashboard === '/'
const HomeDashboard = () => {
  const [isState, setState] = useState<propsType>()
  const [name, setName] = useState('')
  const [time, setTime] = useState('00:00 - 00:00')
  const {value, setValue} = useContext(UserContext); // delete soon
  const user = useSomeContext(); // session user admin (object[]) | student (null) string of json
  const regStudts = useRegStudtContext();
  const { admin_stds, others }: jsonObj = JSON.parse(user); // together
  const { totalVotes, data, startTime, endTime } = useNumVotesContext();

  const display = () => setValue(!value, '1');

  useEffect(() => {
    // first Name
    let resName = others.Name
    let posStart = resName.indexOf(',')
    let posEnd = resName.indexOf(' ', (posStart+2))
    let name = resName.substring((posStart+2), posEnd)
    setName(name)
  }, [])
  
  useEffect(() => {
    setState(data)
    let concat = startTime+ " " + "-" + " " + endTime
    setTime(concat)
  }, [])
  
  return (
    <>
      <section className="xs:py-6 sm:py-10 px-2 flex flex-col justify-center items-center">
        <div className="flex xs:flex-col xp:flex-row font-original justify-between font-extrabold xs:text-lg md:text-xl mb-10 w-full">
          <p className="flex flex-row flex-wrap">
            <span>
              {
                (name) &&
                <>
                  Welcome back!&nbsp;
                </>
              }
            </span>
            <span className="text-app-yellow">{ name }</span>
          </p>
          <div className="flex flex-row justify-center items-center gap-2">
            <span className="text-app-primary/90 font-App-Inter">{ time }</span>
            {/* admin /user */}
            {
              (admin_stds.matricNumber !== null) && (
                <Addition width={'20px'} height={'20px'} onClick={display} />
              )
            }
          </div>

        </div>
        <div className="flex xs:flex-col lg:flex-row justify-around items-start font-normal xs:text-lg sm:text-xl text-app-white mb-16 w-full xs:gap-8 lg:gap-36">
          <p className="flex flex-col gap-4 xs:w-full lg:w-64 max-w-full p-6 bg-app-green rounded-2xl shadow-lg">
            <span className="inline-flex">Total Number of Votes</span>
            <span className="inline-flex font-extrabold xs:text-2xl md:text-3xl">{ totalVotes }</span>
          </p>
          <p className="flex flex-col gap-4 xs:w-full lg:w-64 max-w-full p-6 bg-app-yellow rounded-2xl shadow-lg">
            <span className="inline-flex">Total Number of Registered Students</span>
            <span className="inline-flex font-extrabold xs:text-2xl md:text-3xl">{ regStudts }</span>
          </p>
        </div>
        { 
          (!isState) && <span className='xs:text-xs xp:text-sm md:text-base pl-4 font-bold'>Loading...</span>
        } {
          (isState) && presentChart(isState) // chart
        }
      </section>
    </>
  );
}

export default HomeDashboard
