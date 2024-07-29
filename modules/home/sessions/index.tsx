"use client"

import { VotedCandidates } from "@/app/lib/server/validate-votes/submit-vote";
import { useVotersContext } from "@/app/lib/server/voters-provider";
import useLongPress from "@/app/lib/ui/useLongPress";
import { APIContestants } from "@/types/api-session";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode, TouchEventHandler, useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom";

/*const apiContestant: APIContestants = {
  Contestants: [
    {
      PortFolio: "President",
      Names: ["ELIJAH, Oyindamola Israel", "AKHIHIERO, Joshua Ohiole", "INUSA, John Yahaya", "ABRAHAM, James Theophilus", "OHEOBE, Peace Ohiole"],
      PostalName: ["Elitech", "Joshrex", "Simply John", "James", "Peace"],
      UserImage: [profileImage, profileImage, profileImage, profileImage, profileImage],
    },
    {
      PortFolio: "Vice President",
      Names: ["JOSEPH, Pascaline Ovayoza", "IBRAHIM, Aisha", "ADEYEYE, Abigail"],
      PostalName: ["Joselin", "Yeesha", "Abigail"],
      UserImage: [profileImage, profileImage, profileImage],
    },
    {
      PortFolio: "General Secretary",
      Names: ["OLOWOYORI, Emmanuel Taiwo"],
      PostalName: ["Trinity"],
      UserImage: [profileImage],
    },
  ]
}*/

const speakText = (textTem: string) => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(textTem)
    window.speechSynthesis.speak(speech)
    return;
  }
  alert('Text-to-speech not supported in the browser.')
}

const objArr: string[] = [];

// component
const VoteCandidatePage = () => {
  const useCandidates = useVotersContext(); // session user (admin | student) students
  const [isPagePresent, setPagePresent] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [isCandidate, setCandidate] = useState("");
  const [isReady, setReady] = useState<APIContestants>();
  const [state, dispatch] = useFormState(VotedCandidates, undefined)
  const router = useRouter()
  const reload = () => router.replace('http://localhost:3000');
  

  const func = (value: string) => {
    objArr.push(value);
    let obj = new Set(objArr);
    let arrBool = Array.from(obj).length === isReady?.Contestants.length;
    console.log('objArr ', objArr);
    (arrBool) ? setSubmit(true) : setSubmit(false)
  }

  // start
  const voiceSubmit: MouseEventHandler = (ev) => {
    let element = ev.currentTarget as HTMLButtonElement
    if (isSubmit === true) {
      element.disabled = false;
      speakText('Click again to submit data')
      return;
    }
    speakText('Submit button locked, kindly fill other boxes to enable submit button')
  } 
  
  const voiceCandidate = (name: string, portfolio: string) => {
    // single click
    const valueLocal = localStorage.getItem("blinder") === 'true';
    console.log(name)
    if (valueLocal) {
      if (navigator.vibrate) {
        navigator.vibrate(200)
      }
      // written code not checked in element
      speakText(`${name} for ${portfolio}, not selected`);      
    }
  }
  const onLongPress = () => {
    // alert("economic situation");
    const valueLocal = localStorage.getItem("blinder") === 'true';
    if (valueLocal) {
      let ev = document.getElementById(`${isCandidate}`) as HTMLInputElement
      func(ev!.id)
      ev.checked = true;
      console.log(ev)
      speakText("You've selected this candidate")
    }
  }
  const longPressEvent = useLongPress(onLongPress, 400)


  const contestantEachFunc = (val: number, totalApiContestant: APIContestants) => {
    const totalApiEachContestant = totalApiContestant.Contestants[val];
    const { PostalName, PortFolio } = totalApiEachContestant
    const cellNodeElement: ReactNode[] = [];
    const name = totalApiEachContestant.PortFolio.replaceAll(" ", "_");
  
    for (let n = 0; n < totalApiEachContestant.Names.length; n++) {
      let nickNameAlias = totalApiEachContestant.PostalName[n];
      // let nickNameAlias = totalApiEachContestant.PostalName[n].replaceAll(" ", "_");
      if (nickNameAlias === null) {
        nickNameAlias = "Nickname";
      } else {
        nickNameAlias = nickNameAlias.replaceAll(" ", "_");
      }
      
      cellNodeElement.push(
        <div key={n} id={`${name}`} className="flex flex-row flex-nowrap w-full gap-4 xs:justify-around lg:justify-between p-4 bg-app-light-primary/[.57]" {...longPressEvent} onClick={(e) => {
          e.preventDefault()
          setCandidate(totalApiEachContestant.MatricNumbers[n])
          let element = e.currentTarget.lastElementChild as HTMLInputElement;
          element.checked = false;
          voiceCandidate(PostalName[n], PortFolio)
        }} >
          <label htmlFor={`${totalApiEachContestant.MatricNumbers[n]}`} className="flex xs:flex-col lg:flex-row flex-wrap gap-y-4" >
            <Image src={totalApiEachContestant.UserImage[n]} alt="Avatar" height={100} width={100} className="mr-8" />
            <div className="flex flex-col gap-2">
              <span className="inline-flex flex-wrap break-words">Name:&nbsp;<span className="font-normal text-app-primary">{totalApiEachContestant.Names[n]}</span></span> {/** Name */}
              <span className="inline-flex flex-wrap break-words">Postal Name:&nbsp;<span className="font-extrabold text-app-primary">{
                (totalApiEachContestant.PostalName[n] !== null) &&
                totalApiEachContestant.PostalName[n].toLocaleUpperCase()}</span></span> {/** Nickname */}
            </div>
          </label>
          <input type="radio" required value={`${nickNameAlias}`} name={name} id={`${totalApiEachContestant.MatricNumbers[n]}`} className={`form-radio checked:ring-app-primary ring-app-primary ${isPagePresent? 'text-app-white': 'text-app-primary'}`} />
        </div>
      )
    }
    return cellNodeElement;
  }
  const contestantFunc = (totalApiContestant: APIContestants) => {
    console.log("hello!!! ", totalApiContestant)
    const cellNodeElementTest: ReactNode[] = [];
    for (let m = 0; m < totalApiContestant.Contestants.length; m++) {
      if (totalApiContestant.Contestants[m].Names.length === 0) {
        continue;
      }
      cellNodeElementTest.push(
        <fieldset className="mb-8 border border-app-primary/70 sm:py-2 xs:p-1 xp:p-4 lg:p-8 my-6 rounded-md w-full lg:w-[87%] " key={m}>
          <legend className="px-2 xs:text-lg sm:text-xl">{totalApiContestant.Contestants[m].PortFolio}</legend>
          <div className="flex flex-col xs:gap-5 sm:gap-8 lg:gap-12">
            {/* iterator of contestants */}
            {contestantEachFunc(m, totalApiContestant)}
          </div>
  
        </fieldset>
      )
    }
    return cellNodeElementTest;
  }
  // end

  if (state?.message === 'Success') {
    'use server'
    state.message = '';
    const valueLocal = localStorage.getItem("blinder") === 'true';
    if (valueLocal) speakText("Successfully voted");
    alert("Successfully voted");
    reload();
  } else if (state?.message === 'Error') {
    'use server'
    state.message = '';
    const valueLocal = localStorage.getItem("blinder") === 'true';
    if (valueLocal) speakText("Unable to vote. Kindly check your internet connection or try again.");
    alert("Unable to vote. Kindly check your internet connection or try again.");
  } else if (state?.message === 'Voted') {
    'use server'
    console.log("Voted...")
    state.message = '';
    alert("You can only vote once");
    reload();
  }

  useEffect(() => {
    setReady(useCandidates)
    const local = localStorage.getItem("blinder");
    (local==='true') ? setPagePresent(true): setPagePresent(false)
    
  }, [])

  return (
    <section className="xs:py-6 sm:py-10 px-2">
      <div className="flex flex-col justify-center items-center w-full font-bold">
        <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] xs:mb-8 sm:mb-6 text-app-primary w-full text-start">Vote Your Choice</h2>
        <form action={(formData) => { dispatch(formData) }} className="flex flex-col justify-center items-center w-full xs:text-base sm:text-lg sm:leading-[1.575rem]">
          {(!isReady) &&
            <span className='xs:text-xs xp:text-sm md:text-base pl-4 font-bold'>Loading...</span>
          }
          {(isReady) &&
            <>
            {
              (isPagePresent) ?
              <>
                {contestantFunc(isReady)}
                <button type={'submit'} className={`${'bg-green-400'} text-app-grey-white w-4/5 py-2 rounded-md xs:mb-8 md:mb-16 border-none ring-0`} onClick={voiceSubmit}>Submit</button>
              </> :
              <>
                {contestantFunc(isReady)}
                <button type={'submit'} className="bg-green-400 text-app-grey-white w-4/5 py-2 rounded-md xs:mb-8 md:mb-16 border-none ring-0">Submit</button>
              </>
            }
            </>
          }
        </form>
      </div>
    </section>
  )
}

export default VoteCandidatePage