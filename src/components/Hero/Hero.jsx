import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { Draggable } from 'gsap/Draggable';


gsap.registerPlugin(ScrollToPlugin, Draggable);

const Hero = () => {
  const textRefs = useRef([]);
  const containerRef = useRef(null);

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

    setTimeout(() => {
      const icons = document.querySelectorAll('.floating-icon');
      const bounds = containerRef.current.getBoundingClientRect();
      const containerHeight = bounds.height;

      if (window.innerWidth <= 768) {
        const positions = [
          { x: bounds.width * 0.1 },  
          { x: bounds.width * 0.75 },  
          { x: bounds.width * 0.85 },  
          { x: bounds.width * 0.35 }, 
          { x: bounds.width * 0.55 },  
          { x: bounds.width * 0.25 }   
        ];

        icons.forEach((icon, index) => {
          gsap.set(icon, {
            x: positions[index].x - (icon.offsetWidth / 2), 
            y: 0, 
            opacity: 0,
            cursor: 'move',
            zIndex: 15 
          });

          gsap.to(icon, {
            y: containerHeight * 0.8, 
            opacity: 1,
            duration: 1.5,
            ease: "bounce.out", 
            delay: index * 0.2, 
            onComplete: () => {
              const draggable = Draggable.create(icon, {
                type: "x,y",
                bounds: containerRef.current,
                inertia: true,
                onDragStart: function() {
                  const allIcons = document.querySelectorAll('.floating-icon');
                  let maxZ = 15;
                  allIcons.forEach(icon => {
                    const z = parseInt(window.getComputedStyle(icon).zIndex);
                    maxZ = Math.max(maxZ, z);
                  });
                  gsap.set(this.target, { zIndex: maxZ + 1 });
                  gsap.to(this.target, {
                    scale: 1.1,
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    duration: 0.2
                  });
                },
                onDragEnd: function() {
                  gsap.to(this.target, {
                    scale: 1,
                    boxShadow: 'none',
                    duration: 0.2
                  });
                }
              })[0];

              draggable.enable();
            }
          });
        });

      } else {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;

          icons.forEach((image) => {
            const speed = image.getAttribute('data-speed');
            const x = (centerX - clientX) * speed;
            const y = (centerY - clientY) * speed;
            
            const maxX = bounds.width / 4;
            const maxY = bounds.height / 4;
            const boundedX = Math.max(Math.min(x, maxX), -maxX);
            const boundedY = Math.max(Math.min(y, maxY), -maxY);
            
            gsap.to(image, {
              x: boundedX,
              y: boundedY,
              duration: 1,
              ease: 'power2.out'
            });
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, 800);
  }, []);

  const tl = gsap.timeline()

  useGSAP(() => {
    tl.from('.hero .intro-text', {
      opacity: 0,
      delay: 1,
      stagger: 0.2,
      duration: 1
    });
    tl.from('.floating-icon', {
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, []);

  const scrollToSection = (event) => {
    event.preventDefault();
    const targetSection = document.querySelector('#project');
    if (targetSection) {
      gsap.to(window, {
        duration: 1.0,
        scrollTo: targetSection,
        ease: "power4.inOut"
      });
    }
  };

  return (
    <div className="relative h-[calc(100vh-10rem)] overflow-hidden rounded-lg" ref={containerRef}>
      
    
      <div className="hero w-full h-full flex flex-col items-center text-center px-4 pt-28 pb-10 mx-auto max-w-3xl relative z-10">
        <h1
          className="intro-text text-3xl font-bold leading-normal cursor-default"
          ref={(el) => {
            if (el) textRefs.current[0] = el;
          }}
        >
          Hello <span className="wave">👋</span>, My name is <span className='name'>Aryan</span>
        </h1>
        <h2
          className="intro-text text-md leading-normal mt-2"
          ref={(el) => {
            if (el) textRefs.current[1] = el;
          }}
        >
          I am a Frontend Web Developer based in Gujarat, India.
        </h2>
        <h3 className="intro-text text-[#a0b1ba] font-semibold mt-4">
          Scroll down to see my work!
        </h3>
        <div className='w-full h-full flex justify-center items-end z-50'>
        <Link to="/" onClick={scrollToSection}>
          <svg 
            className="animate-bounce w-8 h-8 border-2 border-current rounded-full p-1"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Hero;
