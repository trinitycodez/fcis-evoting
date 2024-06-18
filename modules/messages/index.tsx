"use client"
import SenderIcon from '@/icons/sender.icon';
import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react'
import { APIMsg } from '@/types/api-msg';
import { useSomeContext } from '@/app/lib/server/context-provider';
import { useFormState } from 'react-dom';
import { Message } from '@/app/lib/server/validate-message/submit';
import { useSomeAlert } from '@/app/lib/server/alert-provider';
import { jsonObj } from '@/types/all-user';


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
const MSGIndex = () => {
  const user = useSomeContext(); // session user admin (object[]) | student (null)
  const { admin_stds }: jsonObj = JSON.parse(user); // together
  const userAlert = useSomeAlert(); // session user (admin | student) alert

  const [set, isSet] = useState(false);
  const [msg, setMsg] = useState('');
  const [isState, setState] = useState<[APIMsg, number]>(); // prompt icon
  const ref = useRef<HTMLTextAreaElement>(null);
  const btn_ref = useRef<HTMLButtonElement>(null);
  const [state, msgAction] = useFormState(Message, undefined);

  useEffect(() => {
    setState(userAlert)
  }, [])

  
  const heightMaximiser = () => {
    if (ref.current) {
      const holdRef = ref.current;
      console.log(holdRef.scrollHeight);
      // Decreases length
      if (((holdRef.scrollHeight > 40) && (holdRef.scrollHeight <= 64)) && (holdRef.rows === 2)) {
        holdRef.rows -= 1; // 1
      } else if (((holdRef.scrollHeight > 64) && (holdRef.scrollHeight <= 88)) && (holdRef.rows === 3)) {
        holdRef.rows -= 1; // 2
      } else if (((holdRef.scrollHeight > 88) && (holdRef.scrollHeight <= 112)) && (holdRef.rows === 4)) {
        holdRef.rows -= 1; // 3
      }
      // Increases length
      if ((holdRef.scrollHeight > 40) && (holdRef.rows < 2)) {
        holdRef.rows += 1; // 2
      } else if (holdRef.scrollHeight > 64 && (holdRef.rows < 3)) {
        holdRef.rows += 1; // 3
      } else if (holdRef.scrollHeight > 88 && (holdRef.rows < 4)) {
        holdRef.rows += 1; // 4
      }
      
      if (btn_ref.current) {
        if ((ref.current.value === '') || (ref.current.value === null) || (ref.current.value === undefined)) {
          return btn_ref.current.disabled = true;
        }
        btn_ref.current.disabled = false;
  
      }
    }
  }

  const inputEventClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    isSet(true);
  }

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
      <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] lg:mb-6 text-app-primary ">Prompt Awareness</h2>
      
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

      {
        (admin_stds.matricNumber !== null) && (
          <form method="POST" action={ (formData) => { msgAction(formData) }} onSubmit={displayClear} className='flex flex-row justify-center items-end mt-16 sm:mb-24 lg:mb-40'>
            <div className={`flex w-[38rem] items-center relative rounded-3xl overflow-hidden bg-app-white ${set ? "shadow-app-message": ""}`}>
              <textarea id='message' name="message" rows={1}
              onChange={heightMaximiser}
              onSelect={heightMaximiser}
              onSelectCapture={heightMaximiser} // delete
              onClick={inputEventClick}
              ref={ref}
              placeholder='message'
              className='text-base resize-none border border-app-primary/75 focus:border-app-white focus:ring-0 rounded-3xl w-full pl-4'
              ></textarea>
            </div>
            <div className="flex justify-center items-center xp:h-11 ml-4 p-3 bg-app-primary rounded-full cursor-pointer ">
              <button type="submit" ref={btn_ref} disabled={true} className='w-full h-full'>
                <SenderIcon
                  width={"21px"}
                  height={"18px"}
                  className='-rotate-[15deg] xs:w-4 xp:w-[1.3125rem] '
                />

              </button>
            </div>
          </form>
        )
      }

    </div>
  )
}

export default MSGIndex