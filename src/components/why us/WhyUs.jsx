import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Building2, Ruler, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const containerRef = useRef(null); // Ref for changing background color
  const headlineRefs = useRef([]);
  const paragraphRef = useRef(null);
  const imgRefs = useRef([]);
  const listRefs = useRef([]);

  // New Philosophy & Services Refs
  const newSectionRef = useRef(null);
  const newTextRefs = useRef([]);
  const serviceCardRefs = useRef([]);
  const newVideoRef = useRef(null);

  // Hover interactive state for Awwwards cursor effect
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [accordionHover, setAccordionHover] = useState(null); // Separate state for horizontal accordion
  const cursorImageRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });

  // Track mouse coordinates for GSAP quickSetter
  const setX = useRef(null);
  const setY = useRef(null);

  // The raw data requested by the user
  const servicesList = [
    'CONSTRUCTION SERVICES',
    'DESIGN-BUILD SERVICES',
    'ARCHITECTURAL SERVICES',
    'GENERAL CONTRACTING',
    'EXCELLENT AMENITIES'
  ];

  // The 3 specific slider images requested
  const heroImages = [
    "https://www.mayurilandmarks.com/images/sliders/Web2.jpg",
    "https://www.mayurilandmarks.com/images/sliders/Web1.jpg",
    "https://www.mayurilandmarks.com/images/sliders/Web3.jpg"
  ];

  // Fallback/Placeholder architectural images for the hover effects from Unsplash
  const hoverImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  ];

  // Clear ref arrays on re-render
  headlineRefs.current = [];
  imgRefs.current = [];
  listRefs.current = [];
  newTextRefs.current = [];
  serviceCardRefs.current = [];

  // Helper to add refs safely
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // 1. Initialize Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline text stagger reveal
      gsap.fromTo(headlineRefs.current,
        { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Images staggered scroll slightly upwards (Parallax)
      imgRefs.current.forEach((img, index) => {
        gsap.fromTo(img,
          { y: 100, opacity: 0, scale: 1.1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
              end: 'bottom top',
              scrub: 1, // Tie it to the scrollbar for parallax effect
            }
          }
        );
      });

      // List items stagger reveal
      gsap.fromTo(listRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRefs.current[0],
            start: 'top 80%',
          }
        }
      );

      // -----------------------------------------------------
      // New Philosophy text reveal (Awwwards Line Stagger)
      gsap.fromTo(newTextRefs.current,
        { y: 150, rotateX: -20, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: newSectionRef.current, start: "top 65%" }
        }
      );

      // New Video Parallax
      gsap.fromTo(newVideoRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: newSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Service Cards Horizontal Accordion Reveal (Awwwards 3D Flip Stagger)
      if (serviceCardRefs.current && serviceCardRefs.current.length > 0) {
        gsap.fromTo(serviceCardRefs.current,
          { y: 120, opacity: 0, scale: 0.95, rotateX: 15 },
          {
            y: 0, opacity: 1, scale: 1, rotateX: 0, 
            duration: 1.4, stagger: 0.15, ease: "power4.out",
            scrollTrigger: { trigger: serviceCardRefs.current[0], start: "top 85%" }
          }
        );
      }
      // -----------------------------------------------------

      // Initialize performant GSAP quick setters for the cursor image
      setX.current = gsap.quickTo(cursorImageRef.current, "x", { duration: 0.8, ease: "power3" });
      setY.current = gsap.quickTo(cursorImageRef.current, "y", { duration: 0.8, ease: "power3" });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Handle Mouse Follow Effect (Awwwards Style)
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const imageWidth = window.innerWidth < 768 ? 200 : 400; // responsive image size
    const imageHeight = window.innerWidth < 768 ? 250 : 500;

    cursorRef.current = {
      x: relX - (imageWidth / 2),
      y: relY - (imageHeight / 2)
    };

    if (setX.current && setY.current) {
      setX.current(cursorRef.current.x);
      setY.current(cursorRef.current.y);

      // Add a subtle rotation based on mouse movement speed (tilt effect)
      const speedX = e.movementX || 0;
      gsap.to(cursorImageRef.current, {
        rotation: speedX * 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  };

  // 3. Handle Hover State changes (Background color shift)
  useEffect(() => {
    if (hoveredIndex !== null) {
      // Animate Background to Cyan
      gsap.to(containerRef.current, {
        backgroundColor: '#6CAFBF',
        duration: 0.5,
        ease: 'power2.out'
      });
      // Show custom cursor image safely
      gsap.to(cursorImageRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      // Revert background to light cream or dark mode
      const targetColor = document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#F5F5F0';
      gsap.to(containerRef.current, {
        backgroundColor: targetColor,
        duration: 0.5,
        ease: 'power2.out'
      });
      // Hide custom cursor image safely, using autoAlpha to kill shadows
      gsap.to(cursorImageRef.current, {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
    }
  }, [hoveredIndex]);


  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden text-black dark:text-white pt-[15vh] pb-[10vh] transition-colors duration-1000"
    >
      {/* 
                We use a separate absolute container layer for the background color shift 
                so it doesn't trigger layout recalculations.
            */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#F5F5F0] dark:bg-[#0f0f0f] transition-colors duration-1000 -z-20 pointer-events-none" />

      <div className="px-4 md:px-[6vw]">
        {/* 1. Top Area: Headline & Text */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-16 xl:gap-0 mt-[5vh]">
          {/* Left Side: Massive Headline */}
          <div className="w-full xl:w-[65%] flex flex-col gap-2 font-[magtis] uppercase text-[5vh] md:text-[8vh] lg:text-[10vh] leading-[1] font-extrabold tracking-tight transition-colors duration-500" style={{ color: hoveredIndex !== null ? 'white' : 'black' }}>
            <div className="overflow-hidden">
              <div ref={el => addToRefs(el, headlineRefs)}>We don't build <span className={`transition-colors duration-500 ${hoveredIndex !== null ? 'text-white' : 'text-[#6CAFBF]'}`}>BUILDINGS.</span></div>
            </div>
            <div className="overflow-hidden">
              <div ref={el => addToRefs(el, headlineRefs)}>We craft <span className="italic font-normal">LIFESTYLES</span></div>
            </div>
            <div className="overflow-hidden">
              <div ref={el => addToRefs(el, headlineRefs)}>FOR OUR <span className={`transition-colors duration-500 ${hoveredIndex !== null ? 'text-white' : 'text-[#6CAFBF]'}`}>CUSTOMERS.</span></div>
            </div>
          </div>

          {/* Right Side: Description */}
          <div className="w-full xl:w-[30%] flex flex-col font-sans transition-colors duration-500" style={{ color: hoveredIndex !== null ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)' }}>
            <div ref={paragraphRef} className="text-lg md:text-xl font-medium leading-relaxed">
              We are <span className="font-bold">Mayuri Landmarks LLP</span>, born with a purpose to build projects that breathe life into the dreams of our customers. With a fine balance of entrepreneurial expertise and vision, combined with a commitment to excellence, we have been recognized as one of the most trusted developers in Pune.
            </div>
          </div>
        </div>

        {/* 2. Middle Area: Staggered Masonry-style Images */}
        <div className="w-full mt-[15vh] mb-[15vh] flex flex-col md:flex-row gap-8 md:gap-4 items-center md:items-start justify-between relative z-10 pointer-events-none">
          {/* Image 1: Offset slightly down */}
          <div className="w-full md:w-[30%] h-[40vh] md:h-[60vh] mt-0 md:mt-[10vh] overflow-hidden rounded-sm">
            <img ref={el => addToRefs(el, imgRefs)} src={heroImages[0]} alt="Architecture 1" className="w-full h-full object-cover origin-center" />
          </div>
          {/* Image 2: Positioned higher */}
          <div className="w-full md:w-[35%] h-[50vh] md:h-[70vh] overflow-hidden rounded-sm">
            <img ref={el => addToRefs(el, imgRefs)} src={heroImages[1]} alt="Architecture 2" className="w-full h-full object-cover origin-center" />
          </div>
          {/* Image 3: Smallest detail shot, offset down */}
          <div className="w-full md:w-[25%] h-[30vh] md:h-[45vh] mt-0 md:mt-[20vh] overflow-hidden rounded-sm">
            <img ref={el => addToRefs(el, imgRefs)} src={heroImages[2]} alt="Architecture 3" className="w-full h-full object-cover origin-center" />
          </div>
        </div>

        {/* Separation Line */}
        <div className={`w-full h-[1px] my-[10vh] transition-colors duration-500 ${hoveredIndex !== null ? 'bg-white/20' : 'bg-black/10'}`}></div>

        {/* 3. NEW: Philosophy and Detailed Services */}
        <div ref={newSectionRef} className="w-full flex flex-col mb-[15vh] relative z-20">

          {/* ---------------------------------------------------- */}
          {/* Philosophy Section - Rule of Thirds Layout */}
          {/* ---------------------------------------------------- */}
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-stretch mb-[15vh] px-0 md:px-8">

            {/* Left Side: 60% Text Content Area */}
            <div className="w-full md:w-[60%] flex flex-col justify-center pr-0 md:pr-12">
              <h2 ref={el => addToRefs(el, newTextRefs)} className="text-[4vh] md:text-[6.5vh] font-[magtis] uppercase leading-[1.1] mb-10 tracking-tight text-black flex flex-col gap-2">
                <span className="block overflow-hidden"><span className="block">Mayuri Landmarks LLP</span></span>
                <span className="block overflow-hidden"><span className="block text-[#6CAFBF]">born with a purpose</span></span>
                <span className="block overflow-hidden"><span className="block">to build projects that</span></span>
                <span className="block overflow-hidden"><span className="block italic font-normal">breathe life</span></span>
                <span className="block overflow-hidden"><span className="block">into the dreams of</span></span>
                <span className="block overflow-hidden"><span className="block">their customers.</span></span>
              </h2>

              <div className="w-full md:w-4/5 flex flex-col gap-6">
                <p ref={el => addToRefs(el, newTextRefs)} className="text-black/80 text-lg md:text-2xl font-medium leading-relaxed">
                  With a fine balance of entrepreneurial expertise and vision combined with their commitment to excellence the company has been recognized as one of the most trusted developers of the city which stands as the soul of the company.
                </p>
                <div className="w-16 h-[2px] bg-[#6CAFBF] my-2" ref={el => addToRefs(el, newTextRefs)} />
                <p ref={el => addToRefs(el, newTextRefs)} className="text-[#6CAFBF] text-lg md:text-2xl font-bold leading-relaxed">
                  We at Mayuri Landmarks LLP believe in developing and constructing aesthetically designed, functionally efficient residential and commercial complexes offering "more value for money".
                </p>
              </div>
            </div>

            {/* Right Side: 40% Video Context Area */}
            <div className="w-full md:w-[40%] h-[50vh] md:h-auto min-h-[70vh] rounded-sm overflow-hidden relative shadow-2xl shadow-black/10 mt-10 md:mt-0">
              <div ref={newVideoRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <video
                  src="https://felixnieto.b-cdn.net/projects/kensho_loop_30fps.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Subtle dark overlay for premium feel */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* ---------------------------------------------------- */}
          {/* NEW: Futuristic Horizontal Service Accordion */}
          {/* ---------------------------------------------------- */}
          <div className="w-full flex flex-col md:flex-row h-[65vh] md:h-[70vh] gap-2 md:gap-4 mt-[5vh]">
            {[
              {
                title: "Construction Services",
                icon: HardHat,
                desc: "In Construction management service we deploy specialized project management techniques to oversee the planning, design, and construction of a project, from its beginning to its end.",
                img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
              },
              {
                title: "Design-Build Services",
                icon: Building2,
                desc: "Design-Build saves both money and time. In addition, the close collaboration between the design and construction teams fosters innovation that benefits not only clients but also the communities that the projects serve.",
                img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: "Architectural Services",
                icon: Ruler,
                desc: "Architectural services include design, preparation of construction documents, construction administration, feasibility studies, architectural programming and project management.",
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: "General Contracting",
                icon: Briefcase,
                desc: "The general contractor is the primary point of responsibility for controlling construction costs and meeting the project schedule. The general contractor hires subcontractors to perform specific portions of the project and oversees all work.",
                img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
              }
            ].map((service, index) => {
              const Icon = service.icon;
              // Separate states for Desktop layout vs Mobile Stacked layout
              const isActiveLocal = accordionHover === null ? index === 0 : accordionHover === index;

              return (
                <div
                  key={index}
                  ref={el => addToRefs(el, serviceCardRefs)}
                  className={`
                    relative rounded-md overflow-hidden cursor-pointer group flex
                    transition-[flex,width,height] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${isActiveLocal
                      ? 'flex-[4] md:flex-[5] h-full shadow-2xl saturate-100'
                      : 'flex-[1] md:flex-[1] h-full saturate-0 hover:saturate-50'
                    }
                  `}
                  onMouseEnter={() => setAccordionHover(index)}
                  onMouseLeave={() => setAccordionHover(null)}
                >
                  {/* Background Image Panel */}
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isActiveLocal ? 'scale-100' : 'scale-110'}`}
                  />
                  {/* Gradient Overlay for Text Readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 ${isActiveLocal ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`} />

                  {/* Top Icon Block (Always Visible) */}
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/20 flex items-center justify-center z-20">
                    <Icon className="text-white w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>

                  {/* Content Layout (Reacts to Expansion) */}
                  <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 md:p-8">

                    {/* Collapsed State Title (Vertical rotated text on Desktop, Horizontal on Mobile) */}
                    <div className={`
                      transition-opacity duration-500 delay-100 absolute bottom-6 md:bottom-12 left-0 right-0
                      ${isActiveLocal ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}>
                      <h3 className="text-white font-[magtis] uppercase text-sm md:text-xl font-bold tracking-widest leading-none px-4 md:px-0 md:-rotate-90 md:origin-left md:translate-x-12 md:-translate-y-8 whitespace-nowrap overflow-hidden text-ellipsis">
                        {service.title}
                      </h3>
                    </div>

                    {/* Expanded State Content Area */}
                    <div className={`
                      flex flex-col gap-2 md:gap-4 overflow-hidden 
                      transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                      ${isActiveLocal ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-0'}
                    `}>
                      <h3 className="text-[3vh] md:text-[5vh] text-white font-[magtis] uppercase font-extrabold leading-[1] md:leading-tight line-clamp-2 md:line-clamp-none">
                        {service.title}
                      </h3>

                      {/* Animated Line underneath title */}
                      <div className="w-12 md:w-24 h-[1px] md:h-[2px] bg-[#6CAFBF]" />

                      <p className="text-white/80 font-medium text-xs md:text-base lg:text-lg leading-relaxed md:w-5/6 line-clamp-3 md:line-clamp-none">
                        {service.desc}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Another Separation Line before the Awwwards typography menu */}
        <div className={`w-full h-[1px] my-[10vh] transition-colors duration-500 ${hoveredIndex !== null ? 'bg-white/20' : 'bg-black/10'}`}></div>

        {/* 4. Bottom Area: Awwwards Big Typography Interactive List */}
        <div 
          className="w-full flex flex-col mb-[10vh] relative z-20"
          onMouseMove={handleMouseMove}
        >
          <p className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-[5vh] transition-colors duration-500 ${hoveredIndex !== null ? 'text-white' : 'text-[#6CAFBF]'}`}>
            Our Expertise
          </p>

          <div className="flex flex-col group/list">
            {servicesList.map((service, index) => (
              <div
                key={index}
                ref={el => addToRefs(el, listRefs)}
                className={`
                                    w-full flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 
                                    border-b border-black/10 py-6 md:py-8 cursor-pointer
                                    transition-all duration-500 
                                    ${hoveredIndex !== null ? 'border-white/20 text-white' : 'text-black hover:text-[#6CAFBF]'}
                                    ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}
                                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`text-sm md:text-lg font-bold tracking-widest pointer-events-none transition-transform duration-500 ${hoveredIndex === index ? 'translate-x-4' : ''}`}>
                  0{index + 1}
                </span>
                <h3 className={`text-[4vh] md:text-[8vh] font-[magtis] uppercase font-extrabold leading-[1] pointer-events-none transition-transform duration-500 ${hoveredIndex === index ? 'translate-x-4 md:translate-x-8' : ''}`}>
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Hover Cursor Image (Absolute to section) */}
      <div
        ref={cursorImageRef}
        className="absolute top-0 left-0 w-[200px] h-[250px] md:w-[400px] md:h-[500px] pointer-events-none z-0 rounded-sm overflow-hidden shadow-2xl scale-75 opacity-0"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform, opacity' // Hardware acceleration hint
        }}
      >
        {/* Dynamically render the image based on which index is hovered */}
        <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
          {hoverImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Service ${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
        {/* Dark overlay to make the image feel more cinematic/premium */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

    </section>
  );
};

export default WhyUs;
