import picture from "../assets/me.jpg";
import Cv from '../assets/aicha_azeroual.pdf';
import AOS from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css';
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
<div className="flex flex-col justify-center items-center mt-4  gap-3 " id="home">
    <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black  font-bold text-center">Welcome to my Portfolio</h1>
  <div className="mx-auto text-center flex gap-5">
    <div>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold ">
      <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#FF8660] to-[#8000FF]">Aicha Azeroual</span><br />
      Développeuse full-stack
    </h1>
    <p className="mx-auto mt-8 mb-12 text-lg md:text-xl lg:text-xl font-light  max-w-lg border border-gray shadow shadow-md rounded rounded-md bg-slate-100 p-5">
      Développeuse full-stack expérimentée, je conjugue expertise technique et sens de l'innovation pour concevoir des solutions web sur mesure. Passionnée par la résolution de défis complexes, mon approche allie performance et créativité, visant à maximiser l'impact des projets.
    </p>
    <div className="flex flex-col md:flex-row justify-center">
      <button className="mb-4 md:mb-0 mr-0 md:mr-4 text-gray-800 px-6 py-3 md:px-8 md:py-4 bg-white rounded-full border border-[#FF5FA5] font-semibold text-lg md:text-xl" data-aos="zoom-in-up">
        <a href="#contact" className="text-[#FF8660]">Contactez-moi</a>
      </button>
      <button className="text-white px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 rounded-full font-semibold text-lg md:text-xl border-[#FF5FA5]" data-aos="zoom-in-up">
        <a href={Cv} className="text-[#FF8660]" download> Download CV</a>
      </button>
    </div>
    </div> 
   {/* <div>
      <img src={picture} alt="my_picture" className="mx-auto h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80 overflow-hidden rounded-full cover shadow shadow-md shadow-[#9CA5C2] " />
    </div>*/}
  </div>
</div>

    </>)
}
export default Home;