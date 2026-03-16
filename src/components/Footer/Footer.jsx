import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const navLinks = [
  { label: 'Home', id: 'section-home' },
  { label: 'Why Us', id: 'section-why-us' },
  { label: 'Services', id: 'section-services' },
  { label: 'Projects', id: 'section-projects' },
  { label: 'Amenities', id: 'section-amenities' },
  { label: 'Testimonials', id: 'section-testimonials' },
  { label: 'Contact', id: 'section-contact' },
];

const legalLinks = ['Privacy Policy', 'Terms of Use', 'Cookie Policy'];

const Footer = () => {
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Big brand text horizontal slide in
      gsap.fromTo(bigTextRef.current,
        { xPercent: -8, opacity: 0 },
        {
          xPercent: 0, opacity: 1,
          duration: 1.6, ease: 'power4.out',
          scrollTrigger: { trigger: bigTextRef.current, start: 'top 90%' }
        }
      );

      // Content fade in stagger
      gsap.fromTo(contentRef.current.querySelectorAll('.footer-item'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.1, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 88%' }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#F5F5F0] text-black overflow-hidden"
    >

      {/* ══════════════════════════════════════════════
          HUGE BRAND NAME — Letterpress style
      ════════════════════════════════════════════════ */}
      <div className="border-t border-black/8 pt-[8vh] overflow-hidden">
        <h2
          ref={bigTextRef}
          className="font-[magtis] uppercase font-extrabold leading-none tracking-tighter text-black/[0.07] select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 14vw, 18rem)' }}
        >
          Adhinathpuram
        </h2>
      </div>


      {/* ══════════════════════════════════════════════
          MAIN CONTENT GRID
      ════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="px-4 md:px-[6vw] pt-[8vh] pb-[6vh] grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 md:gap-8"
      >

        {/* Col 1 — Brand + tagline */}
        <div className="flex flex-col gap-8 footer-item">
          <div className="flex flex-col gap-3">
            <h3 className="font-[magtis] uppercase font-extrabold text-2xl md:text-3xl tracking-tight leading-none">
              Mayuri<br />
              <span className="text-[#6CAFBF]">Landmarks LLP</span>
            </h3>
            <p className="text-black/50 text-sm md:text-base font-medium leading-relaxed max-w-xs">
              Born with a purpose to build projects that breathe life into the dreams of their customers. Pune's most trusted developer.
            </p>
          </div>

          {/* RERA Badge */}
          <div className="flex items-center gap-3 border border-black/10 rounded-sm px-4 py-3 w-fit">
            <div className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-pulse" />
            <span className="text-black/60 text-xs tracking-[0.2em] uppercase font-bold">MAHA RERA Certified</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {[
              {
                name: 'Instagram', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                )
              },
              {
                name: 'LinkedIn', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                )
              },
              {
                name: 'Facebook', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                )
              },
            ].map(({ name, icon }) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/50 hover:bg-black hover:text-white hover:border-black transition-all duration-400"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>


        {/* Col 2 — Navigation */}
        <div className="flex flex-col gap-6 footer-item">
          <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">Navigate</span>
          <nav className="flex flex-col gap-3">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="text-black/60 text-sm md:text-base font-medium hover:text-black hover:translate-x-2 transition-all duration-300 w-fit text-left"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>


        {/* Col 3 — Services */}
        <div className="flex flex-col gap-6 footer-item">
          <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">Services</span>
          <div className="flex flex-col gap-3">
            {['Tiling & Painting', 'Renovations', 'Design & Build', 'Consulting', 'Contracting'].map(s => (
              <span key={s} className="text-black/60 text-sm md:text-base font-medium hover:text-black transition-colors duration-300 cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>


        {/* Col 4 — Contact + Map placeholder */}
        <div className="flex flex-col gap-6 footer-item">
          <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">Get in Touch</span>

          <div className="flex flex-col gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-black/70 hover:text-black text-sm font-medium transition-colors duration-300 group">
              <span className="w-6 h-6 rounded-full bg-[#6CAFBF]/15 flex items-center justify-center group-hover:bg-[#6CAFBF]/30 transition-colors duration-300 shrink-0">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6CAFBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.7 2.88a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 5 5l1.2-1.2a2 2 0 0 1 2.11-.45c.92.33 1.88.57 2.88.7A2 2 0 0 1 22 16.9z" />
                </svg>
              </span>
             +91 8237277775
            </a>
            <a href="mailto:info@mayurilandmarks.com" className="flex items-center gap-3 text-black/70 hover:text-black text-sm font-medium transition-colors duration-300 group">
              <span className="w-6 h-6 rounded-full bg-[#6CAFBF]/15 flex items-center justify-center group-hover:bg-[#6CAFBF]/30 transition-colors duration-300 shrink-0">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6CAFBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 8L2 7" />
                </svg>
              </span>
             sales@mayurilandmarks.com
            </a>
            <div className="flex items-start gap-3 text-black/60 text-sm font-medium">
              <span className="w-6 h-6 rounded-full bg-[#6CAFBF]/15 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6CAFBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-8-6.5-8-12a8 8 0 1 1 16 0c0 5.5-8 12-8 12z" /><circle cx="12" cy="9" r="2" />
                </svg>
              </span>
              <span className="leading-relaxed">Mayuri Adhinathpuram, 53/8, Wadachi Wadi Road, Undri,
               <br /> Pune - 411 060 Maharashtra, India</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo('section-contact')}
            className="group flex items-center gap-3 mt-2 w-fit border border-black/20 rounded-sm px-5 py-3 text-xs tracking-[0.2em] uppercase font-bold text-black/70 hover:bg-black hover:text-white hover:border-black transition-all duration-500"
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════════════ */}
      <div className="border-t border-black/8 px-4 md:px-[6vw] py-6 flex flex-col md:flex-row items-center justify-between gap-4 footer-item">
        <span className="text-black/30 text-xs tracking-widest">
          © {year} Mayuri Landmarks LLP. All rights reserved.
        </span>

        <div className="flex items-center gap-2 text-black/30 text-xs tracking-widest">
          <span>Crafted by Rohit & Tejas with</span>
          <span className="text-[#6CAFBF]">♥</span>
          <span>in Pune, India</span>
        </div>

        <div className="flex items-center gap-5">
          {legalLinks.map(l => (
            <a key={l} href="#" className="text-black/25 text-xs tracking-widest hover:text-black/60 transition-colors duration-300">
              {l}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default Footer;
