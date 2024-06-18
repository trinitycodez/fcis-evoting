"use client"
import { Chart } from "chart.js/auto";
import { ReactNode, useEffect, useState } from "react";
import { propsType2 } from "@/modules/home/dashboard/index";

// component
const PieCanvasChart = ({ value }: { value: propsType2 }) => {
  const position = value.Position.replaceAll(' ', '_')
  let [set, isSet] = useState(false);
  
  useEffect(() => {
    console.log('pie ', value)
    isSet(()=>{
      todo(!set, value, position);
      return !set
    })

    return () => {
      todo(set, value, position); 
      isSet(set);
    }
  }, []);

  return (
    <>
      {
        (value.Position) ?
        <>
          <canvas id={position} className="w-full h-full max-w-[450px] max-h-[450px] mb-28 "  />
        </>
        :
        <></>
      }
    </>
  )
}
const todo = (val: boolean, resVal: propsType2, position: string) => {
  // datasets
  const ref = document.getElementById(position);  
  if (!val && (resVal && ref)) {
    if (resVal.results.length > resVal.labels.length) resVal.results.pop();
    new Chart(position, {
      type: "pie",
      data: {
        labels: resVal.labels,
        // labels: ["Elijah", "Joshua", "Moses", "James", "Peace"],
        datasets: [{
          label: `Candidates for ${resVal.Position}`,
          data: resVal.results,
          borderWidth: 0
        }],
      },
    });      
  }
}

export default PieCanvasChart