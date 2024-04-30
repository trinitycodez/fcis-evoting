import { initialState, reducer } from "@/types/validate";
import { FC, useReducer, useRef } from "react"
import { useFormState, useFormStatus } from "react-dom";
import { Update } from "../server/update/update-acct";

const UserUpdate: FC = () => {
  const [values, dispatch] = useReducer(reducer, initialState)
  const {image, postalName, postalNameMsg, userImgMsg} = values;
  const postalNameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [state, update_acct] = useFormState(Update, undefined)
  const { pending } = useFormStatus();

  return (
    <>
      <form method="POST" action={(!postalNameMsg && !userImgMsg )? update_acct:"#"} className="flex flex-col relative justify-center p-8 w-full xp:max-w-[19rem] sm:max-w-[30rem] xs:h-full sm:h-fit max-h-[80vh] overflow-y-auto overflow-x-hidden bg-app-light-primary xs:rounded-t-xl xp:rounded-none shadow-lg" onClick={(e)=> e.stopPropagation()}>
        {/* POSTAL-NAME  */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="postalName" className="inline-block font-semibold w-fit after:content-['*'] after:text-red-500">Postal Name: </label>
          <input type="text" name="postalName" id="postalName" value={postalName} ref={postalNameRef} aria-invalid={false} placeholder="Nickname" className="placeholder:tracking-wider focus:border-app-primary focus:outline-none focus:ring-0"
          onChange={() => {dispatch({
            type: "NICKNAME",
            payload: `${postalNameRef.current?.value}`
          })}} />
        </div>
        { state?.errors.nickname && 
        <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-4 ">
          {state.errors.nickname}
        </span> }
        <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-4 ">
          {postalNameMsg}
        </span>
        
        {/* PASSPORT */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="userImage" className="inline-block font-semibold w-fit after:content-['*'] after:text-red-500">Postal Passport: </label>
          <input type="file" name="userImage" id="userImage" accept=".jpeg,.png,.jpg" value={image} ref={imageRef} aria-invalid={false} className="bg-app-white focus:outline-none focus:ring-0"
          onChange={() => {dispatch({
            type: "IMAGE",
            payload: `${imageRef.current?.value}`
          })}} />
        </div>
        { state?.errors.passport && 
        <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-8 ">
          {state.errors.passport}
        </span> }
        <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-8 ">
          {userImgMsg}
        </span>

        <input type="submit" value={pending? "Sending...":"Submit"} className={`w-full lg:text-xl lg:leading-[3rem] bg-app-green text-app-white outline-none ring-0 rounded-md p-2 mb-6 cursor-pointer tracking-wider ${pending?"italic":""}`} />
      </form>
    </>
  )
}

export default UserUpdate