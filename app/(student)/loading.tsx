import { NextPage } from 'next'

const Loading:NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 w-full h-[70vh]">
      <div className="loader flex flex-col justify-center items-center xs:w-11 xs:h-11 md:w-20 md:h-20 rounded-full animate-spin">
        <div className="flex xs:w-9 xs:h-9 md:w-16 md:h-16 bg-app-white rounded-full"></div>
      </div>
      <span className='xs:text-xs xp:text-sm md:text-base pl-4 font-bold'>Loading...</span>
    </div>
  )
}

export default Loading