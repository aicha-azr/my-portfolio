import { Carousel } from "@material-tailwind/react";
import projects from "../db/projects";
import { useState } from "react";
 
export function CarouselCustomNavigation() {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const filtrage = (value) => {
    if (value === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(item => item.category === value));
    }
  };
  return (
    <div className=' flex  flex-col gap-3  border border-black'>
      <div className="flex gap-6 md:w-1/2 text-black pl-4 font-medium">
        <button className="rounded rounded-full bg-[#fffdfd] border border-bleuGreen p-1 px-2 shadow shadow-md hover:text-[#F564AB]" onClick={() => filtrage("All")}>All</button>
        <button className="rounded rounded-full bg-[#fffdfd] border border-bleuGreen p-1 shadow shadow-md hover:text-[#F564AB]" onClick={() => filtrage("Full Stack")}>Full Stack</button>
        <button className="rounded rounded-full bg-[#fffdfd] border border-bleuGreen p-1 shadow shadow-md hover:text-[#F564AB]" onClick={() => filtrage("Frontend")}>Frontend</button>
        <button className="rounded rounded-full bg-[#fffdfd] border border-bleuGreen p-1 shadow shadow-md hover:text-[#F564AB] " onClick={() => filtrage("Backend")}>Backend</button>
        </div>
    <div className="  flex flex-wrap flex-row gap-8 p-3 border border-green-800 items-center w-fit justify-start ">
      {filteredProjects.map((item, index) => (
                    <div key={index} className=' flex flex-col gap-5 items-center  md:w-1/2 h-fit rounded rounded-[11px]  shadow shadow-md  h-[15rem] lg:w-[400px] relative shadow-xl shadow-inner hover:text-white'   style={{ backgroundImage: `url(${item.image})` }}>
                        <img src={item.image}  alt={item.title} className= "shadow shadow-md rounded-lg w-full h-full hover:brightness-50" />
                        <div className="absolute left-1 bottom-2 backdrop-opacity-10">
                        <a href={item.link} className='text-green md:text-xl  bg-brightness-50'>{item.title}</a></div>
                    </div>
                ))}
    
    </div>
</div>
  );
}
export default CarouselCustomNavigation;
{/**md:h-[30rem] md:w-[50rem] h-[10rem] w-[20rem]**
  
  
  
  
  <div className=' w-full max-w-fit lg:w-full lg:max-w-fit  overflow-x-auto scroll-smooth border border-black'>
    <div className="  flex  flex-rows-3 gap-8 p-3 border border-green-800 items-center w-fit">
      {projects.map((item, index) => (
                    <div key={index} className=' flex flex-col gap-5 items-center p-3 md:w-[30rem]  max-h-[30rem] h-fit rounded rounded-[11px] bg-bleuGreen shadow shadow-md w-[15rem]'>
                        <img src={item.image}  alt={item.title} className= "shadow shadow-md rounded-lg " />
                        <a href={item.link} className='text-green md:text-xl'>{item.title}</a>
                    </div>
                ))}
    
    </div>
</div>*/}