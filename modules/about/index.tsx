import { NextPage } from 'next';
import Image from 'next/image';
import imgLogo from "@/assets/images/cissa.png";

const arrDepts = [
    {name: "Information Technology", image: imgLogo},
    {name: "Library and Information Science", image: imgLogo},
    {name: "Computer Science", image: imgLogo},
    {name: "Mass Communication", image: imgLogo},
    {name: "Telecommunication Science", image: imgLogo},
]

const AboutIndex: NextPage = () => {

  return (
    <section className='xs:pt-6 sm:pt-10 pb-14 px-2 '>
        <div className="flex flex-col xs:text-base sm:text-lg sm:leading-[1.575rem] mb-24 gap-4">
            <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] xs:mb-4 sm:mb-6 text-app-primary ">About Us</h2>
            <p>
                The Faculty of Communication and Information Sciences is a distinguished faculty in the University of Ilorin, established in the year 2008. She offers comprehensive programmes in various communication disciplines including: Library and Information sciences, Mass communication, Computer Science, Information Technology, and Telecommunication science. The faculty houses some of the best and students who collaboratively share knowledge and skills to advance the information gathering and sharing process in society. She is committed to actively producing well-seasoned and up-to-date graduates who will contribute to creating a faster, efficient, seamless, and more advanced communication process.
            </p>
            <p>
                The <abbr title="Communication and Information Sciences Students' Independence Electorial Commission">CISSIEC</abbr> is constituted and her members are inagurated by the Students' Representative Council to oversee every affairs of the election processes ranging from the initial stage of student's registeration to the final stage of result presentation.
            </p>
        </div>
        <div className="flex flex-col items-center">
            <h2 className="font-bold xs:text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem] mb-10 text-app-primary">5 Awesome Departments.</h2>
            <div className="flex flex-row flex-wrap items-start justify-center xs:gap-7 lg:gap-y-12 lg:gap-x-20">
                {
                    arrDepts.map((dept, i)=> (
                        <div key={i} className="flex flex-col xs:w-56 xp:w-64 md:w-72 lg:w-64 p-4 xs:gap-2 sm:gap-3 rounded-2xl shadow-app-box bg-app-white xs:justify-center xs:items-center xs:text-center sm:justify-start sm:items-start sm:text-start ">
                            <Image
                                src={dept.image}
                                alt={dept.name}
                                height={100}
                                width={100}
                                className='rounded-full mb-2 xs:w-20 xs:h-20 sm:w-[100px] sm:h-[100px] '
                            />
                            <h2 className='text-app-primary xs:text-lg sm:text-xl leading-6 font-bold tracking-tight'>{dept.name}</h2>
                            <span className='xs:text-sm sm:text-base'>Learn More</span>
                        </div>                        
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default AboutIndex