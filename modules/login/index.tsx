"use client"
import VisibleIcon from '@/icons/visible.icon';
import { useEffect, useState, useReducer, useRef, FormEventHandler } from 'react';
import HiddenIcon from '@/icons/hidden.icon';
import { initialType, actionType } from '@/types/sign-up';
import Link from 'next/link';
import { initialState } from '../sign-up';

const reducer = (state:initialType, action:actionType):initialType => {
  switch (action.type) {
    case "ALL":
      return {...initialState};
    case "MATRIC_":
      const holdMatric = action.payload.length;
      if ((holdMatric < 8) && (holdMatric !== 0)) {
        document.querySelector("#matricNum")!.ariaInvalid = "true";
        return {
          ...state,
          matric: action.payload.toLowerCase(),
          matN_message: "Matric number should be minimum of 8",
        };
      }
      document.querySelector("#matricNum")!.ariaInvalid = "false";
      return {
        ...state,
        matric: action.payload.toUpperCase(),
        matN_message: "",
      };
    case "PASSWORD":
      const holdVal = action.payload.length;
      if ((holdVal < 8) && (holdVal !== 0)) {
        document.querySelector("#password")!.ariaInvalid = "true";
        return {
          ...state,
          password: action.payload,
          pwd_message: "Enter minimum of 8 digits",
        };
      }
      document.querySelector("#password")!.ariaInvalid = "false";
      return {
        ...state,
        password: action.payload,
        pwd_message: "",
      };

    default:
      // wysiwyg... all state maintained
      return {...state};
  }
}

const LoginIndex = () => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const {matric, password, pwd_message, matN_message} = values;
  const [isVisible, setVisible] = useState(true);
  const matricNumRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  // call this handler to submit to route Api
  const submitHandler:FormEventHandler = async (e) => {
    e.preventDefault();
    
    if (((!matN_message && (matricNumRef.current!.innerText === matricNumRef.current!.innerText.toLowerCase())) && !pwd_message ) 
    && ((matricNumRef.current!.ariaInvalid !== "true") 
    && (pwdRef.current!.ariaInvalid !== "true"))) {
      const { matric, password } = values;
      // const personObj = new Submit(matric, password);
    }
  }
    
  useEffect(() => {
    if (password !== "") {
      document.querySelector(".seer")?.classList.replace("hidden", "flex");
      return;
    } 
    document.querySelector(".seer")?.classList.replace("flex", "hidden");
  
  }, [password])
  
  
  return (
    <div className='flex flex-col text-left w-80 gap-6'>
      <h2 className='font-extrabold text-app-primary text-3xl text-center'>Login</h2>
      <form method="POST" onSubmit={submitHandler} id="form_signup" noValidate={false} className='border-y-2 border-y-app-grey text-base py-4'>
        {/* MatricNum session */}
        <label htmlFor="matricNum" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Matric. NO_ </label>
        <br />
        <input type="text" id="matricNum" placeholder="Matric Number" aria-invalid={false} autoFocus value={matric} ref={matricNumRef} 
        onChange={() => {dispatch({
          type: "MATRIC_",
          payload: `${matricNumRef.current!.value}`
          })}
        } className="border border-app-grey rounded-lg focus:border-app-primary placeholder:text-app-grey placeholder:tracking-wider focus:ring-0 mb-4 w-full" required />
        <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">{matN_message}</span>

        {/* Password session */}
        <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label>
        <br />
        <div className="flex w-full min-h-max items-center relative mb-5">
          <input type={`${isVisible? "password":"text"}`} id='password' minLength={8} value={password} placeholder="*********" ref={pwdRef} 
          onChange={() => {dispatch({
            type: "PASSWORD",
            payload: `${pwdRef.current!.value}`
            })}
          } className='border border-app-grey rounded-lg placeholder:tracking-widest focus:border-app-primary focus:ring-0 pr-9 w-full' aria-invalid={false} required />
          <div className="seer hidden items-center w-6 h-full absolute right-2 cursor-pointer" onClick={() => setVisible(!isVisible)}>
          {
            (isVisible) ? <VisibleIcon />:<HiddenIcon />
          }
          </div>
        </div>
        <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3">{pwd_message}</span>

        <input type="submit" value="Sign In" className='w-full lg:text-xl lg:leading-[3rem] bg-app-green text-app-white outline-none ring-0 rounded-md p-1 mb-6 cursor-pointer tracking-wider' />
        <div className="font-semibold mb-4">
          <span>Forgot password? </span><Link href={"/auth/login/api"} className='underline underline-offset-2'>Request OTP</Link>
        </div>
        <div className="font-medium text-center text-sm">
          <span>You have not registered? Click to</span> <Link href={"/auth/sign-in"} className='text-blue-500 underline underline-offset-2 '> Sign up</Link>
        </div>
      </form>
    
    </div>
  )
}

export default LoginIndex