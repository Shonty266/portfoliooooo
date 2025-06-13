import React, { useRef, useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Project/Project';
import Footer from './components/Footer/Footer';
import Scroll from './components/Scroll/Scroll';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import Modal from './components/Modal/Modal';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SEO from './components/SEO/SEO';

gsap.registerPlugin(ScrollToPlugin);

const App = () => {
  const mainRef = useRef(null);
  const cursorRef = useRef(null);
  const emailSent = useRef(false);
  const [showModal, setShowModal] = useState(true);

  const handleMouseMove = (event) => {
    const newX = event.clientX + 4; // Adjust position by adding 10px to the X coordinate
    const newY = event.clientY + 8; // Adjust position by adding 10px to the Y coordinate

    gsap.to(cursorRef.current, {
      x: newX,
      y: newY,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleModalSubmit = async (visitorName) => {
    setShowModal(false);
    const lastSent = localStorage.getItem('lastEmailSent');
    const now = new Date().getTime();
    
    if (lastSent && (now - parseInt(lastSent)) < 24 * 60 * 60 * 1000) {
      return;
    }

    if (!emailSent.current) {
      try {
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();

        const result = await emailjs.send(
          'service_jbcz3c3',
          'template_3gt08nm',
          {
            time: currentTime,
            date: currentDate,
            name: visitorName || 'Anonymous',
            message: `${visitorName || 'Someone'} has viewed your portfolio!`
          },
          '1trlmKBnz03et4Ra5'
        );

        if (result.status === 200) {
          localStorage.setItem('lastEmailSent', now.toString());
          emailSent.current = true;
          console.log('Email sent successfully');
        }
      } catch (error) {
        console.error('Failed to send email:', error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    handleModalSubmit(); // Send email with anonymous user
  };

  return (
    <div className='main' id='main' ref={mainRef} onMouseMove={handleMouseMove}>
      <SEO 
        title="Aryan's Portfolio - Frontend Developer"
        description="Frontend developer specializing in React.js and modern web technologies. View my projects and get in touch for collaboration opportunities."
        name="Aryan's Portfolio"
      />
      {showModal && (
        <Modal 
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}
      <div id='cursor' className='w-4 h-4 bg-[var(--cursor-bg)] fixed lg:block hidden rounded-full z-50' ref={cursorRef}></div>
      <Scroll />
      <Navbar />
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
