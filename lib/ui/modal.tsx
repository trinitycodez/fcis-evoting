import { MouseEventHandler, useContext } from 'react';
import { UserContext } from '@/app/(student)/template';

const Modal = ({ children }: { children: React.ReactNode }) => {
    const {value, setValue} = useContext(UserContext);
    const changestate:MouseEventHandler = (e) => {
        setValue(!value);
    }
    return (
        <div onClick={changestate} className='w-full h-full xs:bg-app-text-sub/75 xp:bg-app-white/95 flex flex-col xs:justify-end xp:justify-center items-center absolute z-[55] '>
            {children}
        </div>
    )
}

export default Modal