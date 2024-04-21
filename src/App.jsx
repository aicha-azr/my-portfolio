import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import SideBar from './components/SideBar';
import Education from './components/Education';
function App() {

  return (
    <> 
    <div className=''>
    <aside className='fixed top-0 left-0'>

    <SideBar/>
    </aside>
   <main className=''>
    <Home/>
    <Education/>
   </main>
    </div>
 
    </>
  )
}

export default App
