"use client"
import SenderIcon from '@/icons/sender.icon';
import { MouseEventHandler, ReactNode, useRef, useState } from 'react'
import { APIMsg } from '@/types/api-msg';

const apiMessage: APIMsg = {
  Session: [
    {
      year: "2023",
      messages: [
        {
          name: "Ibrahim Aisha",
          msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, assumenda perspiciatis? Delectus earum nihil odit cumque hic ducimus dolores sunt quo obcaecati! In ratione nulla sunt fuga, amet impedit nostrum maiores magnam deserunt molestiae eos sit, accusantium nemo ut, iusto ullam explicabo! Nostrum, voluptas sequi.",
          date: "Thursday, 3.01pm",
        },
        {
          name: "Joshua Omokhiri",
          msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum.",
          date: "Thursday, 3.00pm",
        },
        {
          name: "Bamidele Flourish Ovayoza",
          msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatibus obcaecati cum, quis tenetur porro nisi ducimus quisquam corporis nulla autem veniam voluptatum dicta non laudantium iure velit vel dignissimos.",
          date: "Thursday, 12.34pm",
        },
      ],
    }
  ]
}

const totalApiMessages = apiMessage.Session[0].messages;
const doings = () => {
  const eachMsg:ReactNode[] = [];
  for (let i = 0; i < totalApiMessages.length; i++) {
    const {date, msg, name} = totalApiMessages[i];
      eachMsg.push(
        <div className="flex flex-col p-4 pt-6 text-app-primary gap-6 bg-app-white shadow-lg rounded-md">
          <p>
            {msg}
          </p>
          <div className="flex justify-between gap-x-4 gap-y-1 flex-wrap xs:text-xs sm:text-sm text-app-grey">
            <span>{name}</span>
            <span>{date}</span>
          </div>
        </div>
      ) 
  }
  return eachMsg;
}

// component
const MSGIndex = () => {
  const [set, isSet] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  
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
    }
  }
  const inputEventClick:MouseEventHandler  = (e) => {
    e.stopPropagation();
    isSet(true);
  }


  return (
    <div className='xs:pt-6 sm:pt-10 pb-14 px-2 xs:text-base sm:text-lg sm:leading-[1.575rem]' onClick={() => isSet(false)}>
      <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] lg:mb-6 text-app-primary ">Prompt Awareness</h2>
      <div className="flex flex-col justify-center items-center p-6 pl-2 gap-8">
        {doings()}

      </div>

      <form method="post" className='flex flex-row justify-center items-end mt-16'>
        <div className={`flex w-[38rem] items-center relative rounded-3xl overflow-hidden bg-app-white ${set ? "shadow-app-message": ""}`}>
          <textarea name="" rows={1}
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
          <SenderIcon
            width={"21px"}
            height={"18px"}
            className='-rotate-[15deg] xs:w-4 xp:w-[1.3125rem] '
          />
        </div>
      </form>
    </div>
  )
}

export default MSGIndex