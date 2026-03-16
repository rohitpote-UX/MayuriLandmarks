import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Rahul & Priya Sharma',
    project: 'Mayuri Infinity',
    role: 'Homeowners · 2023',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Mayuri Landmarks transformed our vision into a home beyond imagination. The craftsmanship, attention to detail, and commitment — every corner of our apartment speaks of genuine care and precision.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Meera Kulkarni',
    project: 'Mayuri Optimum',
    role: 'Business Owner · 2022',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'From the first consultation to the final handover, the team was extraordinary. Our commercial space is exactly what we dreamed of — functional, elegant, and delivered perfectly on schedule.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Suresh Patil',
    project: 'Mayuri Residency',
    role: 'Resident · 2021',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    quote: 'I have lived in three cities and five homes. Mayuri Residency is the first place that truly felt like it was built for me. The build quality and peaceful environment are absolutely unmatched.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Anjali & Rohan Desai',
    project: 'Mayuri Infinity II',
    role: 'Early Investors · 2024',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'Investing with Mayuri Landmarks was the single best financial decision we made this decade. Transparent process, stunning design, and a team that genuinely listens to every concern.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    project: 'Mayuri Elite',
    role: 'Villa Owner · 2024',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    quote: 'The level of luxury and finish at Mayuri Elite simply has no parallel in Pune. Every tile, every fixture, every inch of outdoor landscaping exceeded our expectations by a wide margin.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex items-center gap-1">
    {Array(count).fill(null).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#6CAFBF">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const titleLines = useRef([]);
  const windowPanelRefs = useRef([]);
  const tickerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  titleLines.current = [];
  windowPanelRefs.current = [];

  const addTitle = (el) => el && !titleLines.current.includes(el) && titleLines.current.push(el);
  const addPanel = (el) => el && !windowPanelRefs.current.includes(el) && windowPanelRefs.current.push(el);

  const goTo = (idx) => {
    const next = (idx + testimonials.length) % testimonials.length;
    setActiveIndex(next);
  };

  // Window-pane wave animation on mount (architectural feel)
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Ticker marquee
      gsap.to(tickerRef.current, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      });

      // ── Headline stagger reveal
      gsap.fromTo(titleLines.current,
        { y: 130, rotateX: -30, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1.4, stagger: 0.08, ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      );

      // ── Window-pane wave: panels animate in like building windows lighting up
      gsap.fromTo(windowPanelRefs.current,
        { scaleY: 0, transformOrigin: 'bottom center', opacity: 0 },
        {
          scaleY: 1, opacity: 1,
          duration: 1.2,
          stagger: { each: 0.12, from: 'start', ease: 'power2.inOut' },
          ease: 'power3.out',
          scrollTrigger: { trigger: windowPanelRefs.current[0], start: 'top 88%' }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => goTo(activeIndex + 1), 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const active = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="w-full bg-[#080808] text-white overflow-hidden">

      {/* ══ TICKER BAND ══ */}
      <div className="w-full border-b border-white/8 py-4 overflow-hidden">
        <div ref={tickerRef} className="flex gap-0 w-max">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="shrink-0 text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold pr-16 whitespace-nowrap">
              Trusted by 5000+ Families &nbsp;·&nbsp; Mayuri Landmarks LLP &nbsp;·&nbsp; Pune's Most Trusted Developer &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>


      {/* ══ HEADER ══ */}
      <div className="px-4 md:px-[6vw] pt-[14vh] pb-[8vh]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div ref={headlineRef} style={{ perspective: '1000px' }}>
            <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-5">Client Stories</p>
            {['What They', 'Say About Us'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <span
                  ref={addTitle}
                  className="block font-[magtis] uppercase font-extrabold tracking-tighter leading-[0.9]"
                  style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)' }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Progress counter + controls */}
          <div className="flex flex-col items-start md:items-end gap-5 shrink-0">
            <div className="font-[magtis] font-extrabold text-white/10 leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
              <span className="text-white/20" style={{ fontSize: '0.45em' }}>
                /{String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => goTo(activeIndex - 1)}
                className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#6CAFBF] hover:text-[#6CAFBF] transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => goTo(activeIndex + 1)}
                className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#6CAFBF] hover:text-[#6CAFBF] transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/8 mt-[6vh]" />
      </div>


      {/* ══ MAIN TESTIMONIAL CARD ══ */}
      <div className="px-4 md:px-[6vw] pb-[8vh]">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-stretch min-h-[48vh]">

          {/* Left: Quote Content */}
          <div className="flex flex-col justify-between gap-8 py-6 md:py-8">
            <Stars count={active.rating} />

            <blockquote className="text-white/85 font-sans font-medium leading-[1.65]"
              style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.7rem)' }}
            >
              <span className="font-[magtis] text-[#6CAFBF] leading-none" style={{ fontSize: '3em', lineHeight: '0.6' }}>"</span>
              <br />
              {active.quote}
              <span className="font-[magtis] text-[#6CAFBF] leading-none" style={{ fontSize: '3em', lineHeight: '0' }}>"</span>
            </blockquote>

            <div className="flex items-center gap-4 border-t border-white/8 pt-6">
              <img src={active.avatar} alt={active.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#6CAFBF]/40 shrink-0"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(active.name) + '&background=6CAFBF&color=000'; }}
              />
              <div>
                <p className="text-white font-bold text-base md:text-lg leading-tight">{active.name}</p>
                <p className="text-[#6CAFBF] text-xs tracking-[0.2em] uppercase font-bold mt-0.5">{active.project}</p>
                <p className="text-white/30 text-xs mt-0.5">{active.role}</p>
              </div>
            </div>
          </div>

          {/* Right: Architectural Window Panel — the real estate animation */}
          <div className="relative overflow-hidden rounded-sm min-h-[40vh] md:min-h-0">
            {/* Building-window grid overlay */}
            <img
              src={active.img}
              alt={active.project}
              key={active.id}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />

            {/* Window pane grid — architectural decoration */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-[3px] p-3 pointer-events-none">
              {Array(12).fill(null).map((_, i) => (
                <div
                  key={i}
                  ref={addPanel}
                  className="border border-white/8 rounded-[2px]"
                  style={{ background: i % 3 === 1 ? 'rgba(108,175,191,0.04)' : 'rgba(255,255,255,0.02)' }}
                />
              ))}
            </div>

            {/* Project label */}
            <div className="absolute bottom-5 left-5 z-10 flex flex-col gap-1">
              <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">{active.project}</span>
              <span className="text-white/40 text-xs">{active.role}</span>
            </div>

            {/* Cyan corner accent */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF] animate-pulse" />
              <span className="text-white/30 text-[10px] tracking-widest uppercase">Verified</span>
            </div>
          </div>
        </div>
      </div>


      {/* ══ PROGRESS + ALL THUMBNAILS ══ */}
      <div className="px-4 md:px-[6vw] pb-[10vh]">

        {/* Progress bar */}
        <div className="w-full h-[1px] bg-white/10 relative mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-[#6CAFBF] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
          />
        </div>

        {/* Thumbnail strip — all 5 visible */}
        <div className="grid grid-cols-5 gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              className={`group relative overflow-hidden rounded-sm transition-all duration-500 ${i === activeIndex ? 'ring-2 ring-[#6CAFBF]' : 'opacity-40 hover:opacity-70'}`}
              style={{ height: '9vh' }}
            >
              <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40" />
              {/* Window pane lines */}
              <div className="absolute inset-[3px] grid grid-cols-2 gap-[2px] pointer-events-none">
                <div className="border border-white/10 rounded-[1px]" />
                <div className="border border-white/10 rounded-[1px]" />
              </div>
              {/* Active indicator */}
              {i === activeIndex && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6CAFBF]" />
              )}
            </button>
          ))}
        </div>

        {/* Dot indicators row */}
        <div className="flex items-center gap-3 mt-5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 h-2 bg-[#6CAFBF]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
          <span className="ml-auto text-white/20 text-xs tracking-widest">Drag to explore</span>
        </div>
      </div>


      {/* ══ CTA STRIP ══ */}
      <div className="px-4 md:px-[6vw] pb-[12vh]">
        <div className="w-full border border-white/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">
          <div>
            <h3 className="font-[magtis] uppercase font-extrabold text-white leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
              Ready to Start Your Journey?
            </h3>
            <p className="text-white/40 text-sm md:text-base font-medium mt-2">
              Join thousands of happy families who chose Mayuri Landmarks.
            </p>
          </div>
          <button
            onClick={() => { const el = document.getElementById('section-contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="group flex items-center gap-4 px-8 py-4 bg-[#6CAFBF] text-black font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-white transition-colors duration-500 shrink-0"
          >
            Get in Touch
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
