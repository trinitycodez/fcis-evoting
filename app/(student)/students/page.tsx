import StudentIndex from '@/modules/student'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: "Students-lists | FCIS-Evoting",
} 

const StudentPage: NextPage = () => {
  return (
    <StudentIndex />
  )
}

export default StudentPage