import React, {useEffect, useRef} from 'react'
import Navbar from '../Navbar/Navbar'
// import aboutImage from '../../assets/images/About2.svg'
import Footer from '../Footer/Footer'
import Scroll from '../Scroll/Scroll'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SEO from '../SEO/SEO'




const About = () => {

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

  const tl = gsap.timeline()
  useGSAP(() => {
    tl.from('.about', {
      opacity:0,
      delay:1,
      duration: 2,
    })
   

  }, []);

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
        title="About Me | Aryan's Portfolio"
        description="Learn more about my journey as a frontend developer, my skills, and what drives me to create exceptional web experiences."
        name="Aryan's Portfolio"
      />
      <div id='cursor' className='w-4 h-4 bg-[var(--cursor-bg)] lg:fixed hidden lg:block rounded-full z-50' ref={cursorRef}></div>
      
      <Scroll />
     
        <Navbar />
        <div className='about flex gap-14 lg:px-20 px-4 py-10 items-center lg:flex-row flex-col cursor-default'>
          <div className='flex flex-col gap-4 lg:w-1/2'>
            <h1 className='text-4xl font-bold text-center lg:text-left' 
            ref={(el) => {
              if (el) textRefs.current[0] = el;
            }}
          >A Bit About Me</h1>
          
          <div className='flex flex-col gap-4 text-justify '>
          <p>
          <span className='font-bold'>Hello there!</span> <span className='wave'>👋</span> Welcome to my <span className='font-bold'>Portfolio.</span> As an enthusiastic beginner, I’m diving headfirst into the world of UI/UX Design and Web Development, with a passion for crafting captivating digital experiences. 💻 I’m currently honing my front-end skills with<span className='font-bold'> HTML, CSS, JavaScript, and React,</span> and I’m also exploring<span className='font-bold'> Figma </span>  to take my UI/UX designs to the next level. 🚀
My focus is on bringing user-centric design principles to life, creating intuitive and visually stunning interfaces that truly engage users. 🎨🌟🔧 Let’s create something amazing together!
          </p>
          <p>In my leisure hours, I dive into hobbies that add color and joy to my life. 🎮 Whether I’m adventuring through the virtual worlds of Roblox, 🎶 getting lost in the rhythms of diverse music genres, or 🎬 being swept away by the magic of animated movies, 📽️ these passions fuel my creativity and keep my imagination alive.</p>
          </div>
          <div className="about-text grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {['HTML', 'CSS', 'Tailwind CSS','JavaScript', 'React', 'GSAP','Figma', 'UI/UX'].map((skill) => (
                    <div 
                      key={skill}
                      className="relative group px-4 py-2 rounded-lg bg-[var(--project-bg)] hover:bg-[var(--hover-bg)]/10 transition-all duration-300"
                    >
                      <span className="relative z-10">{skill}</span>
                      <span className="absolute inset-0 rounded-lg border border-[var(--hover-bg)]/20"></span>
                    </div>
                  ))}
                </div>
          </div>
          <div className='py-2 rounded-lg overflow-hidden lg:w-1/2 w-full '>
            {/* <img src = {aboutImage} alt="" srcset=""/> */}
          </div>
        </div>
      
        <Footer  />
        </div>



  )
}

export default About