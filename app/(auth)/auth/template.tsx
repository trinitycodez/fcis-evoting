import Logo from '@/components/logo';
import { ReactNode } from 'react';

const AuthUser = ({children}:{children:ReactNode}) => {
  const holdObj = {
    layerImage: {
      border: true,
      width: 320,
      height: 320,
    },
    layerText: true,
    layerWrapper: true,
  }
  return (
    <div className='flex w-full min-h-[600px] h-screen items-center justify-center'>
        <div className="flex items-center justify-center w-[30vw] h-full bg-app-primary text-app-white">
          <Logo layer={holdObj} />
        </div>
        <div className="flex flex-col justify-center items-center w-[70vw]">
          {children}
        </div>
    </div>
  )
}

export default AuthUser