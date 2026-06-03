import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { services } from './Services';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find current service by number
  const currentIndex = services.findIndex(s => s.number === id);
  const service = services[currentIndex];

  // Calculate next service for the footer
  const nextService = services[currentIndex === services.length - 1 ? 0 : currentIndex + 1];

  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const titleRefs = useRef([]);
  const textRefs = useRef([]);
  
  titleRefs.current = [];
  textRefs.current = [];

  const addToTitleRefs = (el) => el && !titleRefs.current.includes(el) && titleRefs.current.push(el);
  const addToTextRefs = (el) => el && !textRefs.current.includes(el) && textRefs.current.push(el);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) });
      lenis.destroy();
    };
  }, []);

  // Jump to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Animations run whenever `service` changes
  useEffect(() => {
    if (!service) return;
    
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Hero image reveal
      tl.fromTo(heroImgRef.current, 
        { scale: 1.3, filter: 'brightness(0.2)', opacity: 0 }, 
        { scale: 1, filter: 'brightness(1)', opacity: 1, duration: 2, ease: 'power4.out' }
      )
      // Title stagger
      .fromTo(titleRefs.current,
        { y: 150, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.1, ease: 'power4.out' },
        "-=1.5"
      );

      // Hero Parallax on Scroll
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: pageRef.current, start: 'top top', end: '80% top', scrub: true }
      });

      // Text reveal lower down
      gsap.fromTo(textRefs.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: textRefs.current[0], start: 'top 85%' }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F5F5F0] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-1000">
        <h1 className="text-4xl md:text-6xl font-[magtis] uppercase font-extrabold tracking-tight">Service Not Found</h1>
        <button onClick={() => navigate('/')} className="mt-8 px-10 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest text-xs">Return Home</button>
      </div>
    );
  }

  // Split title into words for sophisticated stagger
  const titleWords = service.title.split(' ');

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 select-none overflow-hidden">
      
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-black dark:text-white transition-colors duration-1000 pointer-events-none mix-blend-difference">
        <div className="font-[magtis] text-xl md:text-2xl font-bold uppercase tracking-widest text-white">
          Mayuri <span className="text-[#6CAFBF]">LLP</span>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="group flex items-center gap-3 pointer-events-auto text-white hover:text-[#6CAFBF] transition-colors duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180 transition-transform duration-500 group-hover:-translate-x-2">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs uppercase font-bold tracking-[0.25em]">Back to Overview</span>
        </button>
      </header>

      {/* ── HERO SPLIT SCREEN ─────────────────────────────────── */}
      <section className="relative w-full h-[90vh] md:h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Typography */}
        <div className="w-full md:w-1/2 h-[45%] md:h-full flex flex-col justify-end md:justify-center px-6 md:px-[6vw] lg:px-[8vw] pb-12 md:pb-0 z-10 bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000">
          <div className="flex items-center gap-6 mb-[4vh] overflow-hidden">
            <span ref={addToTitleRefs} className="font-mono text-sm md:text-lg text-black/30 dark:text-white/30 tracking-[0.4em]">[{service.number}]</span>
            <div ref={addToTitleRefs} className="w-16 h-[1px] bg-[#6CAFBF]" />
            <span ref={addToTitleRefs} className="text-[#6CAFBF] text-xs md:text-sm tracking-[0.3em] uppercase font-bold">{service.subtitle}</span>
          </div>

          <h1 className="font-[magtis] uppercase font-extrabold text-[11vw] md:text-[5.5vw] lg:text-[4.5vw] leading-[0.9] tracking-tighter flex flex-col">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden">
                <span ref={addToTitleRefs} className="inline-block" style={{ color: i === titleWords.length - 1 ? '#6CAFBF' : '' }}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Right Side: Massive Image */}
        <div className="w-full md:w-1/2 h-[55%] md:h-full relative overflow-hidden bg-black">
          <img 
            ref={heroImgRef}
            src={service.img} 
            alt={service.title} 
            className="w-full h-full md:h-[120%] object-cover origin-center md:-mt-[10%]"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>

      {/* ── DETAILED OVERVIEW ─────────────────────────────────── */}
      <section className="w-full px-4 md:px-[8vw] py-[20vh] flex justify-center">
        <div className="w-full md:w-3/4 flex flex-col gap-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div ref={addToTextRefs} className="w-full md:w-[30%] flex flex-col gap-4">
              <span className="text-[#6CAFBF] text-[10px] tracking-[0.4em] uppercase font-bold">Scope of Work</span>
              <div className="h-[1px] w-full bg-black/10 dark:bg-white/10" />
              <p className="text-black/50 dark:text-white/50 text-sm font-medium leading-relaxed">
                Expert planning, execution, and finishing. We manage the entire lifecycle of this service to guarantee uncompromising Mayuri quality.
              </p>
            </div>
            
            <p ref={addToTextRefs} className="w-full md:w-[70%] text-xl md:text-[2.5rem] font-medium leading-[1.5] text-black dark:text-white transition-colors duration-1000 font-sans">
              {service.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── NEXT SERVICE CINEMATIC FOOTER (AWWWARDS) ──────────── */}
      <section 
        onClick={() => navigate(`/service/${nextService.number}`)}
        className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden cursor-pointer group z-10 bg-[#111]"
      >
        {/* Background Layer (Robust) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#0a0a0a]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 group-hover:opacity-80 transition-opacity duration-1000 scale-[1.02] group-hover:scale-100" 
            style={{ backgroundImage: `url(${nextService.img})` }} 
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000" />
        </div>

        {/* Content Layer (Typography) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full text-white pointer-events-none">
          <div className="overflow-hidden mb-6 z-30">
            <span className="flex items-center justify-center gap-4 font-mono text-[10px] md:text-xs tracking-[0.5em] text-[#6CAFBF] uppercase translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700">
              <span className="w-8 md:w-16 h-[1px] bg-[#6CAFBF]" />
              Up Next
              <span className="w-8 md:w-16 h-[1px] bg-[#6CAFBF]" />
            </span>
          </div>

          <h2 
            className="font-[magtis] uppercase font-extrabold leading-[0.9] tracking-tighter text-white group-hover:scale-[1.02] transition-transform duration-1000 z-30 relative px-8 text-center"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
          >
            {nextService.title}
          </h2>

          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 opacity-70 group-hover:opacity-100 transition-opacity duration-1000">
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase border border-white/30 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md shadow-2xl block text-center whitespace-nowrap">
              Explore Next Service
            </span>
          </div>
        </div>

        {/* Premium Outline Overlay */}
        <div className="absolute inset-[3%] md:inset-[5%] border border-white/10 z-20 pointer-events-none hidden md:block" />
        <div className="absolute top-[5%] left-[5%] w-4 h-4 border-t border-l border-white/50 z-20 pointer-events-none hidden md:block" />
        <div className="absolute top-[5%] right-[5%] w-4 h-4 border-t border-r border-white/50 z-20 pointer-events-none hidden md:block" />
        <div className="absolute bottom-[5%] left-[5%] w-4 h-4 border-b border-l border-white/50 z-20 pointer-events-none hidden md:block" />
        <div className="absolute bottom-[5%] right-[5%] w-4 h-4 border-b border-r border-white/50 z-20 pointer-events-none hidden md:block" />

      </section>

    </div>
  );
};

export default ServiceDetails;
