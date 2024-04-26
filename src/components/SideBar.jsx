import { useState } from 'react';
import logo from '../assets/logo.png';
import Cv from '../assets/aicha_azeroual.pdf';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    
<nav className="bg-opacity-50 bg-white-200 backdrop-blur-sm  px-2 sm:px-4 py-2.5 rounded shadow fixed top-3 w-full z-10">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <a href="/" className="flex items-center">
      <span className="font-greatVibes self-center text-xl font-semibold font-lugrasimo whitespace-nowrap text-[#1c1dab]">
        Aicha Azeroual
      </span>
    </a>

    <div className="flex items-center">
      <button
        id="menu-toggle"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-[#1c1dab] rounded-lg bg-[#e893c5] hover:bg-[#ebb2c3] focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
        onClick={()=>setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
     
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <div
      className={isOpen?"w-full md:block md:w-auto":" md:block md:w-auto hidden"}
      id="mobile-menu"
    >
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
        <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-[#1e0f75] border-b border-t border-gray-100 hover:bg-v2 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-2"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="block py-2 pr-4 pl-3 text-[#1e0f75] border-b border-gray-100 hover:bg-v2 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-2"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-[#1e0f75] border-b border-gray-100 hover:bg-v2 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-2 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-[#1e0f75] border-b border-gray-100 hover:bg-v2 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-2 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href={Cv}
            className="block p-3 text-[#1e0f75] md:border-0 md:hover:text-blue-700 md:p-2   bg-[#bf8ce1]  rounded-md hover:text-b1 transform hover:scale-110 md:mt-0 mt-2"
          download>
            Download CV
          </a>
        </li>
      </ul>
    </div>

  </div>
</nav>
    </>
  );
};

export default SideBar;
