"use client"
import { MouseEventHandler, useRef, useState } from 'react'

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
    <div className='pt-10 pb-14 text-lg leading-[1.575rem]' onClick={() => isSet(false)}>
      <h2 className="font-bold text-[2.5rem] leading-[3rem] mb-6 text-app-primary ">Prompt Awareness</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum alias dicta, ducimus possimus dignissimos commodi facilis modi reiciendis iusto praesentium voluptates quae, repellat sed. Voluptatum in non fugiat aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum alias dicta, ducimus possimus dignissimos commodi facilis modi reiciendis iusto praesentium voluptates quae, repellat sed. Voluptatum in non fugiat aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum alias dicta, ducimus possimus dignissimos commodi facilis modi reiciendis iusto praesentium voluptates quae, repellat sed. Voluptatum in non fugiat aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum alias dicta, ducimus possimus dignissimos commodi facilis modi reiciendis iusto praesentium voluptates quae, repellat sed. Voluptatum in non fugiat aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum alias dicta, ducimus possimus dignissimos commodi facilis modi reiciendis iusto praesentium voluptates quae, repellat sed. Voluptatum in non fugiat aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum alias dicta, ducimus possimus dignissimos commodi facilis modi reiciendis iusto praesentium voluptates quae, repellat sed. Voluptatum in non fugiat aspernatur?
      </p>
      <form method="post" className='flex flex-col justify-center items-center'>
        <div className={`flex w-[38rem] items-center relative mb-5 rounded-3xl overflow-hidden ${set ? "shadow-app-message": ""}`}>
          <textarea name="" id="textA" rows={1}
          onChange={heightMaximiser}
          onSelect={heightMaximiser}
          onClick={inputEventClick}
          ref={ref}
          placeholder='message'
          className='text-base resize-none border-2 border-app-primary/75 focus:border-app-primary/75 focus:ring-0 rounded-3xl w-full'
          ></textarea>
        </div>
      </form>
    </div>
  )
}

export default MSGIndex