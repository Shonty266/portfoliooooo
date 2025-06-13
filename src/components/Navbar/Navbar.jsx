import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithubSquare, FaBehanceSquare } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Resume from '../../assets/Aryan_Frontend_Resume.pdf'



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update your GSAP animation
  useGSAP(() => {
    // Create the timeline instance
    const tl = gsap.timeline();

    // Initial navbar animation
    gsap.from('.navbar', {
      y: -100,
      opacity: 0,
      duration: 1
    });

    // Name animation sequence
    tl.to('.animated-name span', {
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      delay: 5,
      ease: 'power2.inOut'  
    })
    .to('.animated-name span', {
      opacity: 1,  
      stagger: 0.2,
      duration: 2,
      ease: 'power2.inOut'  
    });
    
    
  }, []);



  




  return (
    <div> 
      <div className='navbar flex justify-between items-center py-8 lg:px-20 px-10 relative lg:z-10 z-50'>
        {/* Logo/Name section */}
        <Link to="/" className='animated-name text-3xl font-bold tracking-[2px] text-center duration-500'>
          <span className='inline-block hover:text-[var(--hover-bg)] transition-all duration-300 hover:translate-y-[-2px]'>A</span>
          <span className='inline-block hover:text-[var(--hover-bg)] transition-all duration-300 hover:translate-y-[-2px]'>R</span>
          <span className='inline-block hover:text-[var(--hover-bg)] transition-all duration-300 hover:translate-y-[-2px]'>Y</span>
          <span className='inline-block hover:text-[var(--hover-bg)] transition-all duration-300 hover:translate-y-[-2px]'>A</span>
          <span className='inline-block hover:text-[var(--hover-bg)] transition-all duration-300 hover:translate-y-[-2px]'>N</span>
        </Link>

        {/* Desktop nav links - no changes */}
        <div className='nav-left text-[17px] font-semibold hidden lg:flex pl-8'>
          <Link to='/' className='link relative group px-4 py-2'>
  <span className='relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]'>
    Work
  </span>
  <span className='absolute inset-0 rounded-lg bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100'></span>
</Link>

<Link to='/about' className='link relative group px-4 py-2'>
  <span className='relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]'>
    About
  </span>
  <span className='absolute inset-0 rounded-lg bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100'></span>
</Link>

<Link to='/contact' className='link relative group px-4 py-2'>
  <span className='relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]'>
    Contact
  </span>
  <span className='absolute inset-0 rounded-lg bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100'></span>
</Link>

<Link to={Resume} className='link relative group px-4 py-2' target='_blank' rel='noopener noreferrer'>
  <span className='relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]'>
    Resume
  </span>
  <span className='absolute inset-0 rounded-lg bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100'></span>
</Link>
        </div>

        {/* Desktop social icons */}
        <div className='text-2xl gap-8 hidden lg:flex'>
          <a 
            href="mailto:work.aryan26@gmail.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className='text-[var(--text-color)] hover:text-[var(--hover-bg)] duration-300 transform hover:scale-110 hover:rotate-6'
            aria-label="Email me"
          >
            <MdEmail />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/aryan-h/" 
            target="_blank"
            rel="noopener noreferrer" 
            className='text-[var(--text-color)] hover:text-[var(--hover-bg)] duration-300 transform hover:scale-110 hover:rotate-6'
            aria-label="Connect on LinkedIn"
          >
            <FaLinkedin/>
          </a>
          
          <a 
            href="https://github.com/Shonty266" 
            target="_blank"
            rel="noopener noreferrer" 
            className='text-[var(--text-color)] hover:text-[var(--hover-bg)] duration-300 transform hover:scale-110 hover:rotate-6'
            aria-label="View GitHub profile"
          >
            <FaGithubSquare/>
          </a>
          
          <a 
            href="https://www.behance.net/aryanh" 
            target="_blank"
            rel="noopener noreferrer" 
            className='text-[var(--text-color)] hover:text-[var(--hover-bg)] duration-300 transform hover:scale-110 hover:rotate-6'
            aria-label="View Behance portfolio"
          >
            <FaBehanceSquare/>
          </a>
        </div>

        {/* Mobile social icons */}
        <div className='flex lg:hidden gap-4 items-center'>
          <a 
            href="mailto:work.aryan26@gmail.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className='p-2 rounded-lg bg-[var(--background-button)] border border-[var(--filter-button)] 
              hover:bg-[var(--hover-bg)] transition-all duration-300'
            aria-label="Email me"
          >
            <MdEmail className='text-xl text-[var(--text-color)]' />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/aryan-h/" 
            target="_blank"
            rel="noopener noreferrer" 
            className='p-2 rounded-lg bg-[var(--background-button)] border border-[var(--filter-button)]
              hover:bg-[var(--hover-bg)] transition-all duration-300'
            aria-label="Connect on LinkedIn"
          >
            <FaLinkedin className='text-xl text-[var(--text-color)]' />
          </a>
        </div>
      </div>

      {/* Fixed Navigation on Scroll */}
   <div
  className={`fixed top-6 left-1/2 transform -translate-x-[50%] transition-all duration-300 z-50 
    ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
>
  <div className="backdrop-blur-md border border-[#a0b1ba]/20 rounded-lg px-2 py-1 lg:px-4 lg:py-2">
    <div className="nav-left text-[14px] lg:text-[16px] font-semibold flex justify-center items-center gap-1 lg:gap-2">
      
      <Link to="/" className="link relative group px-2 py-1 lg:px-4 lg:py-2">
        <span className="relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]">
          Work
        </span>
        <span className="absolute inset-0 rounded-md bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></span>
      </Link>

      <Link to="/about" className="link relative group px-2 py-1 lg:px-4 lg:py-2">
        <span className="relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]">
          About
        </span>
        <span className="absolute inset-0 rounded-md bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></span>
      </Link>

      <Link to="/contact" className="link relative group px-2 py-1 lg:px-4 lg:py-2">
        <span className="relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]">
          Contact
        </span>
        <span className="absolute inset-0 rounded-md bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></span>
      </Link>

      <Link
        to={Resume}
        className="link relative group px-2 py-1 lg:px-4 lg:py-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="relative z-10 text-[var(--text-color)] transition-colors duration-500 group-hover:text-[#a0b1ba]">
          Resume
        </span>
        <span className="absolute inset-0 rounded-md bg-[#a0b1ba]/10 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></span>
      </Link>

    </div>
  </div>
</div>


      </div>

   
  )
}

export default Navbar


