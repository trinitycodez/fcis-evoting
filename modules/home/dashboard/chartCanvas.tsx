"use client"
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { propsType2 } from "@/modules/home/dashboard/index";

// component
const CanvasChart = ({ value }: { value: propsType2 }) => {
  const position = value.Position.replaceAll(' ', '_')
  let [set, isSet] = useState(false);

  useEffect(() => {
    console.log('bar ', value)
    isSet(()=>{
      graph(!set, value, position);
      return !set
    })

    return () => {
      graph(set, value, position); 
      isSet(set);
    }
  }, []);
 

  return (
    <>
      {
        (value.Position) ?
        <canvas id={position} style={{"width":"100%","maxWidth":"700px"}} />
        :
        <></>
      }
    </>
  )
}

// datasets
const graph = (val: boolean, resVal: propsType2, position: string) => {

  if (!val && resVal) {
    const ref = document.getElementById(position);
    if (ref) {
      new Chart(position, {
        type: "bar",
        data: {
          labels: resVal.labels,
          datasets: [{
            label: `Candidates for ${position}`,
            data: resVal.results,
            backgroundColor: "#A52A2A",
            borderColor: "#EAD42D",
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category"
            },
            y: {
              beginAtZero: true
            }
          }
        }
      })      
    }
  }
}

export default CanvasChart