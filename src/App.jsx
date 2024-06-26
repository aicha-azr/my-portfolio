import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import SideBar from './components/SideBar';
import About from './components/About';
import Projects from './components/Projects';
function App() {

  return (
    <> 

   <main className=' w-screen max-w-full h-[100vh] border border-black left-0 right-0 top-0  overflow-y-auto scroll-smooth lg:px-2 px-1  bg-gradient-to-r from-[#edc690] via-beige to-[#f6f6f6] flex flex-col justify-center fixed '>
    <SideBar/>

  <Home/>
   </main>
  <div className="w-20 h-20 rounded-md  absolute top-[6rem] translate-x-20 right-30 z-0 animate-moveY bg-bleuGreen blur-lg  rounded-full shadow-xl shadow-bleuGreen blur-lg blur-70 opacity-25"></div> 
        <div className="w-20 h-20 rounded-full bg-bleuGreen absolute top-[28rem] translate-x-[10rem] z-0 right-[50rem] animate-marquee opacity-25 shadow shadow-xl shadow-bleuGreen lg:block hidden blur-lg  "></div>  
        <div className="w-20 h-20 rounded-full bg-bleuGreen blur-2xl absolute top-[27rem] translate-x-12 left-[10rem] z-0 animate-marquee shadow-xl shadow-bleuGreen"></div>
        <div className="w-20 h-20 rounded-lg bg-pink2 blur-2xl absolute top-[15rem]  lg:left-[35rem] left-0 z-0 animate-moveY shadow-xl shadow-pink2"></div> 
   
 
    </>
  )
}

export default App
