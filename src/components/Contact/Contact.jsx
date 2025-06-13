import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import React, {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import { CgClose } from "react-icons/cg";
import { useGSAP } from '@gsap/react'
import Scroll from '../Scroll/Scroll'
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import SEO from '../SEO/SEO';


const Contact = () => {

  const textRefs = useRef([]);

  useEffect(() => {
    textRefs.current.forEach((text) => {
      if (!text) return;

      const textAnimation = gsap.to(text, {
        duration: 1.6,
        y: -25,
        ease: 'power2.inOut',
        paused: true,
      });

      const handleMouseEnter = () => {
        textAnimation.play();
        textAnimation.eventCallback('onComplete', () => {
          textAnimation.reverse();
        });
      };

      text.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        text.removeEventListener('mouseenter', handleMouseEnter);
        textAnimation.kill();
      };
    });
  }, []);


  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "c48506b2-e8d8-4409-9add-32ffaa23083d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      const alert = document.getElementById('alert');
      if (true) {
        alert.style.display = 'flex';
        alert.style.opacity = '100';
      
        setTimeout(() => {
          alert.style.display = 'none';
        }, 3000);
      }
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
    
  
    const close = () => {
      const alert = document.getElementById('alert');
      if (alert) {
        alert.style.display = 'none';
      }
    };
    
    
    useGSAP(() => {
      // Fade in the contact section
      gsap.from('.contact', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Slide in title
      gsap.from('.contact-title', {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Fade in contact info items
      gsap.from('.contact-info-item', {
  opacity: 0,          // Start from fully transparent
  y: 50,               // Slide up from 50px below
  duration: 1,
  stagger: 0.2,
  delay: 0.5,
  ease: 'sine.inOut'
});


      // Subtle animation for background blobs
      gsap.to('.contact-blob', {
        x: 'random(-10, 10)',
        y: 'random(-10, 10)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5
        }
      });
    }, []);

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
  
    const handleNameChange = (event) => {
      const newName = event.target.value;
      setName(newName);
      setSubject(`${newName} sent you a message from Portfolio`);
    };
    
    const mainRef = useRef(null);
    const cursorRef = useRef(null);
  
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
  
  return (
    <div ref={mainRef}
    
    onMouseMove={handleMouseMove}>

      <SEO 
        title="Contact Me | Aryan's Portfolio"
        description="Get in touch for collaboration opportunities, project inquiries, or just to say hello. I'm always excited to connect with fellow developers and potential clients."
        name="Aryan's Portfolio"
      />
      <div id='cursor' className='w-4 h-4 bg-[var(--cursor-bg)] lg:fixed hidden lg:block rounded-full z-50 x-10 y-10' ref={cursorRef}></div>

      <Scroll />

      <Navbar />
       
       <div className='absolute right-10 top-20 rounded-lg py-2 border-2 border-[#263238] items-center justify-center gap-4 px-4 transition duration-500 ease-in-out hidden' id='alert' >
    <div>{result}</div>
    <div>
        <CgClose className='font-bold text-xl cursor-pointer' onClick={close} />
    </div>
</div>

<div className='contact flex lg:px-20 px-4 py-10 items-center lg:flex-row flex-col'>
  {/* Form Section */}
  <div className='flex flex-col gap-4 lg:w-1/2 w-full'>
    <h1 className='text-4xl font-bold text-center lg:text-left text-[var(--text-color)]'>
      Get in Touch
    </h1>
    
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {/* Input fields */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="lg:w-[90%] w-full h-[50px] pl-6 outline-none rounded-md border border-[var(--filter-button)] 
            bg-[var(--background-button-bg)] text-[var(--text-color)]
            focus:border-[var(--filter-button)] focus:ring-1 focus:ring-[var(--filter-button)]"
            placeholder="Enter Your Name"
            name="name"
            onChange={handleNameChange}
            required
          />
        </div>

        <input type="hidden" name="subject" value={subject} />

        {/* Email field - similar styling */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="lg:w-[90%] w-full h-[50px] pl-6 outline-none rounded-md border border-[var(--filter-button)] 
            bg-[var(--background-button-bg)] text-[var(--text-color)]
            focus:border-[var(--filter-button)] focus:ring-1 focus:ring-[var(--filter-button)]"
            placeholder="Enter Your Email"
            name="email"
            required
          />
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Message
          </label>
          <textarea
            id="message"
            className="lg:w-[90%] w-full h-[100px] pl-6 pt-4 outline-none rounded-md border border-[var(--filter-button)] 
            bg-[var(--background-button-bg)] text-[var(--text-color)]
            focus:border-[var(--filter-button)] focus:ring-1 focus:ring-[var(--filter-button)]"
            placeholder="Enter Your Message"
            name="message"
            required
          />
        </div>

        {/* Submit button */}
        <div>
          <button
  className="px-12 py-3 rounded-lg font-semibold bg-[var(--background-button)] text-[var(--text-color)]
    border border-[var(--filter-button)] text-lg relative overflow-hidden group
    transition-all duration-300 ease-out hover:scale-[1.02]
    before:absolute before:inset-0 before:bg-[var(--hover-bg)] before:scale-x-0 
    before:origin-right before:transition-transform before:duration-300
    hover:before:scale-x-100 hover:before:origin-left "
  type="submit"
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    Send Message
    <svg 
      className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  </span>
</button>
        </div>
      </div>
    </form>
  </div>

  {/* Contact Information Section */}
  <div className="lg:w-1/2 w-full mt-10 lg:mt-0">
    <div className="relative w-full bg-[var(--background-button-bg)] rounded-xl p-8 border border-[var(--filter-button)]">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="contact-blob absolute w-64 h-64 bg-[var(--hover-bg)] rounded-full blur-3xl"></div>
        <div className="contact-blob absolute right-0 bottom-0 w-64 h-64 bg-[var(--background-button)] rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-[var(--text-color)] contact-title">
            Contact Information
          </h3>
          
          <div className="contact-info-item space-y-6 mt-8">
            {/* Email info */}
            <div className="flex items-center space-x-4 p-4 bg-[var(--background-button)] rounded-lg 
    border border-[var(--filter-button)] hover:bg-[var(--hover-bg)] transition-all duration-300">
    <div className="lg:p-3 p-2 bg-[var(--background-button-bg)] rounded-full">
      <MdEmail className="lg:text-2xl text-xl text-[var(--text-color)]" />
    </div>
    <div>
      <h4 className="text-sm text-[var(--text-color)] opacity-75 mb-1">Email</h4>
      <span className="text-[var(--text-color)] text-lg">work.aryan26@gmail.com</span>
    </div>
  </div>

  {/* Location info */}
  <div className="flex items-center space-x-4 p-4 bg-[var(--background-button)] rounded-lg 
    border border-[var(--filter-button)] hover:bg-[var(--hover-bg)] transition-all duration-300">
    <div className="lg:p-3 p-2 bg-[var(--background-button-bg)] rounded-full">
      <MdLocationOn className="lg:text-2xl text-xl text-[var(--text-color)]" />
    </div>
    <div>
      <h4 className="text-sm text-[var(--text-color)] opacity-75 mb-1">Location</h4>
      <span className="text-[var(--text-color)] text-lg">Vadodara, Gujarat</span>
    </div>
  </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        

        <Footer />
    </div>
  )
}

export default Contact