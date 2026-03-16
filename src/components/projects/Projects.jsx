import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  // Completed
  {
    id: 1,
    status: 'completed',
    name: 'Mayuri Infinity',
    label: 'MAYURI INFINITY',
    location: 'Pune, Maharashtra',
    type: 'Residential Complex',
    year: '2023',
    units: '120+ Units',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop',
    size: 'large', // large or small for masonry
  },
  {
    id: 2,
    status: 'completed',
    name: 'Mayuri Optimum',
    label: 'MAYURI OPTIMUM',
    location: 'Pune, Maharashtra',
    type: 'Commercial Tower',
    year: '2022',
    units: '200+ Units',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 3,
    status: 'completed',
    name: 'Mayuri Residency',
    label: 'MAYURI RESIDENCY',
    location: 'Pune, Maharashtra',
    type: 'Luxury Apartments',
    year: '2021',
    units: '80+ Units',
    img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=600&auto=format&fit=crop',
    size: 'small',
  },
  // Ongoing
  {
    id: 4,
    status: 'ongoing',
    name: 'Mayuri Infinity',
    label: 'MAYURI INFINITY II',
    location: 'Pune, Maharashtra',
    type: 'Residential Township',
    year: '2025 (Est.)',
    units: '300+ Units',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: 5,
    status: 'ongoing',
    name: 'Mayuri Optimum',
    label: 'MAYURI OPTIMUM PHASE 2',
    location: 'Pune, Maharashtra',
    type: 'Mixed-Use Development',
    year: '2026 (Est.)',
    units: '150+ Units',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 6,
    status: 'ongoing',
    name: 'Mayuri Residency',
    label: 'MAYURI ELITE',
    location: 'Pune, Maharashtra',
    type: 'Luxury Villas',
    year: '2026 (Est.)',
    units: '60+ Villas',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
    size: 'small',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const titleLines = useRef([]);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const cursorRef = useRef(null);
  const cursorImgRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);

  const [activeTab, setActiveTab] = useState('completed');
  const [hoveredCard, setHoveredCard] = useState(null);

  titleLines.current = [];
  cardRefs.current = [];

  const addTitleLine = (el) => el && !titleLines.current.includes(el) && titleLines.current.push(el);
  const addCard = (el) => el && !cardRefs.current.includes(el) && cardRefs.current.push(el);

  const filtered = allProjects.filter(p => p.status === activeTab);

  // Cursor follower for cards
  const handleMouseMove = (e) => {
    if (setX.current && setY.current) {
      setX.current(e.clientX - 160);
      setY.current(e.clientY - 110);
    }
  };

  // Show/hide cursor image on card hover
  useEffect(() => {
    if (hoveredCard !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(cursorRef.current, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.out' });
    }
  }, [hoveredCard]);

  // Tab switch — animate grid out then in
  const prevTab = useRef(activeTab);
  useEffect(() => {
    if (!gridRef.current) return;
    if (prevTab.current === activeTab) return;
    prevTab.current = activeTab;

    gsap.fromTo(gridRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Cursor quick setters
      setX.current = gsap.quickTo(cursorRef.current, 'x', { duration: 0.6, ease: 'power3' });
      setY.current = gsap.quickTo(cursorRef.current, 'y', { duration: 0.6, ease: 'power3' });

      // ── Title lines stagger reveal ─────────────────────────────────────────
      gsap.fromTo(titleLines.current,
        { y: 130, rotateX: -30, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1.4, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate card rows whenever filtered list changes
  useEffect(() => {
    if (!cardRefs.current.length) return;
    gsap.fromTo(cardRefs.current,
      { y: 60, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
      {
        y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.0, stagger: 0.1, ease: 'power4.out',
        delay: 0.1,
      }
    );
  }, [activeTab, filtered.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F5F0] text-black pt-[18vh] pb-[20vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* ══════════════════════════════════════════════
          HEADER — Headline + Tab Controls
      ════════════════════════════════════════════════ */}
      <div className="px-4 md:px-[6vw]">
        {/* Sub label */}
        <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#6CAFBF] mb-6">
          Great & Awesome Works
        </p>

        {/* Big two-line heading */}
        <div ref={headlineRef} className="mb-[8vh]" style={{ perspective: '1000px' }}>
          {['Our', 'Projects'].map((word, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <span
                ref={addTitleLine}
                className="block font-[magtis] uppercase font-extrabold text-[16vw] md:text-[12vw] leading-[0.88] tracking-tighter"
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Tab toggle + count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="flex items-center gap-2">
            {['completed', 'ongoing'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-500 rounded-full ${
                  activeTab === tab
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black/50 hover:text-black border border-black/15 hover:border-black'
                }`}
              >
                {tab === 'completed' ? 'Completed' : 'Ongoing'}
                <span className={`ml-2 text-xs font-bold transition-colors duration-300 ${activeTab === tab ? 'text-[#6CAFBF]' : 'text-black/30'}`}>
                  {allProjects.filter(p => p.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          <p className="text-black/50 text-sm md:text-base font-medium max-w-xs leading-relaxed">
            Landmarks that stand as testaments to excellence, precision, and vision across Pune.
          </p>
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          FEATURE PROJECT — Big hero row
      ════════════════════════════════════════════════ */}
      {filtered.length > 0 && (
        <div
          ref={addCard}
          className="px-4 md:px-[6vw] mt-[6vh] group cursor-none"
          onMouseEnter={() => setHoveredCard(filtered[0].id)}
          onMouseLeave={() => setHoveredCard(null)}
          key={`feature-${activeTab}`}
        >
          <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-sm">
            <img
              src={filtered[0].img}
              alt={filtered[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            {/* Status badge */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${activeTab === 'ongoing' ? 'bg-[#6CAFBF]' : 'bg-white'}`} />
              <span className="text-white/70 text-xs tracking-widest uppercase font-bold">
                {activeTab === 'ongoing' ? 'In Progress' : 'Delivered'}
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-[5vh] md:px-[4vw] flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
              <div className="flex flex-col gap-4">
                <span className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold">01 — Featured</span>
                <h2 className="font-[magtis] uppercase font-extrabold text-white text-[6vh] md:text-[9vh] leading-[0.88] tracking-tight">
                  {filtered[0].label}
                </h2>
                <div className="flex items-center gap-6 text-white/60 text-sm">
                  <span>{filtered[0].type}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{filtered[0].location}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{filtered[0].year}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 group/btn">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-[#6CAFBF] group-hover/btn:border-[#6CAFBF] transition-all duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="-rotate-45">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/60 text-sm tracking-widest uppercase font-bold hidden md:block">View Project</span>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ══════════════════════════════════════════════
          MASONRY GRID — Remaining projects
      ════════════════════════════════════════════════ */}
      {filtered.length > 1 && (
        <div
          ref={gridRef}
          className="px-4 md:px-[6vw] mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {filtered.slice(1).map((project, index) => (
            <div
              key={project.id}
              ref={addCard}
              className="group relative overflow-hidden rounded-sm cursor-none"
              style={{ height: index === 0 ? '55vh' : '45vh' }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={project.img}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Number label */}
              <span className="absolute top-6 left-6 text-white/30 font-[magtis] text-base font-bold tracking-widest">
                0{index + 2}
              </span>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
                <h3 className="font-[magtis] uppercase font-extrabold text-white text-[4vh] md:text-[5vh] leading-[1] tracking-tight group-hover:translate-y-[-4px] transition-transform duration-500 ease-out">
                  {project.label}
                </h3>
                <div className="flex items-center gap-4 text-white/50 text-xs tracking-widest">
                  <span className="uppercase">{project.type}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="uppercase">{project.year}</span>
                </div>
              </div>

              {/* Hover: Reveal pill */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="bg-[#6CAFBF] text-white text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-full">
                  {project.units}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* ══════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════ */}
      <div className="px-4 md:px-[6vw] mt-[10vh]">
        <div className="w-full border border-black/10 rounded-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
          {[
            { value: '15+', label: 'Years of Excellence' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '5000+', label: 'Happy Families' },
            { value: '100%', label: 'Commitment' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 p-6 md:p-10 group hover:bg-black transition-colors duration-500">
              <span className="font-[magtis] text-[5vh] md:text-[6vh] font-extrabold leading-none tracking-tight group-hover:text-white transition-colors duration-500">
                {stat.value}
              </span>
              <span className="text-black/40 text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-white/50 transition-colors duration-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          CURSOR FOLLOWER IMAGE
      ════════════════════════════════════════════════ */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[220px] h-[160px] pointer-events-none z-[999] rounded-sm overflow-hidden shadow-2xl opacity-0"
        style={{ transformOrigin: 'center', willChange: 'transform, opacity' }}
      >
        <div ref={cursorImgRef} className="w-full h-full relative">
          {allProjects.map(p => (
            <img
              key={p.id}
              src={p.thumb}
              alt={p.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${hoveredCard === p.id ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/15" />
        {/* Label inside cursor */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-white text-[10px] tracking-widest uppercase font-bold block">
            {allProjects.find(p => p.id === hoveredCard)?.label || ''}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
