import Navbar from './Navbar';
import Footer from './Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Marquee from '../ui/Marquee';

const Layout = () => (
  <div className="relative min-h-screen w-full bg-night text-paper overflow-x-hidden">
    <Navbar />
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Hero />
      </div>
      <Marquee />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Projects />
        <About />
        <Contact />
      </div>
    </main>
    <Footer />
  </div>
);

export default Layout;
