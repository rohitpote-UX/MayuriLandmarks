import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import optimumVideo from '../../assets/Flats_Img/Mayuri Optimum Walkthrough.mp4';

gsap.registerPlugin(ScrollTrigger);

export const allProjectsData = [
  {
    id: 1,
    status: 'completed',
    name: 'Infinity',
    label: 'INFINITY',
    location: 'Pune, Maharashtra',
    type: 'Residential Complex',
    year: '2023',
    units: '120+ Units',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop',
    size: 'large',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Mayuri Infinity represents the zenith of contemporary residential design, offering residents an unparalleled panoramic living experience in the heart of Pune. Meticulously crafted with a focus on biophilic elements, natural light, and cross-ventilation, each residence is a sanctuary of peace. The project integrates state-of-the-art home automation with lush, expansive terrace gardens, creating a seamless transition between indoor luxury and the vibrant natural landscape surrounding the premises. Delivering not just a physical home, but a truly elevated and mindful lifestyle.'
  },
  {
    id: 2,
    status: 'completed',
    name: 'Optimum',
    label: 'OPTIMUM',
    location: 'Pune, Maharashtra',
    type: 'Commercial Tower',
    year: '2022',
    units: '200+ Units',
    video: optimumVideo,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Setting a rigorous new benchmark for corporate architecture, Mayuri Optimum integrates sustainable energy practices with bold, geometric facade design to empower modern businesses. The striking low-e glass skin ensures maximum thermal efficiency while bathing the premium office suites in diffuse natural sunlight. Featuring double-height statement lobbies, intelligent building management systems, and high-speed transit elevators, Optimum provides a world-class environment explicitly designed to foster corporate productivity, high-level networking, and undeniable prestige.'
  },
  {
    id: 3,
    status: 'completed',
    name: 'Residency',
    label: 'RESIDENCY',
    location: 'Pune, Maharashtra',
    type: 'Luxury Apartments',
    year: '2021',
    units: '80+ Units',
    img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'An intimate enclave of boutique luxury apartments tailored strictly for families seeking an oasis of calm without compromising urban connectivity. Mayuri Residency features a bespoke collection of limited homes, designed with sweeping ergonomic layouts, private foyer entrances, and premium imported material finishes. The property boasts a fully equipped clubhouse, temperature-controlled leisure pools, and secure children’s zones, making it the ultimate destination for refined community living where every architectural decision revolves around the residents’ holistic well-being.'
  },
  {
    id: 4,
    status: 'ongoing',
    name: 'Adhinathpuram',
    label: ' Adhinathpuram',
    location: 'Pune, Maharashtra',
    type: 'Residential Township',
    year: '2025 (Est.)',
    units: '300+ Units',
    video: 'https://www.mayurilandmarks.com/images/sliders/FlatNew1.mp4',
    img: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    thumb: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    images: [
      'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'The highly anticipated sequel to our flagship development. Infinity II promises to redefine the expansive township footprint by combining visionary architecture with self-sustaining community micro-ecosystems. Spanning acres of lush landscapes, the project features integrated jogging trails, multiple professional sports arenas, and boutique retail pavilions right at your doorstep. Crafted for the future of urban dwelling, every tower incorporates rainwater harvesting loops, active solar integration, and smart parking arrays, establishing a sustainable, ultra-modern generational home.'
  },
  {
    id: 5,
    status: 'ongoing',
    name: 'Mayuri Optimum Phase 2',
    label: 'MAYURI OPTIMUM 2',
    location: 'Pune, Maharashtra',
    type: 'Mixed-Use Development',
    year: '2026 (Est.)',
    units: '150+ Units',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Expanding the Optimum footprint, Phase 2 brings world-class lifestyle zones bridging the gap between rigorous work routines, domestic life, and exquisite leisure. Conceived as a high-street commercial hub, the development introduces a curated mix of luxury retail fronts, gourmet dining terraces, and agile office suites. It acts as an economic and cultural catalyst for the neighborhood, boasting expansive pedestrian promenades, interactive water features, and shaded outdoor seating zones that fluidly connect commercial energy with a relaxed, engaging pedestrian experience.'
  },
  {
    id: 6,
    status: 'ongoing',
    name: 'Mayuri Elite',
    label: 'MAYURI ELITE',
    location: 'Pune, Maharashtra',
    type: 'Luxury Villas',
    year: '2026 (Est.)',
    units: '60+ Villas',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'An ultra-exclusive collection of signature bespoke villas meticulously designed for the few. Featuring private plunge pools, expansive terraced sky-gardens, and bespoke interior finish palettes, Mayuri Elite represents the ultimate pinnacle of private urban living. The architectural language speaks loudly of timeless minimalism, utilizing native indigenous stone, vast unbroken panoramic glass panels, and rare timber highlights to craft homes that age like fine art. Supported with a 3-tier matrix security system and 24/7 personalized concierge services, Elite offers total seclusion wrapped in ultimate luxury.'
  },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = parseInt(id);
  
  const currentIndex = allProjectsData.findIndex(p => p.id === currentId);
  const project = allProjectsData[currentIndex];

  const prevProject = allProjectsData[currentIndex === 0 ? allProjectsData.length - 1 : currentIndex - 1];
  const nextProject = allProjectsData[currentIndex === allProjectsData.length - 1 ? 0 : currentIndex + 1];

  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const titleCharsRef = useRef([]);
  const infoBlockRefs = useRef([]);
  const galleryRefs = useRef([]);
  const blueprintRef = useRef(null);

  titleCharsRef.current = [];
  infoBlockRefs.current = [];
  galleryRefs.current = [];

  const addToRefs = (el, array) => el && !array.current.includes(el) && array.current.push(el);

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
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (!project) return;
    
    let ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const tl = gsap.timeline();
      
      tl.fromTo(heroImgRef.current, 
        { scale: 1.25, filter: 'brightness(0.2)' }, 
        { scale: 1, filter: 'brightness(1)', duration: 2.5, ease: 'power4.out' }
      )
      .fromTo(titleCharsRef.current,
        { y: 150, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.05, ease: 'power4.out' },
        "-=1.8"
      );

      // Info Blocks Slide In
      gsap.fromTo(infoBlockRefs.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: infoBlockRefs.current[0], start: 'top 85%' }
        }
      );

      // Hero Parallax
      gsap.to(heroImgRef.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: { trigger: pageRef.current, start: 'top top', end: '80% top', scrub: true }
      });

      // Gallery Sequence
      galleryRefs.current.forEach((el) => {
        gsap.fromTo(el, 
          { y: 100, opacity: 0, scale: 0.95, clipPath: 'inset(10% 10% 10% 10%)' },
          { 
            y: 0, opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });

      // Blueprint Float Animation
      gsap.fromTo(blueprintRef.current,
        { y: 50, scale: 0.95, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: blueprintRef.current, start: 'top 80%' }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F5F5F0] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-1000">
        <h1 className="text-4xl md:text-6xl font-[magtis] uppercase font-extrabold tracking-tight">Project Not Found</h1>
        <button onClick={() => navigate('/')} className="mt-8 px-10 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest text-xs">Return to Portfolio</button>
      </div>
    );
  }

  const titleChars = project.label.split('');
  const blueprintSrc = `/assets/images/blueprints/blueprint_${(project.id % 3) + 1}.png`;

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 select-none overflow-hidden">
      
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
      <section className="relative w-full h-[90vh] md:h-[100vh] overflow-hidden bg-black flex items-center justify-center rounded-b-sm md:rounded-b-[20px]">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] origin-center">
          {project.video ? (
            <video 
              ref={heroImgRef}
              src={project.video} autoPlay loop muted playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              ref={heroImgRef}
              src={project.img} alt={project.name} 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 mt-[10vh] overflow-hidden pointer-events-none">
          <p className="text-[#6CAFBF] text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-4 md:mb-8 text-center drop-shadow-lg">
            {project.status === 'completed' ? 'Delivered Masterpiece' : 'Vision in Progress'}
          </p>
          <h1 
            className="font-[magtis] uppercase font-extrabold text-white leading-[0.85] tracking-tighter text-center flex flex-wrap justify-center overflow-hidden max-w-[95vw]" 
            style={{ fontSize: 'clamp(4rem, 13vw, 18rem)' }}
          >
            {titleChars.map((char, index) => (
              <span 
                key={index} 
                ref={(el) => addToRefs(el, titleCharsRef)}
                className="inline-block"
                style={{ width: char === ' ' ? '3vw' : 'auto' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
          {/* <span className="text-white text-[10px] uppercase font-bold tracking-widest">Scroll to Explore</span> */}
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-[slide_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* ── OVERVIEW GRID ──────────────────────────────────────── */}
      <section className="w-full px-4 md:px-[8vw] py-[20vh]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[10vh] md:gap-[15vw]">
          <div ref={el => addToRefs(el, infoBlockRefs)} className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#6CAFBF] text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Concept & Overview</h3>
              <div className="h-[2px] w-24 bg-black/10 dark:bg-white/10 mt-2" />
            </div>
            <p className="text-base md:text-xl lg:text-2xl font-medium leading-[1.7] md:leading-[1.6] text-black/80 dark:text-white/80 transition-colors duration-1000 text-left">
              {project.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-20 gap-x-16 pt-[8vh] lg:pt-0 border-t lg:border-t-0 border-black/10 dark:border-white/10 lg:border-l lg:pl-[5vw] transition-colors duration-1000">
            {[
              { label: 'Prime Location', value: project.location },
              { label: 'Typology', value: project.type },
              { label: 'Completion', value: project.year },
              { label: 'Scale', value: project.units }
            ].map((detail, idx) => (
              <div key={idx} ref={el => addToRefs(el, infoBlockRefs)} className="flex flex-col gap-3">
                <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-black/40 dark:text-white/40 transition-colors duration-1000">
                  {detail.label}
                </span>
                <span className="font-[magtis] text-xl md:text-4xl uppercase font-extrabold leading-none text-black dark:text-white transition-colors duration-1000">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH BLUEPRINT ISO LAYOUT ──────────────────────────── */}
      <section className="relative w-full h-[80vh] mt-[10vh] md:h-[100vh] border-y border-black/10 dark:border-white/10 flex items-center justify-center p-4 md:p-8 bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000 overflow-hidden font-mono text-[8px] md:text-[10px] uppercase">
        
        {/* HUD Layer */}
        <div className="absolute top-6 md:top-8 left-4 md:left-8 tracking-[0.2em] opacity-50 z-10 flex flex-col md:flex-row md:items-center">
          <span>PROYECTO <span className="mx-2 hidden md:inline">▸▸▸</span></span> 
          <span className="mt-1 md:mt-0 font-bold bg-black text-white dark:bg-white dark:text-black py-1 px-2 mb-2 md:mb-0">
            [CFB] / [{project.id.toString().padStart(3, '0')}] / [{project.label}]
          </span>
        </div>
        
        <div className="absolute top-6 md:top-8 right-4 md:right-8 tracking-[0.2em] opacity-50 z-10 flex flex-col md:flex-row gap-2 md:gap-8 text-right md:text-left">
          <span>FINALIZACION:<span className="mx-1 md:mx-2">▸</span>{project.year.includes('Est') ? 'W.I.P' : 'DONE'}</span>
          <span>SUPERFICIE:<span className="mx-1 md:mx-2">▸</span>{project.units}</span>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 -rotate-90 origin-left tracking-[0.3em] opacity-40 z-10 hidden md:block">
          [ARCHITECTURAL. / ISO. {project.id}]
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 rotate-90 origin-right tracking-[0.3em] opacity-40 z-10 hidden md:block">
          [VECTOR. / SCHEMATIC.]
        </div>

        <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 flex flex-col gap-2 tracking-[0.2em] opacity-50 z-10">
          <span>[38*59'19"N] ▄ [0*31'00"O]</span>
          <div className="flex gap-4 mt-2 font-bold">
            <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">[COOKIES]</span>
            <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">[PRIVACY]</span>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 text-right tracking-[0.2em] opacity-50 z-10">
          <div className="flex justify-end gap-1 mb-2">
            <span>▼</span><span>▼</span><span>▼</span>
          </div>
          <span>[MH] [PUNE]</span>
          <span className="hover:text-[#6CAFBF] cursor-pointer mt-2 font-bold transition-colors">[PRESSKIT]</span>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 tracking-[0.2em] opacity-40 z-10 font-bold">
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">[DEV.S]</span>
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors hidden md:inline">[INSTAGRAM]</span>
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors hidden md:inline">[LINKEDIN]</span>
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">[W.D.C]</span>
        </div>

        {/* Blueprint Iso Image */}
        <div className="relative w-[95%] md:w-[75%] h-[60%] md:h-[75%] z-0 flex items-center justify-center mix-blend-multiply dark:mix-blend-screen opacity-90 dark:invert transition-all duration-1000">
          <img 
            ref={blueprintRef}
            src={blueprintSrc} 
            alt="Architectural Blueprint" 
            className="w-full h-full object-contain"
          />
        </div>

      </section>

      {/* ── MASONRY GALLERY ─────────────────────────────────────── */}
      <section className="w-full py-[15vh] px-4 md:px-[4vw] flex flex-col gap-8 md:gap-12 mt-[10vh]">
        <div className="w-full flex justify-center mb-8">
            <h2 className="font-[magtis] text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-center max-w-xl text-black dark:text-white transition-colors duration-1000">
              Project <span className="text-[#6CAFBF]">Gallery</span>
            </h2>
        </div>

        {project.images?.map((imgUrl, idx) => {
          let layoutClass = "w-full h-[60vh] md:h-[90vh]"; 
          if (idx % 3 === 1) layoutClass = "w-full md:w-[75%] ml-auto md:mr-[5vw] h-[55vh] md:h-[80vh]"; 
          if (idx % 3 === 2) layoutClass = "w-full md:w-[65%] mr-auto md:ml-[5vw] h-[50vh] md:h-[75vh]";

          return (
            <div 
              key={idx} 
              ref={el => addToRefs(el, galleryRefs)} 
              className={`relative overflow-hidden mb-[5vh] md:mb-[10vh] rounded-[4px] shadow-xl group ${layoutClass}`}
            >
              <img 
                src={imgUrl} 
                alt={`${project.label} Visual ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-transparent" />
            </div>
          );
        })}
      </section>

      {/* ── 10/10 AWWWARDS CINEMATIC REVEAL FOOTER ────────────────── */}
      <section 
        onClick={() => navigate(`/project/${nextProject.id}`)}
        className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center cursor-pointer group z-10 bg-[#111] mt-[10vh]"
      >
        {/* Background Layer (Robust) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#0a0a0a]">
          {nextProject.video ? (
            <video src={nextProject.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          ) : (
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-50 group-hover:opacity-90 transition-opacity duration-1000 scale-[1.02] group-hover:scale-100" 
              style={{ backgroundImage: `url(${nextProject.thumb || nextProject.img})` }} 
            />
          )}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000" />
        </div>

        {/* Content Layer (Typography) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full text-white pointer-events-none">
          <div className="overflow-hidden mb-4 z-30">
            <span className="flex items-center justify-center gap-4 font-mono text-[10px] md:text-xs tracking-[0.5em] text-[#6CAFBF] uppercase translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700">
              <span className="w-8 md:w-16 h-[1px] bg-[#6CAFBF]" />
              Up Next
              <span className="w-8 md:w-16 h-[1px] bg-[#6CAFBF]" />
            </span>
          </div>

          <h2 
            className="font-[magtis] uppercase font-extrabold leading-none tracking-tighter text-white group-hover:scale-[1.02] transition-transform duration-1000 z-30 relative px-4 text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 15rem)' }}
          >
            {nextProject.name}
          </h2>

          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 opacity-70 group-hover:opacity-100 transition-opacity duration-1000">
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase border border-white/30 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md shadow-2xl block text-center whitespace-nowrap">
              Click Anywhere To Explore
            </span>
          </div>
        </div>

        {/* Interactive Grid Overlay */}
        <div className="absolute inset-0 z-20 grid grid-cols-3 md:grid-cols-4 grid-rows-4 md:grid-rows-3 w-full h-full border-t border-l border-white/10 pointer-events-auto">
          {Array.from({ length: 12 }).map((_, i) => {
            const hasHoverImg = [1, 3, 4, 7, 9].includes(i);
            const imagesArray = nextProject.images || [];
            const hoverImgUrl = hasHoverImg && imagesArray.length > 0 ? imagesArray[i % imagesArray.length] : (hasHoverImg ? nextProject.img : null);
            const isClickCta = [2, 5, 8, 11].includes(i);
            
            return (
              <div 
                key={i} 
                className="relative border-r border-b border-white/10 group/cell transition-colors duration-700 hover:bg-black/50 overflow-hidden flex items-center justify-center"
              >
                {hoverImgUrl && (
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 group-hover/cell:opacity-[0.85] transition-opacity duration-700 z-0 pointer-events-none" 
                    style={{ backgroundImage: `url(${hoverImgUrl})` }}
                  />
                )}

                {i === 0 && <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.4em] opacity-30 group-hover/cell:opacity-100 transition-opacity duration-500 z-10 hidden md:block text-white">[GRD.00]</span>}
                {i === 6 && <span className="absolute bottom-4 right-4 font-mono text-[8px] tracking-[0.4em] opacity-30 group-hover/cell:opacity-100 transition-opacity duration-500 z-10 hidden md:block text-white">[SYS.ACT]</span>}
                
                {isClickCta && (
                  <div className="relative z-10 flex flex-col items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-all duration-500 translate-y-4 group-hover/cell:translate-y-0">
                    <div className="w-10 h-10 md:w-16 md:h-16 border border-white/40 rounded-full flex items-center justify-center mb-2 bg-black/40 backdrop-blur-md text-white group-hover/cell:scale-110 group-hover/cell:bg-[#6CAFBF] group-hover/cell:border-[#6CAFBF] transition-all duration-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 md:w-6 md:h-6 -rotate-45">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase bg-black/60 px-3 py-1 backdrop-blur-md rounded border border-white/10 text-white">Open</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <style jsx="true">{`
        @keyframes slide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
