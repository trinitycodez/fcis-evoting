import { SvgProps } from "@/types/svg"

const StudentsList = (props:SvgProps) => {
  return (
    <svg 
    width="1024" 
    height="1024" 
    viewBox="0 0 1024 1024" 
    fill="none" 
    {...props}
    xmlns="http://www.w3.org/2000/svg">
        <path d="M704 192H864V928H160V192H320V256H704V192ZM288 512H736V448H288V512ZM288 768H736V704H288V768ZM384 192V96H640V192H384Z" fill="#9A9897"/>
    </svg>
  )
}

export default StudentsList