"use client"

import { APIMsg } from "@/types/api-msg"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const initialState =  {
  status: 201,
  Session: {
    messages: [{
      ID: '',
      Statement: '',
      MessageDate: ''
    }]
  }
}

const UserAlert = createContext<[APIMsg, number]>([initialState, 0])

export const useSomeAlert = () => {
  return useContext(UserAlert);
}

export const AlertProvider = ({ children }: { children: ReactNode }) => {

  const [isState, setState] = useState<[APIMsg, number]>();
  useEffect(() => {
    fetch(`http://localhost:3000/messages/api`, {
      method: "GET",
      mode: "cors",
      headers: {
        'API-Key': process.env.AUTH_SECRET!,
        'Origin': process.env.NEXT_AUTH_URL!,
        'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
        'Access-Control-Request-Method': 'GET'
      }
    })
    .then((res) =>
      res.json()
    )
    .then((res) => {
      console.log(res);
      const { Session } = res as APIMsg
      const dataLength = Session.messages.length;
      const getLocalDataLength: number = +localStorage.getItem('_alert_msg')!;
      const diff = dataLength - getLocalDataLength
      localStorage.setItem('_alert_msg', dataLength.toString());
      setState([res, diff])
    })
    .catch((e: Error) => {
      console.error(e.message)
    })

  }, [])

  return (
    <>
      {
        (isState) ? 
        <UserAlert.Provider value={isState} >
          {children}
        </UserAlert.Provider>
        :
        <>
          {children}
        </>
      }
    </>
  );
}