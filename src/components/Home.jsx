import picture from "../assets/me.jpg";
import Cv from '../assets/aicha_azeroual.pdf';
import AOS from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css';
import technologies from "../db/tech";
import { ArrowDownToDot, CodeXml } from "lucide-react";
import 'tailwindcss/tailwind.css';
import me from '../assets/real_aicha.png'
const Home = ()=>{
    useEffect(() => {
        console.log("AOS initializing...");
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true 
          });
      });
    return (<>
<section className="">
    <div className="flex items-center justify-around min-h-screen  mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12">
        <div className="gap-5 lg:col-span-7 flex flex-col items-center text-center mt-2">
            <h1 className="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-BRoyal " data-aos="fade-right">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#FF8660] to-[#8000FF]">Aicha</span>,
            </h1>
            <h2 className="max-w-xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-b1 " data-aos="fade-left">Full Stack </h2>
            <CodeXml size={40} data-aos="fade-up" color="#1e0f75" />
            <h2 className="max-w-xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-b1" data-aos="fade-left"> MERN Stack Developer</h2>
            <p className="max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-xl text-black" data-aos="fade-up">
                Welcome to My World of Technology!<br/>Where Passion Meets Innovation
            </p>
          
            <div className="flex ">
          
            <a href="#about" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-BRoyal border border-gray-300 rounded-lg hover:bg-b4 focus:ring-4 focus:ring-gray-100  animate-bounce focus:animate-none hover:animate-none shadow shadow-BRoyal">
                scroll down <ArrowDownToDot />
            </a>
             </div>
        </div>
        <div className="flex justify-center items-center bg-violet  rounded-full hidden md:block" data-aos="fade-up">
    <img src={me} alt="aicha" className="mx-auto  rounded-b-full " width={350} height={350}/>  
</div>
           
    </div>
</section>



    </>)
}
export default Home;