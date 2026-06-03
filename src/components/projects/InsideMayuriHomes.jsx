import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all images from the folder
const imageModules = import.meta.glob('../../assets/Flats_Img/*.{jpeg,jpg,png,webp}', { eager: true });
const images = Object.values(imageModules).map(module => module.default);

const InsideMayuriHomes = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [animClass, setAnimClass] = useState('anim-scale-up');
  const pageRef = useRef(null);
  const headlineRef = useRef(null);
  const imageRefs = useRef([]);
  imageRefs.current = [];

  const addImageRef = el => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const changeImage = (newImage) => {
    const classes = ['anim-scale-up', 'anim-slide-left', 'anim-slide-right', 'anim-flip', 'anim-blur'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    
    setAnimClass('');
    setSelectedImage(newImage);
    
    setTimeout(() => {
      setAnimClass(randomClass);
    }, 10);
  };

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) });
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      const currentIndex = images.indexOf(selectedImage);
      if (e.key === 'ArrowRight') {
        changeImage(images[(currentIndex + 1) % images.length]);
      } else if (e.key === 'ArrowLeft') {
        changeImage(images[(currentIndex - 1 + images.length) % images.length]);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 }
      );

      // Gallery Images Stagger Animation
      imageRefs.current.forEach((img, index) => {
        gsap.fromTo(img,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 select-none overflow-hidden pb-[20vh]">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <div className="font-[magtis] text-xl md:text-2xl font-bold uppercase tracking-widest">
          Mayuri <span className="text-[#6CAFBF]">LLP</span>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="group flex items-center gap-3 pointer-events-auto hover:text-[#6CAFBF] transition-colors duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180 transition-transform duration-500 group-hover:-translate-x-2">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs uppercase font-bold tracking-[0.25em]">Back to Overview</span>
        </button>
      </header>

      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center mt-[20vh] mb-[15vh] px-4 md:px-[6vw]" ref={headlineRef}>
        <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#6CAFBF] mb-6">
          Experience the warmth
        </p>
        <h1 className="font-[magtis] uppercase font-extrabold text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter mb-8">
          Step Inside Your <br/> Future Home
        </h1>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-lg max-w-2xl font-medium leading-relaxed">
          Explore thoughtfully designed interiors crafted for comfort, elegance, and modern living.
        </p>
      </div>

      {/* ── GALLERY GRID ───────────────────────────────────────── */}
      <div className="px-4 md:px-[6vw] columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {images.map((src, idx) => (
          <div 
            key={idx} 
            ref={addImageRef} 
            className="relative overflow-hidden rounded-[4px] group break-inside-avoid shadow-xl cursor-pointer"
            onClick={() => {
              setAnimClass('anim-scale-up');
              setSelectedImage(src);
            }}
          >
            <img 
              src={src} 
              alt={`Interior ${idx + 1}`} 
              className="w-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-transparent pointer-events-none" />
            
            {/* View Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX MODAL ─────────────────────────────────────── */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
          selectedImage ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSelectedImage(null)}
      >
        {/* Background Wind Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({length: 10}).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-[1px] bg-white/[0.03]" style={{ top: `${(i+1)*10}%` }}>
              <div className="absolute top-0 left-0 h-full w-[20%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[wind-h_4s_infinite_linear]" style={{ animationDelay: `${i*0.4}s` }} />
            </div>
          ))}
          {Array.from({length: 10}).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-[1px] bg-white/[0.03]" style={{ left: `${(i+1)*10}%` }}>
              <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-white/30 to-transparent animate-[wind-v_5s_infinite_linear]" style={{ animationDelay: `${i*0.3}s` }} />
            </div>
          ))}
        </div>

        <button 
          className="absolute top-6 right-6 md:top-10 md:right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-20"
          onClick={() => setSelectedImage(null)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button 
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-20"
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = images.indexOf(selectedImage);
            changeImage(images[(currentIndex - 1 + images.length) % images.length]);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button 
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-20"
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = images.indexOf(selectedImage);
            changeImage(images[(currentIndex + 1) % images.length]);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center z-10 pointer-events-none">
          {selectedImage && (
            <img 
              key={selectedImage}
              src={selectedImage} 
              alt="Enlarged Interior" 
              className={`max-w-full max-h-full object-contain rounded shadow-2xl pointer-events-auto ${animClass}`}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes anim-scale-up {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes anim-slide-left {
          0% { transform: translateX(50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes anim-slide-right {
          0% { transform: translateX(-50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes anim-flip {
          0% { transform: perspective(1000px) rotateX(10deg); opacity: 0; }
          100% { transform: perspective(1000px) rotateX(0); opacity: 1; }
        }
        @keyframes anim-blur {
          0% { filter: blur(10px); opacity: 0; transform: scale(1.05); }
          100% { filter: blur(0); opacity: 1; transform: scale(1); }
        }
        .anim-scale-up { animation: anim-scale-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .anim-slide-left { animation: anim-slide-left 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .anim-slide-right { animation: anim-slide-right 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .anim-flip { animation: anim-flip 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .anim-blur { animation: anim-blur 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        
        @keyframes wind-h {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(500%); opacity: 0; }
        }
        @keyframes wind-v {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(500%); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default InsideMayuriHomes;
