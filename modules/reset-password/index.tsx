"use client"
import SenderIcon from '@/icons/sender.icon';
import { MouseEventHandler, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { APIMsg } from '@/types/api-msg';
import { useSomeContext } from '@/app/lib/server/context-provider';
import { useFormState } from 'react-dom';
import { useSomeAlert } from '@/app/lib/server/alert-provider';
import { jsonObj } from '@/types/all-user';
import { initialState, reducer } from '@/types/validate';
import VisibleIcon from '@/icons/visible.icon';
import HiddenIcon from '@/icons/hidden.icon';
import { ChangePassword } from '@/app/lib/server/validate-change-pwd/changepwd';


const presentView = (res: [APIMsg, number]) => {
  const totalApiMessages = res[0].Session.messages;
  const eachMsg: ReactNode[] = [];

  if (res[0].status === 201) {
    eachMsg.push(
      <div className="flex flex-col w-fit p-4 pt-6 text-app-primary gap-6 bg-app-white shadow-lg rounded-md">
        <p className='break-all'>
          {totalApiMessages[0].Statement}
        </p>
      </div>
    )
    return eachMsg;
  }

  for (let i = 0; i < totalApiMessages.length; i++) {
    console.log(res[1])
    const { MessageDate, Statement, ID } = totalApiMessages[i];
     eachMsg.push(
      <div key={i} className="flex flex-col relative w-fit p-4 pt-6 text-app-primary gap-6 bg-app-white shadow-lg rounded-md">
        {/* Announcer of new messages */}
        {
          (i < res[1]) && (
          <span className="flex absolute -top-2 right-1 text-app-grey-white bg-green-400 px-1 rounded-full text-sm font-bold">new!</span>)
        }
        <p className='break-all'>
          {Statement}
        </p>
        <div className="flex justify-between gap-x-4 gap-y-1 flex-wrap xs:text-xs sm:text-sm text-app-grey">
          <span>{ID}</span>
          <span>{MessageDate}</span>
        </div>
      </div>
    )
  }

  return eachMsg;
}


// component
const ResetPassword = () => {
  const user = useSomeContext(); // session user admin (object[]) | student (null)
  const { admin_stds }: jsonObj = JSON.parse(user); // together
  const userAlert = useSomeAlert(); // session user (admin | student) alert

  const [set, isSet] = useState(false);
  const [msg, setMsg] = useState('');
  const [isState, setState] = useState<[APIMsg, number]>(); // prompt icon
  const ref = useRef<HTMLTextAreaElement>(null);
  const btn_ref = useRef<HTMLButtonElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [state, pwdAction] = useFormState(ChangePassword, undefined);

  const [values, dispatch] = useReducer(reducer, initialState);
  const { password, pwd_message } = values;


  useEffect(() => {
    setState(userAlert)
  }, [])

  
  if (state?.message === 'Success') {
    'use server'
    state.message = '';
    setMsg('')
    alert("Successfully sent this message");
  } else if (state?.message === 'Error') {
    'use server'
    state.message = '';
    alert("Unable to send message. Kindly check your internet connection or try again.");
  }

  const displayClear = () => {
    if (ref.current?.value) { setMsg(ref.current!.value) }
    setTimeout(() => {
      ref.current!.value = ''
      ref.current!.rows = 1
    }, 200);
  }


  return (
    <div className='xs:pt-6 sm:pt-10 pb-14 px-2 xs:text-base sm:text-lg sm:leading-[1.575rem]' onClick={() => isSet(false)}>
      <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] lg:mb-6 text-app-primary ">Change Password</h2>
      
      <div className="flex flex-col justify-center items-center p-6 pl-2 gap-8">
        { (!isState) && <span className='xs:text-xs xp:text-sm md:text-base pl-4 font-bold'>Loading...</span> }
        { (isState) && presentView(isState) }
        {
          (msg) && (<div className="flex flex-row max-w-full w-fit p-4 pt-6 text-app-primary gap-6 bg-app-white shadow-lg rounded-md">
            <p className='break-all'>
              { msg }
            </p>
          </div>)
        }
      </div>

      
    <form method="POST" action={ (formData) => { pwdAction(formData) }} onSubmit={displayClear} className='flex flex-row justify-center items-end mt-16 sm:mb-24 lg:mb-40'>
      {/* password */}
      <label htmlFor="password" className="inline-block mb-2 font-semibold after:content-['*'] after:text-red-500">Password </label>
        <br />
        <div className="flex w-full min-h-max items-center relative mb-4">
          <input type="password" id='password' name='password' minLength={8} value={password} placeholder="*********" ref={pwdRef} 
          onChange={() => {dispatch({
              type: "PASSWORD",
              payload: `${pwdRef.current!.value}`,
            })}
          } className='border border-app-grey rounded-lg placeholder:tracking-widest focus:border-app-primary focus:ring-0 pr-9 w-full' aria-invalid={false} required />
          { (state?.errors?.password1 && !pwd_message) && 
          <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
            {state.errors.password1}
          </span> }
          <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3">{pwd_message}</span>
        </div>

        {/* confirm password */}
      <label htmlFor="password" className="inline-block mb-2 font-semibold after:content-['*'] after:text-red-500">Confirm Password </label>
        <br />
        <div className="flex w-full min-h-max items-center relative mb-4">
          <input type="password" id='password' name='password' minLength={8} value={password} placeholder="*********" ref={pwdRef} 
          onChange={() => {dispatch({
              type: "PASSWORD",
              payload: `${pwdRef.current!.value}`,
            })}
          } className='border border-app-grey rounded-lg placeholder:tracking-widest focus:border-app-primary focus:ring-0 pr-9 w-full' aria-invalid={false} required />
          { (state?.errors?.password2 && !pwd_message) && 
          <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
            {state.errors.password2}
          </span> }
          <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3">{pwd_message}</span>
        </div>
        
      <input type='submit' className="flex justify-center items-center xp:h-11 ml-4 p-3 bg-app-primary rounded-full cursor-pointer " />
      {/* <button type="submit" ref={btn_ref} disabled={true} className='w-full h-full'>
      </button> */}
    </form>

    </div>
  )
}

export default ResetPassword