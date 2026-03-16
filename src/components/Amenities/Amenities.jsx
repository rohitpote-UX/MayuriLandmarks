import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    id: 1,
    name: 'Garden',
    desc: 'Lush landscaped gardens for peaceful evening walks and morning serenity.',
    img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M12 12C12 12 8 9 5 6c4 0 7 3 7 6z"/><path d="M12 12c0 0 4-3 7-6-4 0-7 3-7 6z"/><path d="M5 22h14"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Walking Track',
    desc: 'Dedicated jogging and walking tracks designed for a healthy active lifestyle.',
    img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2"/><path d="M7 8l5 3 5-3M9 15l-2 6m8-6 2 6M8 10l-1 5m10-5 1 5"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Generator Backup',
    desc: 'Uninterrupted 24/7 power supply backed by high-capacity diesel generators.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'CCTV System',
    desc: 'State-of-the-art surveillance across all common areas for complete peace of mind.',
    img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Two Lifts & Staircases',
    desc: 'Spacious high-speed lifts and wide fire-rated staircases for safe daily movement.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8l3-3 3 3M9 16l3 3 3-3"/>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Solar Energy System',
    desc: 'Eco-conscious solar panels for common area lighting — reducing carbon footprint.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    id: 7,
    name: 'Play Area',
    desc: 'Safe, vibrant children\'s play zones with premium equipment for active young minds.',
    img: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21l4-8 4 8M12 13V3M5 8l7-5 7 5"/>
      </svg>
    ),
  },
  {
    id: 8,
    name: 'Security Cabin',
    desc: 'Round-the-clock security personnel stationed at all entry and exit points.',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const proximity = [
  {
    category: 'Kids Education',
    emoji: '🏫',
    items: [
      { name: 'Euro School', time: '4 Min' },
      { name: 'Dhruv Global School', time: '5 Min' },
      { name: 'Bishop School', time: '5 Min' },
    ],
  },
  {
    category: 'Leisure & Daily Needs',
    emoji: '🏬',
    items: [
      { name: 'Reliance Mart & Tata Star Bazar', time: '4 Min' },
      { name: 'Dmart / Dorabjee Paradise Mall', time: '10 Min' },
    ],
  },
  {
    category: 'Travel & Transport',
    emoji: '🚌',
    items: [
      { name: 'Bus Stand', time: '2 Min' },
      { name: 'Railway Station', time: '30 Min' },
      { name: 'Airport', time: '40 Min' },
    ],
  },
  {
    category: 'Medical Emergency',
    emoji: '🏥',
    items: [
      { name: 'Nixi Hospital', time: '5 Min' },
      { name: 'Multi Speciality Hospital', time: '8 Min' },
      { name: 'Ruby Hall Clinic Wanowarie', time: '15 Min' },
    ],
  },
  {
    category: 'Business Centers',
    emoji: '🏢',
    items: [
      { name: 'Magarpatta City', time: '25 Min' },
      { name: 'SP Infocity', time: '25 Min' },
      { name: 'MG Road', time: '25 Min' },
    ],
  },
];

const Amenities = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const titleLines = useRef([]);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const proxRefs = useRef([]);
  const bgImgRef = useRef(null);

  const [hoveredId, setHoveredId] = useState(null);

  titleLines.current = [];
  cardRefs.current = [];
  proxRefs.current = [];

  const addTitle = (el) => el && !titleLines.current.includes(el) && titleLines.current.push(el);
  const addCard = (el) => el && !cardRefs.current.includes(el) && cardRefs.current.push(el);
  const addProx = (el) => el && !proxRefs.current.includes(el) && proxRefs.current.push(el);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Headline stagger reveal
      gsap.fromTo(titleLines.current,
        { y: 140, rotateX: -35, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1.5, stagger: 0.08, ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      );

      // Cards stagger entrance
      gsap.fromTo(cardRefs.current,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.1, stagger: 0.07, ease: 'power4.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' }
        }
      );

      // Proximity cards stagger
      gsap.fromTo(proxRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.0, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: proxRefs.current[0], start: 'top 85%' }
        }
      );

      // BG parallax
      gsap.fromTo(bgImgRef.current,
        { y: -60 },
        {
          y: 60, ease: 'none',
          scrollTrigger: {
            trigger: bgImgRef.current?.parentElement,
            start: 'top bottom', end: 'bottom top', scrub: 1.5
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F5F0] text-black overflow-hidden">

      {/* ══ HEADER ══ */}
      <div className="px-4 md:px-[6vw] pt-[16vh] pb-[8vh]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div ref={headlineRef} style={{ perspective: '1200px' }}>
            <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-5">
              Live Better · Every Day
            </p>
            {['World-Class', 'Amenities'].map((word, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <span
                  ref={addTitle}
                  className="block font-[magtis] uppercase font-extrabold tracking-tighter leading-[0.88]"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 10rem)',
                    color: i === 1 ? '#6CAFBF' : 'black'
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>

          <div ref={addTitle} className="w-full md:w-[30%] self-end">
            <p className="text-black/55 text-base md:text-lg font-medium leading-relaxed">
              Every amenity at Mayuri Landmarks is thoughtfully designed to elevate the quality of your everyday life — from morning to midnight.
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/10 mt-[8vh]" />
      </div>


      {/* ══ AMENITIES GRID ══ */}
      <div ref={gridRef} className="px-4 md:px-[6vw] pb-[15vh]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              ref={addCard}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
              style={{ height: index % 3 === 0 ? '42vh' : '34vh' }}
              onMouseEnter={() => setHoveredId(amenity.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* BG Image */}
              <img
                src={amenity.img}
                alt={amenity.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
              />
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              {/* Cyan hover tint */}
              <div className={`absolute inset-0 bg-[#6CAFBF]/15 transition-opacity duration-500 ${hoveredId === amenity.id ? 'opacity-100' : 'opacity-0'}`} />

              {/* Icon badge */}
              <div className={`absolute top-4 left-4 md:top-5 md:left-5 w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-500 ${hoveredId === amenity.id ? 'bg-[#6CAFBF] border-[#6CAFBF] text-black' : 'bg-white/10 border-white/25 text-white backdrop-blur-sm'}`}>
                {amenity.icon}
              </div>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex flex-col gap-1.5">
                <h3
                  className={`font-[magtis] uppercase font-extrabold leading-tight transition-colors duration-400 ${hoveredId === amenity.id ? 'text-[#6CAFBF]' : 'text-white'}`}
                  style={{ fontSize: 'clamp(0.9rem, 2vw, 1.5rem)' }}
                >
                  {amenity.name}
                </h3>
                <p className={`text-white/70 text-xs md:text-sm font-medium leading-relaxed transition-all duration-500 overflow-hidden ${hoveredId === amenity.id ? 'opacity-100 max-h-16' : 'opacity-0 max-h-0'}`}>
                  {amenity.desc}
                </p>
                <div className={`h-[2px] bg-[#6CAFBF] transition-all duration-700 ease-out ${hoveredId === amenity.id ? 'w-10 md:w-14' : 'w-0'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ══ PROXIMITY — Parallax dark section ══ */}
      <div className="relative w-full overflow-hidden min-h-[80vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={bgImgRef}
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
            alt="Mayuri Landmarks backdrop"
            className="absolute inset-0 w-full h-[120%] object-cover top-[-10%]"
          />
          <div className="absolute inset-0 bg-black/78" />
        </div>

        <div className="relative z-10 px-4 md:px-[6vw] py-[12vh]">
          <div className="mb-[8vh] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-3">Connectivity</p>
              <h2
                className="font-[magtis] uppercase font-extrabold text-white tracking-tight leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
              >
                Everything<br />
                <span className="text-[#6CAFBF]">Nearby.</span>
              </h2>
            </div>
            <p className="text-white/40 text-sm md:text-base font-medium max-w-sm leading-relaxed">
              Strategically located to connect you to every essential — schools, hospitals, malls, and corporate parks — all within minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {proximity.map((cat, i) => (
              <div
                key={i}
                ref={addProx}
                className="group bg-white/[0.05] hover:bg-white/[0.10] backdrop-blur-sm border border-white/10 hover:border-[#6CAFBF]/40 rounded-sm p-6 md:p-8 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h3 className="text-white font-bold text-base md:text-lg tracking-wide group-hover:text-[#6CAFBF] transition-colors duration-400">
                    {cat.category}
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex items-center justify-between gap-3 border-b border-white/8 pb-3 last:border-0 last:pb-0">
                      <span className="text-white/55 text-sm font-medium flex-1 leading-snug">{item.name}</span>
                      <span className="shrink-0 bg-[#6CAFBF] text-black text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══ STATS BAR ══ */}
      <div className="px-4 md:px-[6vw] py-[8vh]">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-black/10 rounded-sm overflow-hidden divide-x divide-black/10">
          {[
            { value: '8+', label: 'Premium Amenities' },
            { value: '24/7', label: 'Security & Backup' },
            { value: '2 Min', label: 'From Bus Stand' },
            { value: 'A+', label: 'Green Rating' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 p-6 md:p-10 group hover:bg-black transition-colors duration-500 cursor-default">
              <span className="font-[magtis] text-[4vh] md:text-[5vh] font-extrabold leading-none tracking-tight group-hover:text-[#6CAFBF] transition-colors duration-500">
                {stat.value}
              </span>
              <span className="text-black/40 text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-white/50 transition-colors duration-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Amenities;