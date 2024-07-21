import { Github, Linkedin } from "lucide-react";

const Contact = ()=>{

    return(
        <>
            <section id="contact" className="relative h-fit flex flex-col  min-h-screen lg:w-full justify-center gap-8 rounded rounded-lg bg-opacity-50 shadow-md   rounded-lg blur-40 z-10  text-[#023246]">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-[#023246] self-start  px-3 z-20" >Get in touch</h2>
            <div className="flex flex-col md:flex-row justify-between px-10 gap-2 z-20 text-[#023246]">
                <div className="self-start text-start flex gap-3 flex-col ">
                    <p className="font-bold text-xl">Let's talk about everything!</p>
                    <p className="text-start text-lg">Send me an email.</p>
                    <div className="flex gap-3 items-center">
                        <a className="bg-beige rounded-full p-1" href="https://github.com/aicha-azr">
                    <Github  color="#023246" size={20}/>
                    </a>
                        <a className="bg-beige rounded-full p-1" href="https://www.linkedin.com/in/azeroual-aicha-a9433a216/">
                    <Linkedin  color="#023246" size={20}/>
                    </a>
                    </div>
                </div>
                <div className="flex justify-around flex-col gap-3 z-20">
                    <div className="flex gap-3 flex-col md:flex-row">
                        <input type="text" placeholder="Insert your name" className="rounded-2xl p-2 shadow shadow-lg  focus:outline-none py-4 focus:ring-0"/>
                        <input type="email" placeholder="Insert your email" className="rounded-2xl p-2 shadow shadow-lg  focus:outline-none py-4"/>
                    </div>
                    <input type="text" placeholder="Insert your subject" className="rounded-2xl p-2 shadow shadow-lg  focus:outline-none py-4 "/>
                    <textarea name="subject" id="" placeholder="Write your message" className="h-32 rounded-2xl p-2 shadow shadow-lg   focus:outline-none py-4 resize-none"></textarea>
                    <button className="shadow shadow-lg w-fit self-center md:self-start rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-yellow font-bold hover:ring-0">Send Message</button>
                </div>
                
                </div> 
                <div className="w-20 h-20 rounded-md  absolute top-[6rem] translate-x-20 right-30 z-0 animate-moveY bg-bleuGreen blur-lg  rounded-full shadow-xl shadow-bleuGreen blur-lg blur-70 opacity-25"></div> 
        <div className="w-20 h-20 rounded-full bg-bleuGreen absolute top-[28rem] translate-x-[10rem] z-0 right-[50rem] animate-marquee opacity-25 shadow shadow-xl shadow-bleuGreen lg:block hidden blur-lg  "></div>  
        <div className="w-20 h-20 rounded-full bg-bleuGreen blur-2xl absolute top-[27rem] translate-x-12 left-[10rem] z-0 animate-marquee shadow-xl shadow-bleuGreen"></div>
        <div className="w-20 h-20 rounded-lg bg-pink2 blur-2xl absolute top-[15rem]  lg:left-[35rem] left-0 z-0 animate-moveY shadow-xl shadow-pink2"></div> 
            </section>
            
        </>
    )
}
export default Contact;