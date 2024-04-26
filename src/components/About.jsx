import technologies from "../db/tech";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
const About = ()=>{
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true 
          });
      });
    return(
        <>
        <section className="py-12 flex flex-col items-center gap-16 mt-10" id="about">
            
              <h2 className="max-w-xl mb-4 text-3xl font-extrabold tracking-tight md:self-start md:w-1/2 leading-none md:text-4xl xl:text-5xl text-b1" data-aos="fade-right">About Me</h2>  
            
        <div className="flex justify-around flex-col md:flex-row " data-aos="fade-up">      
    <div className="w-fit mb-8 md:w-1/3 self-start">
        
        
            <div className="">
                <p className="text-lg text-black mb-4 py-3 leading-10">I'm a passionate <span className="text-b2 md:text-xl font-bold ">Full Stack </span> developer. I love building web applications and exploring new technologies. My expertise lies in the MERN (MongoDB, Express.js, React.js, Node.js) stack, and I'm constantly learning and adapting to new technologies to enhance my skills.</p>
            </div>
        
    </div>
                <div className="flex flex-col gap-3 justify-center md:mb-8 ">
                <h3 className="text-xl text-BRoyal font-bold mb-4 text-center">Technologies I master:</h3>
                <div className="grid grid-cols-5 gap-4 items-center ">
                    {technologies.map((item, index) => (
                        <img key={index} src={item} alt="tech" className={`rounded-md shadow w-10 h-10 mx-2 mb-2 animate-bounce [animation-delay:-0.1s]`} />
                    ))}
                </div>
                </div>
                </div>
</section>

        </>
    )
}
export default About;