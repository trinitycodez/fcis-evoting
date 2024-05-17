"use client"

import { ReactNode, createContext, useContext } from "react"

const UserContext = createContext('')

export const useSomeContext = () => {
  return useContext(UserContext);
}

export const ContextProvider = ({ valuePass, children }: { valuePass: string, children: ReactNode }) => {
  
  return (
    <UserContext.Provider value={`${valuePass}`}>
      {children}
    </UserContext.Provider>
  );
}