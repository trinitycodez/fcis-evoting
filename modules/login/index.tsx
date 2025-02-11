"use client"
import VisibleIcon from '@/icons/visible.icon';
import { useEffect, useState, useReducer, useRef } from 'react';
import HiddenIcon from '@/icons/hidden.icon';
import Link from 'next/link';
import { initialState, reducer } from '@/types/validate';
import { useFormState, useFormStatus } from 'react-dom';
import { Login } from '@/app/lib/server/validate-login/login';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/app/lib/server/login-provider';
import { LoginOTP } from '@/app/lib/server/validate-otp/login-otp';

// component
const LoginIndex = () => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const {matric, password, pwd_message, matN_message} = values;
  const [isVisible, setVisible] = useState(true);
  const [isHide, setHide] = useState(true);
  const [isPwd, setPwd] = useState(true);
  const matricNumRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLSpanElement>(null);
  const [state, login] = useFormState(Login, undefined);
  const [stateOtp, loginOtp] = useFormState(LoginOTP, undefined);
  const { pending } = useFormStatus();
  const router = useRouter();
  const loginContext = useLoginContext();

  const clearData = () => {
    setTimeout(() => {
      dispatch({
        type: "ALL",
        payload: ""
      });
    }, 300);
  }

  if ((state?.messageServer === 'Success') || loginContext === 'Success') {
    'use server'
    router.replace('/')
  } else if ((state?.messageServer === 'Error') || loginContext === 'Error') {
    'use server'
    if (state) state.messageServer = '';
    alert("Unable to login this account, kindly check your internet connection or try again.");
  } 
  if (stateOtp?.messageServer === 'Successful') {
    'use server'
    if (state) state.messageServer = '';
    alert("OTP sent successfully sent to mail.");
    setHide(!isHide);
    setPwd(!isPwd);
  } else if (stateOtp?.messageServer === 'ErrorOTP') {
    'use server'
    if (state) state.messageServer = '';
    alert("Further actions will damage this device!");
    setHide(!isHide)
  }

  useEffect(() => {
    if (password !== "") {
      document.querySelector(".seer")?.classList.replace("hidden", "flex");
      return;
    } 
    document.querySelector(".seer")?.classList.replace("flex", "hidden");
  
  }, [password]);

  const changeState = () => {
    setHide(!isHide);
  }
  
  return (
    <>
      <div className='flex flex-col text-left xs:w-60 xp:w-[17rem] sm:w-72 lg:w-80 gap-6'>
        <h2 className='font-extrabold text-app-primary xs:text-2xl md:text-3xl text-center'>Login</h2>

        <form method="POST" onSubmit={clearData} action={ (formData) => { (isHide)? login(formData): loginOtp(formData)}} id="form_signup" noValidate={false} className='border-y-2 border-y-app-grey text-base py-3'>
          {
            (isHide) ?
            <>
              {/* MATRIC-NUMBER */}
              <label htmlFor="matricNum" className="inline-block mb-2 font-semibold after:content-['*'] after:text-red-500">Matric. NO_ </label>
              <br />
              <input type="text" id="matricNum" name='matricNum' placeholder="Matric Number" aria-invalid={false} autoFocus value={matric} ref={matricNumRef}
              onChange={() => {dispatch({
                type: "MATRIC_",
                payload: `${matricNumRef.current!.value}`
                })}
              } className="border border-app-grey rounded-lg focus:border-app-primary placeholder:text-app-grey placeholder:tracking-wider focus:ring-0 mb-4 w-full" required />
              { (state?.errors?.matricNum && !matN_message) && 
              <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
                {state.errors.matricNum}
              </span> }
              <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
                {matN_message}
              </span>

              {/* PASSWORD */}
              {
                (isPwd) ? 
                <>
                  <label htmlFor="password" className="inline-block mb-2 font-semibold after:content-['*'] after:text-red-500">Password </label>
                  <br />
                  <div className="flex w-full min-h-max items-center relative mb-5">
                    <input type={`${isVisible? "password":"text"}`} id='password' name='password' minLength={8} value={password} placeholder="*********" ref={pwdRef} 
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
                  { (state?.errors?.password && !pwd_message) && 
                  <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
                    {state.errors.password}
                  </span> }
                  <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3">{pwd_message}</span>
                </>
                :
                <>
                  <label htmlFor="otp" className="inline-block mb-2 font-semibold after:content-['*'] after:text-red-500">OTP&nbsp;</label>
                  <br />
                  <div className="flex w-full min-h-max items-center relative mb-5">
                    <input type={`${isVisible? "password":"text"}`} id='otp' name='otp' minLength={6} placeholder="OTP message" className='border border-app-grey rounded-lg placeholder:tracking-widest focus:border-app-primary focus:ring-0 pr-9 w-full' required />
                    <div className="seer hidden items-center w-6 h-full absolute right-2 cursor-pointer" onClick={() => setVisible(!isVisible)}>
                    {
                      (isVisible) ?<VisibleIcon />:<HiddenIcon />
                    }
                    </div>
                  </div>
                  { (state?.errors?.password && !pwd_message) && 
                  <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
                    {state.errors.password}
                  </span> }
                </>
              }
            </>
            :
            <>
              {/* MATRIC-NUMBER */}
              <label htmlFor="matricNum" className="inline-block mb-2 font-semibold after:content-['*'] after:text-red-500">Matric. NO_ </label>
              <br />
              <input type="text" id="matricNum" name='matricNum' placeholder="Matric Number" aria-invalid={false} autoFocus value={matric} ref={matricNumRef} 
              onChange={() => {dispatch({
                type: "MATRIC_",
                payload: `${matricNumRef.current!.value}`
                })}
              } className="border border-app-grey rounded-lg focus:border-app-primary placeholder:text-app-grey placeholder:tracking-wider focus:ring-0 mb-4 w-full" required />
              { (state?.errors?.matricNum && !matN_message) && 
              <span className="flex h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
                {state.errors.matricNum}
              </span> }
              <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3 ">
                {matN_message}
              </span>
            </>
          }

          <input type="submit" value={isHide? "Sign In": "Request OTP"} className={`w-full lg:text-xl lg:leading-[3rem] bg-app-green text-app-white outline-none ring-0 rounded-md p-2 mb-6 cursor-pointer tracking-wider`} />
          {
            isHide?
            <>
              <div className="font-semibold mb-4 xs:tracking-tight xp:tracking-normal">
                <span>Forgot password? </span><span id='otp' className='underline underline-offset-2 cursor-pointer' ref={otpRef} onClick={changeState}>Request OTP</span>
              </div>
              <div className="font-medium text-center text-sm">
                <span>You have not registered? Click to</span> <Link href={"/auth/sign-up"} className='text-blue-500 underline underline-offset-2 '>
                  {
                    (isHide) ? <>Sign&nbsp;up</> : <>Send</>
                  }
                </Link>
              </div>
            </>
            :
            <>
             <span className='underline underline-offset-2 cursor-pointer' onClick={changeState}>Back</span>
            </>
          }
        </form>
      
      </div>
    </>
  )
}

export default LoginIndex