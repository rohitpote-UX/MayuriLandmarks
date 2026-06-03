import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const textGroupRef = useRef(null);
  
  // New specific refs for staggering the initial entrance animation
  const assuranceTextRef = useRef(null);
  const qualityTextRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // 0. Initial Entrance Animation (Awwwards Style Reveal)
    // Runs once immediately on mount before scrolling begins
    const entranceCtx = gsap.context(() => {
      // Hide elements initially to prevent flash of content
      gsap.set([assuranceTextRef.current, qualityTextRef.current, paragraphRef.current], {
        opacity: 0,
        y: 80, // Start lower down
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' // Classic cinematic clip reveal
      });

      const entranceTl = gsap.timeline({ delay: 0.2 });

      entranceTl
        .to([assuranceTextRef.current, qualityTextRef.current], {
          opacity: 1,
          y: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.4,
          stagger: 0.15,
          ease: 'power4.out',
        })
        .to(paragraphRef.current, {
           opacity: 1,
           y: 0,
           clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
           duration: 1.2,
           ease: 'power3.out',
        }, '-=1'); // Overlap with the headline animation
    }, sectionRef);


    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Integrate Lenis rendering loop with GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    // Prevent jumpy scrolling
    gsap.ticker.lagSmoothing(0);

    // 2. Cinematic ScrollTrigger Animation Timeline
    const scrollCtx = gsap.context(() => {
      // Dynamic calculations based on screen size
      const isMobile = window.innerWidth < 768; // standard md breakpoint

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%', // Scale completes over 1.5x screen scroll distance
          scrub: 1.2,    // Smooth GSAP scrubbing
          // Removed pin to allow natural page scrolling
        }
      });

      // Target X movement to precisely center the right-positioned video:
      // Desktop: The video width is 55vw, right padding is 5vw. Required distance = -17.5vw
      // Mobile: Video is mostly centered already (90vw width), so we just scale and barely shift x
      
      const xDistance = isMobile ? '0vw' : '-17.5vw';
      const xMidpoint = isMobile ? '0vw' : '-8.75vw';
      const maxScale = isMobile ? 1.5 : 2.8;

      tl.to(videoWrapperRef.current, {
        scale: 1.2,
        y: isMobile ? '15vh' : '20vh', // Moves down progressively as user scrolls
        ease: 'none',
        force3D: true, // Forces hardware acceleration
      })
        .to(videoWrapperRef.current, {
          scale: isMobile ? 1.35 : 1.6,
          x: xMidpoint, // Move halfway toward the center
          y: isMobile ? '35vh' : '50vh', // Pushes down the page
          ease: 'none',
          force3D: true,
        })
        .to(videoWrapperRef.current, {
          scale: maxScale, // Scale up massively to swallow the entire viewport
          x: xDistance, // Fully center layout offset
          y: isMobile ? '60vh' : '90vh', // Reaches the bottom of the scroll journey as full screen
          ease: 'none',
          force3D: true,
        }, 'expand') // Label added to sync timeline hooks
        // Fade out the left-side text completely as the video envelopes the frame
        .to(textGroupRef.current, {
          opacity: 0,
          y: '-10vh', // Subtle upward drift while fading
          ease: 'none',
        }, 'expand');

    }, sectionRef);

    // Clean up all hooks on component unmount
    return () => {
      entranceCtx.revert();
      scrollCtx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] md:h-[200vh] bg-white dark:bg-[#0f0f0f] transition-colors duration-1000 overflow-hidden"
    >
      {/* 
        A. TEXT CONTENT LAYER
        Positioned absolutely so it doesn't disturb the flex arrangement 
        of the video and ignores intrinsic layout shifts.
      */}
      <div
        ref={textGroupRef}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start px-4 md:px-[2vw] pt-[8vh] md:pt-[8vh] font-[magtis] z-10 pointer-events-none"
      >
        <h1 className="text-[11.5vw] sm:text-[7vh] md:text-[24vh] leading-[1.1] sm:leading-[6.5vh] md:leading-[22vh] uppercase font-extrabold whitespace-nowrap text-black dark:text-white transition-colors duration-1000 pb-2 md:pb-4">
          <div ref={assuranceTextRef} className="overflow-hidden inline-block pb-1 md:pb-2">Assurance of</div> 
          <div ref={qualityTextRef} className="overflow-hidden block ml-[8vw] md:ml-[15vw] pb-1 md:pb-2">
            <span className="italic text-[#6CAFBF] font-normal tracking-wide">
              Quality Life
            </span>
          </div>
        </h1>

        <div ref={paragraphRef} className="overflow-hidden mt-[4vh] md:mt-[3vh]">
          <p className="border-t border-[#6CAFBF] pt-4 w-[85vw] md:w-1/3 font-sans text-[2vh] md:text-[3vh] leading-relaxed max-w-[90vw] md:max-w-[40vw] text-black/90 dark:text-white/90 transition-colors duration-1000 font-medium">
            <span className="text-[#6cafbf] font-extrabold">
              "Mayuri Landmarks LLP
            </span> born with a purpose to build projects that breathe life into the dreams of their customers."
          </p>
        </div>
      </div>

      {/* 
        B. VIDEO CONTAINER LAYER 
        Sits at the z-0 level natively right-aligned on screen. 
        Flex guarantees a perfectly scaled 0,0 initial center for GSAP transforms.
      */}
      <div className="absolute top-[5vh] md:top-0 left-0 w-full h-full flex items-center justify-center md:justify-end md:pr-[5vw] z-0">
        <div
          ref={videoWrapperRef}
          className="w-[90vw] md:w-[55vw] h-[40vh] md:h-[50vh] origin-center will-change-transform overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.05]" // extra subtle crop to prevent bleeding
            src="https://felixnieto.b-cdn.net/projects/Loop_web_hero_2025.mp4"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
