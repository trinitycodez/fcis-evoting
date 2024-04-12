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
    <div className='flex w-full min-h-[600px] h-screen relative items-center justify-center bg-app-white'>
        <div className="flex items-center justify-center xs:absolute sm:relative z-10 min-w-56 px-4 xs:w-full sm:w-[30vw] h-full bg-app-primary text-app-white">
          <Logo layer={holdObj} />
        </div>
        <div className="flex flex-col justify-center items-center relative z-40 h-full xs:w-full sm:w-[70vw] bg-app-white/[0.97]">
          {children}
        </div>
    </div>
  )
}

export default AuthUser