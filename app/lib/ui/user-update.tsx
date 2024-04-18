import { initialState, reducer } from "@/types/validate";
import { FC, useReducer, useRef } from "react"

const UserUpdate: FC = () => {
  const [values, dispatch] = useReducer(reducer, initialState)
  const {image} = values;
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form method="post" className="flex flex-col relative justify-center p-8 w-full xp:max-w-[19rem] sm:max-w-[30rem] xs:h-full sm:h-fit max-h-[80vh] overflow-y-auto overflow-x-hidden bg-app-light-primary xs:rounded-t-xl xp:rounded-none shadow-lg" onClick={(e)=> e.stopPropagation()}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="postalName" className="font-semibold w-fit">Postal Name: </label>
          <input type="text" name="postalName" id="postalName" placeholder="Nickname" className="placeholder:tracking-wider focus:border-app-primary focus:outline-none focus:ring-0" />
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <label htmlFor="postalImage" className="font-semibold w-fit">Postal Image: </label>
          <input type="file" name="postalImage" accept=".jpeg,.png" value={image} ref={imageRef} id="postalImage" className="bg-app-white focus:outline-none focus:ring-0"
          onChange={() => {dispatch({
            type: "IMAGE",
            payload: `${imageRef.current?.value}`
          })}} />
        </div>
        <input type="submit" value="Submit" className='w-full lg:text-xl lg:leading-[3rem] bg-app-green text-app-white outline-none ring-0 rounded-md p-2 mb-6 cursor-pointer tracking-wider' />
      </form>
    </>
  )
}

export default UserUpdate