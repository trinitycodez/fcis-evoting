"use client"
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import speaker from '@/assets/images/speaker.png'
import Image from 'next/image';


const holdObj = {
  layerImage: {
    border: true,
    width: 320,
    height: 320,
  },
  layerText: true,
  layerWrapper: true,
}


const AuthUser = ({ children }:{ children: ReactNode }) => {
  const [blind, setBlind] = useState(false);  
  const pathname = usePathname(); // to test signUp & login

  const speakText = (textTem: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(textTem)
      window.speechSynthesis.speak(speech)
    } else {
      alert('Text-to-speech not supported in the browser.')
    }
  }
  
  const blindNot: MouseEventHandler = (ev) => {
    ev.stopPropagation();
    localStorage.setItem('blinder', 'false')
    if (navigator.vibrate) {
      navigator.vibrate(200)
    }
    speakText('Voting section set to just user mode. If inputted wrongly, try reload this page to reset value.')
    setBlind(false)
  }
  
  const blindCheck: MouseEventHandler = (ev) =>  {
    ev.stopPropagation();
    localStorage.setItem('blinder', 'true')
    if (navigator.vibrate) {
      navigator.vibrate(200)
    }
    speakText('Voting section set to blind user mode. If inputted wrongly, try reload this page to reset value.')
    setBlind(false)
  }

  const voice = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200)
    }
    speakText("Click 'Yes' to set blind user mode or 'No' to set for just user mode");
  }
  
  useEffect(() => {
    localStorage.setItem('blinder', 'false')
    if (pathname === "/auth/login") {
      setBlind(true);
    }
  }, [pathname]);

  return (
    <>
      {
        (blind) && (
          <div className="flex absolute text-center justify-around items-center bg-app-green/80 z-[1000] w-full h-full gap-5 text-app-grey-white">
            <div className="flex justify-center items-center shadow-sm shadow-app-grey/45 h-16 w-16 bg-app-primary tracking-widest font-bold rounded-full cursor-pointer" onClick={blindNot}>No</div>
            <div className="flex justify-center items-center shadow-sm shadow-app-grey/45 h-16 w-16 bg-app-primary tracking-widest font-bold rounded-full cursor-pointer" onClick={voice}>
              <Image src={speaker} className='h-8 w-8' alt="speaker" />
            </div>
            <div className="flex justify-center items-center shadow-sm shadow-app-grey/45 h-16 w-16 bg-app-primary tracking-widest font-bold rounded-full cursor-pointer" onClick={blindCheck}>Yes</div>
          </div>
        )
      }
      <div className='flex w-full min-h-[600px] h-screen relative items-center justify-center bg-app-white'>
        <div className="flex items-center justify-center xs:absolute sm:relative z-10 min-w-56 px-4 xs:w-full sm:w-[30vw] h-full bg-app-primary text-app-white">
          <Logo layer={holdObj} />
        </div>
        <div className="flex flex-col justify-center items-center relative z-40 h-full xs:w-full sm:w-[70vw] bg-app-white/[0.97]">
          {children}
        </div>
      </div>
    </>
  )
}

export default AuthUser