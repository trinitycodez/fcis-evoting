import { SvgProps } from '@/types/svg'

const AboutIcon = (props:SvgProps) => {
  return (
    <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg">
        <path d="M37 40H11L5 46V12C5 8.7 7.7 6 11 6H37C40.3 6 43 8.7 43 12V34C43 37.3 40.3 40 37 40Z" fill="#2196F3"/>
        <path d="M22 20H26V31H22V20Z" fill="white"/>
        <path d="M24 17C25.1046 17 26 16.1046 26 15C26 13.8954 25.1046 13 24 13C22.8954 13 22 13.8954 22 15C22 16.1046 22.8954 17 24 17Z" fill="white"/>
    </svg>
  )
}

export default AboutIcon