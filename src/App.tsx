import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Labs from './components/Labs';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  // Scan line effect
  useEffect(() => {
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    document.body.appendChild(scanLine);
    return () => scanLine.remove();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#080D0B', color: '#F5F7F6' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Labs />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
