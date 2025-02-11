import { SvgProps } from '@/types/svg'

const EditIcon = (props:SvgProps) => {
  return (
    <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="#2B372A" 
    {...props}
    xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#9A9897" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.375 2.62523C18.7728 2.2274 19.3124 2.00391 19.875 2.00391C20.4376 2.00391 20.9772 2.2274 21.375 2.62523C21.7728 3.02305 21.9963 3.56262 21.9963 4.12523C21.9963 4.68784 21.7728 5.2274 21.375 5.62523L12 15.0002L8 16.0002L9 12.0002L18.375 2.62523Z" stroke="#9A9897" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default EditIcon