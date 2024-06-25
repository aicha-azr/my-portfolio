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
  
   <main className='fixed w-full max-w-fit h-[100vh] border border-black left-0 right-0 top-0 overflow-y-auto scroll-smooth px-0.5 lg:px-2'>
    <SideBar/>

  <Home/>
  <About/>
  <Projects/>
   </main>
   
 
    </>
  )
}

export default App
