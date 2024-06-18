"use client"

import { ReactNode, createContext, useContext } from "react"

const UserContext = createContext('')
const UserContextRegStudts = createContext(0)

export const useRegStudtContext = () => {
  return useContext(UserContextRegStudts);
}
export const useSomeContext = () => {
  return useContext(UserContext);
}

export const ContextProvider = ({ valuePass, total, children }: { valuePass: string, total: number, children: ReactNode }) => {
// export const ContextProvider = ({ valuePass, children }: { valuePass: string, children: ReactNode }) => {
  
  return (
    <UserContext.Provider value={`${valuePass}`}>
      <UserContextRegStudts.Provider value={total}>
        {children}
      </UserContextRegStudts.Provider>
    </UserContext.Provider>
  );
}