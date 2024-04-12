import { SvgProps } from "@/types/svg"

const HiddenIcon = (props:SvgProps) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    className="fill-gray-500 h-auto w-full"
    viewBox="0 -960 960 960"
    width="24"
    {...props}>
        <path d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"/>
    </svg>
  )
}

export default HiddenIcon