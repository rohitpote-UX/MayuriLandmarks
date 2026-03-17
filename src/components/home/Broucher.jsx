import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Broucher = () => {
    const sectionRef = useRef(null);
    const rowRefs = useRef([]);
    const titleRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);
    
    // Clear refs on re-render
    rowRefs.current = [];
    const addToRefs = (el) => {
        if (el && !rowRefs.current.includes(el)) {
            rowRefs.current.push(el);
        }
    };

    const docs = [
        { title: "MAHA RERA NUMBER : P52100049330", link: "#" },
        { title: "ADHINATHPURAM BROCHURE", link: "#" },
        { title: "ENVIRONMENT CLEARANCE CERTIFICATE", link: "#" },
        { title: "ENVIRONMENT COMPLIANCE CERTIFICATE", link: "#" }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Sidebar Title Animation
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Cinematic Cinematic Image Reveal (Clip Path + Scale Down)
            gsap.fromTo(imageContainerRef.current,
                { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, // Hidden initially
                {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 1.5,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
            
            // Subtle image scale specifically for the wipe effect
            gsap.fromTo(imageRef.current,
                { scale: 1.4 },
                {
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Stagger Rows Entrance (Cinematic reveal)
            gsap.fromTo(rowRefs.current,
                { y: 80, opacity: 0, rotateX: -10 },
                {
                    y: 0, opacity: 1, rotateX: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white text-black py-[10vh] px-4 md:px-[6vw] overflow-visible">
            {/* Rule of Thirds Layout (1/3 Left Sidebar, 2/3 Right Content) */}
            <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start relative">
                
                {/* Left Side: 1/3 Sticky Section - Title & Premium Context Image */}
                <div className="w-full md:w-1/3 flex flex-col justify-between h-auto md:h-[60vh] md:sticky md:top-32 pr-0 md:pr-10">
                    <h2 ref={titleRef} className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#6CAFBF] mb-12 md:mb-0">
                        Official Docs
                    </h2>

                    {/* Architectural Context Image */}
                    <div ref={imageContainerRef} className="hidden md:block w-full h-[40vh] overflow-hidden rounded-sm relative mt-auto">
                        {/* Subtle dark overlay for premium feel */}
                        <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
                        <img 
                            ref={imageRef}
                            src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=800&auto=format&fit=crop" 
                            alt="Modern Architecture Documents Context" 
                            className="w-full h-full object-cover origin-center grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>

                {/* Right Side: 2/3 Interactive Rows Grid */}
                <div className="w-full md:w-2/3 flex flex-col mt-0 border-t border-black/20 relative z-10 bg-white">
                    {docs.map((doc, index) => (
                        <a 
                            key={index}
                            ref={addToRefs}
                            href={doc.link}
                            className="group relative w-full border-b border-black/20 py-8 md:py-14 px-2 md:px-10 overflow-hidden flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 xl:gap-0 cursor-pointer block"
                        >
                            {/* Hover Background - Clip Path Reveal sweeps from bottom to top */}
                            <div className="absolute inset-0 bg-[#6CAFBF] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                            
                            {/* Text Content */}
                            <div className="relative z-10 w-full xl:w-3/4">
                                <h3 className="text-[3.5vh] md:text-[5vh] leading-tight font-[magtis] uppercase font-extrabold text-black group-hover:text-white transition-colors duration-500">
                                    {doc.title}
                                </h3>
                            </div>

                            {/* Download Button Component (Magnetic feeling hover) */}
                            <div className="relative z-10 flex items-center gap-6 mt-4 xl:mt-0">
                                <div className="overflow-hidden hidden sm:block">
                                    <span className="block text-xs md:text-sm font-bold tracking-[0.2em] text-[#6CAFBF] group-hover:text-white transition-colors duration-500 xl:translate-y-full xl:group-hover:translate-y-0 transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]">
                                        DOWNLOAD
                                    </span>
                                </div>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black/10 group-hover:border-transparent bg-transparent group-hover:bg-white flex items-center justify-center overflow-hidden relative transition-colors duration-500 shrink-0 shadow-sm group-hover:shadow-xl">
                                    {/* Icon original state */}
                                    <Download size={20} strokeWidth={2} className="absolute text-[#6CAFBF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[150%]" />
                                    {/* Icon hover state */}
                                    <Download size={20} strokeWidth={2} className="absolute text-[#6CAFBF] -translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Broucher;
