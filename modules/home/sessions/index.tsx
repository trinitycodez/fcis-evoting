import Image from "next/image"
import profileImage from "@/assets/images/cissa.png"
import { APIContestants } from "@/types/api-session"
import { ReactNode } from "react"

const apiContestant:APIContestants = {
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
}

const totalApiContestant = apiContestant.Contestants;
const contestantEachFunc = (val: number) => {
  const totalApiEachContestant = totalApiContestant[val];
  const cellNodeElement: ReactNode[] = [];
  for (let n = 0; n < totalApiEachContestant.Names.length; n++) {
    cellNodeElement.push(
      <div key={n} className="flex flex-row flex-nowrap w-full gap-4 xs:justify-around lg:justify-between p-4 bg-app-light-primary/[.57]">
        <label htmlFor={ `${n}${totalApiEachContestant.PortFolio}` } className="flex xs:flex-col lg:flex-row flex-wrap gap-y-4" >
          <Image src={ totalApiEachContestant.UserImage[n] } alt="Candidate avatar" height={100} width={100} className="mr-8" />
          <div className="flex flex-col gap-2">
            <span className="inline-flex flex-wrap break-words">Name:&nbsp;<span className="font-normal text-app-primary">{ totalApiEachContestant.Names[n] }</span></span> {/** Name */}
            <span className="inline-flex flex-wrap break-words">Postal Name:&nbsp;<span className="font-extrabold text-app-primary">{ totalApiEachContestant.PostalName[n].toLocaleUpperCase() }</span></span> {/** Nickname */}
          </div>
        </label>
        <input type="radio" required name={ totalApiEachContestant.PortFolio } id={ `${n}${totalApiEachContestant.PortFolio}` } className="form-radio text-app-primary checked:ring-app-primary ring-app-primary" />
      </div>
    )
  }
  return cellNodeElement;
}
const contestantFunc = () => {
  const cellNodeElementTest: ReactNode[] = [];
  for (let m = 0; m < totalApiContestant.length; m++) {
    cellNodeElementTest.push(
      <fieldset className="mb-8 border border-app-primary/70 sm:py-2 xs:p-1 xp:p-4 lg:p-8 my-6 rounded-md w-full lg:w-[87%] " key={m}>
        <legend className="px-2 xs:text-lg sm:text-xl">{totalApiContestant[m].PortFolio}</legend>
        <div className="flex flex-col xs:gap-5 sm:gap-8 lg:gap-12">
          {/* iterator of contestants */}
          { contestantEachFunc(m) }
        </div>

      </fieldset>
    )
  }
  return cellNodeElementTest;
}

// component
const VoteCandidatePage = () => {
  // const user = useSomeContext(); // session user admin (object[]) | student (null)
  // const { admin_stds }: jsonObj = JSON.parse(user); // together
  // const userAlert = useSomeAlert(); // session user (admin | student) alert

  return (
    <section className="xs:py-6 sm:py-10 px-2">
      <div className="flex flex-col justify-center items-center w-full font-bold">
        <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] xs:mb-8 sm:mb-6 text-app-primary w-full text-start">Vote Your Choice</h2>
        <form className="flex flex-col justify-center items-center w-full xs:text-base sm:text-lg sm:leading-[1.575rem]">
          { contestantFunc() }
        </form>
      </div>
    </section>
  )
}

export default VoteCandidatePage