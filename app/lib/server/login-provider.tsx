"use client"

import { ReactNode, createContext, useContext } from "react"

const LoginContext = createContext('')

export const useLoginContext = () => {
  return useContext(LoginContext);
}

export const LoginProvider = ({ valuePass, children }: { valuePass: string, children: ReactNode }) => {
    return (
        <LoginContext.Provider value={`${valuePass}`}>
            {children}
        </LoginContext.Provider>
    );
}