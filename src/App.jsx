import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import SideBar from './components/SideBar';
import Education from './components/Education';
import Skills from './components/Skills';
function App() {

  return (
    <> 
    <div className=' flex justify-center'>

    <SideBar/>

   <main className=''>
  <Home/>
    <Education />
    <Skills/>
   </main>
    </div>
 
    </>
  )
}

export default App
