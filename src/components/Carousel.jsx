import { Carousel } from "@material-tailwind/react";
import projects from "../db/projects";
 
export function CarouselCustomNavigation() {
  return (
    <div className=' w-full max-w-fit lg:w-full lg:max-w-fit  overflow-x-auto scroll-smooth border border-black'>
    <div className="  flex gap-8 p-3 border border-green-800 items-center w-fit">
      {projects.map((item, index) => (
                    <div key={index} className=' flex flex-col gap-5 items-center p-3 sm:w-[40rem]  max-h-[30rem] h-fit rounded rounded-[11px] bg-bleuGreen shadow shadow-md w-[25rem]'>
                        <img src={item.image}  alt={item.title} className= "shadow shadow-md rounded-lg " />
                        <a href={item.link} className='text-green md:text-xl'>{item.title}</a>
                    </div>
                ))}
    
    </div>
</div>
  );
}
export default CarouselCustomNavigation;
{/**md:h-[30rem] md:w-[50rem] h-[10rem] w-[20rem]** */}