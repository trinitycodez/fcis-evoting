import { StudentProvider } from '@/app/lib/server/students-provider'
import StudentIndex from '@/modules/student'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: "Students-lists | FCIS-Evoting",
} 

export const revalidate = 180

const StudentPage: NextPage = () => {
  return (
    <StudentProvider>
      <StudentIndex />
    </StudentProvider>
  )
}

export default StudentPage