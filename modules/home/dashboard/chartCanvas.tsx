"use client"
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";

// component
const CanvasChart = () => {
  let [set, isSet] = useState(false);
  useEffect(() => {
    isSet(()=>{
      graph(!set);
      return !set
    })

    return () => {
      graph(set);
      isSet(set);
    }
  }, []);
 

  return (
    <>
      <canvas id="Chart_Vote" style={{"width":"100%","maxWidth":"700px"}} />
    </>
  )
}

// datasets
const graph = (val:boolean) => {
  if (!val) {
    const ref = document.getElementById("Chart_Vote");
    setTimeout(() => {
      if (ref) {
        const objChart = new Chart("Chart_Vote", {
          type: "bar",
          data: {
            labels: ["Elijah", "Joshua", "Moses", "James", "Peace"],
            datasets: [{
              label: "Candidates' for President",
              data: [350, 50, 90, 50, 20],
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
    }, 1500);
  }
}

export default CanvasChart