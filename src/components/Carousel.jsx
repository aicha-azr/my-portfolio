import { Carousel } from "@material-tailwind/react";
import projects from "../db/projects";
 
export function CarouselCustomNavigation() {
  return (
    <div className="relative">
    <Carousel
      className="rounded-xl "
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className=" left-2/4 z-50  -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`absolute top-5 md:top-5 block h-1 cursor-pointer rounded-2xl border border-v1 transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-violet" : "w-4 bg-v2"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}  data-aos="fade-up"
    >
      {projects.map((item, index) => (
                    <div key={index} className=' flex flex-col gap-5 items-center justify-center'>
                        <img src={item.image}  alt={item.title} className=' md:h-[30rem] md:w-[50rem] h-[10rem] w-[20rem] shadow shadow-b2 rounded-lg'/>
                        <a href={item.link} className='text-b2 md:text-xl'>{item.title}</a>
                    </div>
                ))}
    </Carousel>
    </div>
  );
}
export default CarouselCustomNavigation;
