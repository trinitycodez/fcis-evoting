import { SvgProps } from "@/types/svg"

const MessagesIcon = (props:SvgProps) => {
  return (
    <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg">
        <path d="M23 4H3C1.3 4 0 5.3 0 7V19C0 20.7 1.3 22 3 22H23C24.7 22 26 20.7 26 19V7C26 5.3 24.7 4 23 4ZM23.8 19.4L16 13.8L13 15.8L9.9 13.8L2.2 19.4L8.5 12.9L0.8 6.9L13 13.5L25.1 7L17.5 13L23.8 19.4Z" fill="#9A9897"/>
    </svg>
  )
}

export default MessagesIcon