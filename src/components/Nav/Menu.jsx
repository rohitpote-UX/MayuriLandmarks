import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

const Menu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);
    const bgFirstRef = useRef(null);
    const bgSecondRef = useRef(null);
    const linksRef = useRef([]);
    const subtextRef = useRef([]);
    const imageRef = useRef(null);

    // Menu Data specifically for real estate
    const menuItems = [
        { title: 'Home', num: '01', href: 'section-home' },
        { title: 'Why us?', num: '02', href: 'section-why-us' },
        { title: 'Services', num: '03', href: 'section-services' },
        { title: 'Projects', num: '04', href: 'section-projects' },
        { title: 'Amenities', num: '05', href: 'section-amenities' },
        { title: 'Testimonials', num: '06', href: 'section-testimonials' },
        { title: 'Contact', num: '07', href: 'section-contact' },
    ];

    const handleNavClick = (href) => {
        onClose();
        setTimeout(() => {
            const el = document.getElementById(href);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 700); // wait for menu close animation
    };

    useEffect(() => {
        if (isOpen) {
            // Entrance Animation
            document.body.style.overflow = 'hidden'; // Lock scrolling

            const tl = gsap.timeline();

            // 1. Reset states (in case of double clicks and quick toggles)
            gsap.set(menuRef.current, { visibility: 'visible' });
            gsap.set([bgFirstRef.current, bgSecondRef.current], { y: '-100%' });
            gsap.set(linksRef.current, { y: 150, rotate: 10, opacity: 0 });
            gsap.set(subtextRef.current, { opacity: 0, y: 20 });
            gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });

            // 2. Play Entrance
            tl.to(bgFirstRef.current, {
                y: '0%',
                duration: 0.8,
                ease: 'power4.inOut'
            })
                .to(bgSecondRef.current, {
                    y: '0%',
                    duration: 0.8,
                    ease: 'power4.inOut'
                }, '-=0.6') // Overlap exactly like felix-nieto
                .to(linksRef.current, {
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power4.out'
                }, '-=0.4')
                .to(imageRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out'
                }, '-=0.8')
                .to(subtextRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out'
                }, '-=1');

        } else {
            // Exit Animation (Reverse)
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(menuRef.current, { visibility: 'hidden' });
                    document.body.style.overflow = 'auto'; // Unlock scrolling
                }
            });

            tl.to(linksRef.current, {
                y: -100, // Slide up to exit
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.in'
            })
                .to(subtextRef.current, {
                    opacity: 0,
                    duration: 0.3
                }, 0)
                .to(imageRef.current, {
                    opacity: 0,
                    duration: 0.4
                }, 0)
                .to(bgSecondRef.current, {
                    y: '100%', // Slide down and out
                    duration: 0.6,
                    ease: 'power4.inOut'
                }, 0.2)
                .to(bgFirstRef.current, {
                    y: '100%',
                    duration: 0.6,
                    ease: 'power4.inOut'
                }, 0.3);
        }
    }, [isOpen]);

    return (
        <div ref={menuRef} className="fixed inset-0 z-50 invisible">
            {/* Split Screen Background Layers for Double Sweep Effect */}
            <div ref={bgFirstRef} className="absolute inset-0 bg-[#6CAFBF] origin-bottom w-full h-full z-0" />
            <div ref={bgSecondRef} className="absolute inset-0 bg-[#F5F5F0] dark:bg-[#0f0f0f] transition-colors duration-1000 origin-bottom w-full h-full z-10" />

            {/* Menu Content Wrapper */}
            <div className="relative z-20 w-full h-full flex flex-col justify-between px-4 md:px-10 py-6 md:py-12 overflow-y-auto overflow-x-hidden">

                {/* Header Context (Close Button) */}
                <div className="flex justify-between items-center text-black dark:text-white transition-colors duration-1000">
                    <img src="https://www.mayurilandmarks.com/assets/images/logo/logo.png" alt="Mayuri" className="w-24 md:w-34 ml-0 md:ml-[2vw] dark:invert transition-all duration-1000" />

                    <button
                        onClick={onClose}
                        className="group flex items-center gap-2 md:gap-3 cursor-pointer mr-0 md:mr-6 p-2 overflow-hidden hover:scale-[1.05] transition-transform duration-300"
                    >
                        <span className="uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] text-black dark:text-white transition-colors duration-500 group-hover:text-[#6CAFBF]">
                            Close
                        </span>
                        <X size={24} className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-white group-hover:text-[#6CAFBF] transition-colors duration-300" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Main Content Split: Links / Dynamic Image block */}
                <div className="flex flex-col md:flex-row w-full h-full mt-10 md:mt-16 px-4 md:px-[4vw]">

                    {/* Left side: Navigation Links */}
                    <div className="w-full md:w-2/3 h-full flex flex-col justify-center gap-4 md:gap-[2vh]">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleNavClick(item.href)}
                                className="cursor-pointer group flex items-baseline gap-4 md:gap-6 w-fit"
                            >
                                <span
                                    ref={el => subtextRef.current[index] = el}
                                    className="text-xs md:text-sm font-bold text-[#6CAFBF] pb-4 md:pb-8 tracking-widest pointer-events-none"
                                >
                                    {item.num}
                                </span>
                                {/* We rotate the parent block initially for a beautiful staggered arc reveal */}
                                <div
                                    ref={el => linksRef.current[index] = el}
                                    className="origin-bottom-left overflow-hidden pb-1 md:pb-4"
                                >
                                    <h1 className="relative text-[6vh] md:text-[10vh] font-[magtis] uppercase leading-[5.5vh] md:leading-[9vh] text-black dark:text-white transition-colors duration-1000 font-extrabold flex">
                                        {/* Original Text Layer (Slides UP and Out) */}
                                        <span className="flex overflow-hidden">
                                            {item.title.split('').map((char, charIndex) => (
                                                <span 
                                                    key={charIndex}
                                                    className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                                                    style={{ 
                                                        transitionDelay: `${charIndex * 0.03}s` 
                                                    }}
                                                >
                                                    {char === ' ' ? '\u00A0' : char}
                                                </span>
                                            ))}
                                        </span>
                                        {/* Hover Duplicate Text Layer (Slides UP and In from Below) */}
                                        <span className="absolute left-0 top-0 flex overflow-hidden text-[#6CAFBF]">
                                            {item.title.split('').map((char, charIndex) => (
                                                <span 
                                                    key={`hover-${charIndex}`}
                                                    className="inline-block translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                                                    style={{ 
                                                        transitionDelay: `${charIndex * 0.03}s` 
                                                    }}
                                                >
                                                    {char === ' ' ? '\u00A0' : char}
                                                </span>
                                            ))}
                                        </span>
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right side: Real Estate Context Image (Hidden on very small screens, visible on md+) */}
                    <div className="hidden md:flex w-1/3 h-full flex-col justify-center items-center pb-[10vh]">
                        <div className="w-full h-[60vh] overflow-hidden rounded-sm relative">
                            {/* Adding a subtle overlay to match the premium architectural aesthetic */}
                            <div className="absolute inset-0 bg-black/10 z-10 transition-colors duration-500 hover:bg-transparent pointer-events-none" />
                            <img
                                ref={imageRef}
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80"
                                alt="Modern Architecture"
                                className="w-full h-full object-cover origin-center"
                            />
                        </div>

                        {/* Sub Address context */}
                        <div className="w-full pt-8 flex justify-between uppercase text-xs tracking-[0.2em] font-bold text-black/60 pointer-events-none">
                            <span ref={el => subtextRef.current[5] = el}>Pune, IN</span>
                            <span ref={el => subtextRef.current[6] = el}>Exclusive</span>
                        </div>
                    </div>

                </div>

                {/* Footer contextual links */}
                <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 mt-8 md:mt-0 justify-between items-center text-[10px] md:text-xs tracking-widest font-bold uppercase text-black/70 px-4 md:px-[4vw]">
                    <a ref={el => subtextRef.current[7] = el} href="#" className="hover:text-[#6CAFBF] transition-colors">Instagram</a>
                    <a ref={el => subtextRef.current[8] = el} href="#" className="hover:text-[#6CAFBF] transition-colors">LinkedIn</a>
                    <a ref={el => subtextRef.current[9] = el} href="#" className="hover:text-[#6CAFBF] transition-colors">Facebook</a>
                </div>
            </div>
        </div>
    );
};

export default Menu;
