import AboutIndex from '@/modules/about';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: "About Us | FCIS-Evoting",
}  

const AboutPage: NextPage = () => {

  return (
    <>
      <AboutIndex />
    </>
  )
}

export default AboutPage