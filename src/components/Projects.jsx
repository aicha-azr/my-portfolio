import { useEffect } from 'react';
import project from '../db/projects';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCustomNavigation from './Carousel';
const Projects = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true 
        });
    }, []);
    
    return (
        <>
            <section className="py-12 flex flex-col  gap-16 mt-10" id="projects">
            
            <h2 className="max-w-xl mb-4 text-3xl font-extrabold tracking-tight md:self-start md:w-1/2 leading-none md:text-4xl xl:text-5xl text-b1" data-aos="fade-right">Projects</h2>  
            <CarouselCustomNavigation/>
</section>
        </>
    )
}

export default Projects;
