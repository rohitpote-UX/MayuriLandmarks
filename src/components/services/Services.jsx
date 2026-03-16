import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Tiling & Painting',
    subtitle: 'Surface Excellence',
    desc: 'Tiling is an effective way to add elegance & style to any bath or kitchen. Mayuri Landmarks LLP specializes in tile installation and works directly with each homeowner to deliver flawless, lasting results.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'Renovations',
    subtitle: 'Reinvented Spaces',
    desc: 'Mayuri Landmarks LLP has full-service renovation expertise. Equipped with the right tools and people, we handle projects of all sizes and provide the highest quality of craftsmanship imaginable.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1800&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'Design & Build',
    subtitle: 'Vision to Reality',
    desc: 'Mayuri Landmarks LLP eliminates the task of dividing your project between separate architecture and construction firms. We offer unified design and build services under one roof for a seamless journey.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
  },
  {
    number: '04',
    title: 'Consulting',
    subtitle: 'Expert Guidance',
    desc: 'Whether you know exactly what you want or are simply looking for fresh ideas, Mayuri Landmarks LLP is ready to offer you priceless expert consulting to make the right decisions for your dream project.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const titleSpans = useRef([]);
  const serviceRows = useRef([]);
  const cardRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  titleSpans.current = [];
  serviceRows.current = [];
  cardRefs.current = [];

  const addTitleSpan = (el) => el && !titleSpans.current.includes(el) && titleSpans.current.push(el);
  const addRow = (el) => el && !serviceRows.current.includes(el) && serviceRows.current.push(el);
  const addCard = (el) => el && !cardRefs.current.includes(el) && cardRefs.current.push(el);

  // Animate cards when activeIndex changes
  useEffect(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const cards = cardRefs.current;
    if (!cards.length) {
      isAnimating.current = false;
      return;
    }

    // Move each card to correct stacked position
    cards.forEach((card, i) => {
      const isActive = i === activeIndex;
      const stackOffset = i - activeIndex;
      // Cards below active: hidden under active
      // Cards above active: peeking from bottom-right
      const targetY = isActive ? 0 : stackOffset < 0 ? '120%' : `${stackOffset * 14}px`;
      const targetX = isActive ? 0 : stackOffset < 0 ? '-5%' : `${stackOffset * 8}px`;
      const targetScale = isActive ? 1 : 1 - Math.abs(stackOffset) * 0.03;
      const targetZ = cards.length - Math.abs(stackOffset);

      gsap.to(card, {
        y: targetY,
        x: targetX,
        scale: targetScale,
        zIndex: targetZ,
        filter: isActive ? 'brightness(1)' : `brightness(${0.6 - Math.abs(stackOffset) * 0.1})`,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => { isAnimating.current = false; }
      });
    });
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Title stagger reveal ─────────────────────────────────────────────────
      gsap.fromTo(titleSpans.current,
        { y: 120, rotateX: -25, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1.3, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      );

      // ── Service list rows clip-path reveal ──────────────────────────────────
      serviceRows.current.forEach((row) => {
        gsap.fromTo(row,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F5F0] text-black overflow-hidden">

      {/* ══════════════════════════════════════════════
          SECTION 1 — CINEMATIC HEADER
      ════════════════════════════════════════════════ */}
      <div className="w-full flex flex-col justify-end px-4 md:px-[6vw] pt-[10vh] pb-[10vh]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
          <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#6CAFBF] self-start md:self-end mb-2">
            What We Offer
          </p>

          <div ref={headlineRef} className="flex flex-col overflow-visible" style={{ perspective: '1000px' }}>
            {['Our', 'Services'].map((word, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <span
                  ref={addTitleSpan}
                  className="block font-[magtis] uppercase font-extrabold text-[13vw] md:text-[10vw] leading-[0.9] tracking-tighter"
                >
                  {word}
                </span>
              </div>
            ))}
          </div>

          <div ref={addTitleSpan} className="w-full md:w-[28%] self-end">
            <p className="text-base md:text-lg font-medium leading-relaxed text-black/70">
              We believe every space deserves precision and soul. Our services span the full lifecycle of your residential or commercial vision.
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/10 mt-[8vh]" />
      </div>


      {/* ══════════════════════════════════════════════
          SECTION 2 — FULL-SCREEN HOVER CARD STACK
      ════════════════════════════════════════════════ */}
      <div className="w-full h-screen relative overflow-hidden">

        {/* ── Card Stack ──────────────────────────────────────────────────── */}
        {services.map((service, index) => (
          <div
            key={index}
            ref={addCard}
            className="absolute inset-0 w-full h-full"
            style={{
              zIndex: services.length - index,
              transformOrigin: 'bottom center',
              willChange: 'transform, filter',
            }}
          >
            {/* Background Image — full bleed */}
            <img
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />

            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-[6vh] md:px-[6vw]">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <span className="text-white/40 font-[magtis] text-lg tracking-widest uppercase font-bold">
                  {service.number}
                </span>
                <span className="text-white/30 text-xs tracking-[0.2em] uppercase font-semibold hidden md:block">
                  Mayuri Landmarks LLP
                </span>
              </div>

              {/* Center Content */}
              <div className="flex flex-col gap-5 max-w-2xl">
                <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">
                  {service.subtitle}
                </span>
                <h2 className="text-white font-[magtis] uppercase font-extrabold text-[7vh] md:text-[9vh] leading-[0.9] tracking-tight">
                  {service.title}
                </h2>
                <div className="w-16 h-[2px] bg-[#6CAFBF]" />
                <p className="text-white/70 text-base md:text-xl leading-relaxed font-medium max-w-lg">
                  {service.desc}
                </p>
              </div>

              {/* Bottom Navigation Dots + Arrows */}
              <div className="flex items-center justify-between">
                {/* Dot navigation */}
                <div className="flex items-center gap-3">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`transition-all duration-500 rounded-full ${
                        i === activeIndex
                          ? 'w-8 h-2 bg-[#6CAFBF]'
                          : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#6CAFBF] hover:text-[#6CAFBF] transition-all duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveIndex(i => Math.min(services.length - 1, i + 1))}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#6CAFBF] hover:text-[#6CAFBF] transition-all duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ── Right-side vertical service tab list ────────────────────────── */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
          {services.map((service, index) => (
            <button
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`group flex items-center gap-3 text-right transition-all duration-500 ${
                activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-75'
              }`}
            >
              <div className={`transition-all duration-500 h-[2px] ${
                activeIndex === index ? 'w-8 bg-[#6CAFBF]' : 'w-3 bg-white group-hover:w-5 group-hover:bg-white'
              }`} />
              <span className="text-white font-[magtis] uppercase text-xs tracking-widest hidden md:block">
                {service.title}
              </span>
            </button>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          SECTION 3 — SERVICE LIST (Felix Nieto style)
      ════════════════════════════════════════════════ */}
      <div className="w-full px-4 md:px-[6vw] pt-[15vh] pb-[20vh]">
        <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#6CAFBF] mb-[6vh]">
          All Services
        </p>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <div
              key={index}
              ref={addRow}
              onMouseEnter={() => setActiveIndex(index)}
              className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 border-t border-black/10 py-8 md:py-12 group cursor-pointer"
            >
              <div className="flex items-baseline gap-4 md:gap-8 flex-1">
                <span className="text-black/30 font-[magtis] text-sm md:text-base font-bold tracking-widest group-hover:text-[#6CAFBF] transition-colors duration-500">
                  {service.number}
                </span>
                <h3 className="font-[magtis] uppercase font-extrabold text-[4vh] md:text-[5.5vh] leading-[1] tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                  {service.title}
                </h3>
              </div>

              <span className="self-start md:self-auto text-xs tracking-[0.2em] uppercase font-semibold text-black/40 border border-black/15 px-4 py-2 rounded-full group-hover:border-[#6CAFBF] group-hover:text-[#6CAFBF] transition-all duration-500">
                {service.subtitle}
              </span>

              <p className="text-black/60 text-sm md:text-base leading-relaxed w-full md:w-[35%] font-medium">
                {service.desc.slice(0, 85)}…
              </p>

              <div className="self-start md:self-auto text-black/25 group-hover:text-[#6CAFBF] group-hover:translate-x-2 transition-all duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="-rotate-45">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
          <div className="w-full h-[1px] bg-black/10" />
        </div>
      </div>

    </section>
  );
};

export default Services;
