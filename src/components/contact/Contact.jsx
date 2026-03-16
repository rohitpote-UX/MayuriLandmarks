import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    label: 'Visit Us',
    value: 'Mayuri Landmarks LLP, Pune, Maharashtra, India',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-8-6.5-8-12a8 8 0 1 1 16 0c0 5.5-8 12-8 12z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+91 98765 43210',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.7 2.88a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 5 5l1.2-1.2a2 2 0 0 1 2.11-.45c.92.33 1.88.57 2.88.7A2 2 0 0 1 22 16.9z"/>
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: 'info@mayurilandmarks.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 8L2 7"/>
      </svg>
    ),
  },
];

const services = ['Tiling & Painting', 'Renovations', 'Design & Build', 'Consulting', 'General Contracting'];

const Contact = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const titleLines = useRef([]);
  const formRef = useRef(null);
  const infoRefs = useRef([]);

  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  titleLines.current = [];
  infoRefs.current = [];

  const addTitle = (el) => el && !titleLines.current.includes(el) && titleLines.current.push(el);
  const addInfo = (el) => el && !infoRefs.current.includes(el) && infoRefs.current.push(el);

  const handleChange = (e) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Animate form out
    gsap.to(formRef.current, {
      opacity: 0, y: -30, duration: 0.5, ease: 'power3.in',
      onComplete: () => setSubmitted(true)
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleLines.current,
        { y: 130, rotateX: -30, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1.4, stagger: 0.08, ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      );

      // Form slide in
      gsap.fromTo(formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );

      // Info stagger
      gsap.fromTo(infoRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: infoRefs.current[0], start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputClass = (name) => `
    w-full bg-transparent border-b-2 pt-6 pb-3 text-white text-base md:text-lg font-medium
    placeholder-transparent outline-none transition-all duration-400 peer
    ${focused === name || formState[name]
      ? 'border-[#6CAFBF]'
      : 'border-white/15 hover:border-white/30'}
  `;

  const labelClass = (name) => `
    absolute left-0 text-white/40 font-medium tracking-wide transition-all duration-300 pointer-events-none
    ${focused === name || formState[name]
      ? 'top-0 text-xs text-[#6CAFBF] tracking-[0.2em] uppercase'
      : 'top-6 text-base'}
  `;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#0A0A0A] text-white overflow-hidden"
    >

      {/* ══════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════ */}
      <div className="px-4 md:px-[6vw] pt-[16vh] pb-[8vh]">
        <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-5">
          Let's Connect
        </p>
        <div ref={headlineRef} style={{ perspective: '1000px' }}>
          {["Start Your", "Dream Project."].map((line, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <span
                ref={addTitle}
                className={`block font-[magtis] uppercase font-extrabold tracking-tighter leading-[0.88] ${i === 1 ? 'text-[#6CAFBF]' : 'text-white'}`}
                style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-[1px] bg-white/8 mt-[8vh]" />
      </div>


      {/* ══════════════════════════════════════════════
          MAIN GRID: CONTACT INFO + FORM
      ════════════════════════════════════════════════ */}
      <div className="px-4 md:px-[6vw] pb-[16vh] grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-[8vw] items-start">

        {/* ── LEFT: Contact Details ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-12 pt-2">
          <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed">
            We are always open to discuss your project, improve your online presence and help with your challenges. Drop us a message and we'll get back to you within 24 hours.
          </p>

          {/* Info blocks */}
          <div className="flex flex-col gap-8">
            {contactInfo.map((info, i) => (
              <div key={i} ref={addInfo} className="flex items-start gap-5 group">
                <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#6CAFBF] shrink-0 group-hover:bg-[#6CAFBF] group-hover:text-black group-hover:border-[#6CAFBF] transition-all duration-400">
                  {info.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#6CAFBF] text-xs tracking-[0.2em] uppercase font-bold">{info.label}</span>
                  <span className="text-white/70 text-sm md:text-base font-medium leading-relaxed">{info.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div ref={addInfo} className="flex flex-col gap-4">
            <span className="text-[#6CAFBF] text-xs tracking-[0.2em] uppercase font-bold">Follow Us</span>
            <div className="flex items-center gap-4">
              {['Instagram', 'LinkedIn', 'Facebook'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="text-white/30 text-sm font-semibold tracking-wide hover:text-[#6CAFBF] transition-colors duration-300 border-b border-white/10 hover:border-[#6CAFBF] pb-1"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Big decorative number */}
          <div ref={addInfo} className="hidden md:block font-[magtis] text-[20vw] md:text-[12vw] font-extrabold text-white/[0.04] leading-none select-none pointer-events-none">
            ML
          </div>
        </div>


        {/* ── RIGHT: Form ───────────────────────────────────────────────────── */}
        <div ref={formRef} style={{ opacity: 0 }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text" name="name" id="name" autoComplete="off" required
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Full Name"
                    className={inputClass('name')}
                  />
                  <label htmlFor="name" className={labelClass('name')}>Full Name</label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email" name="email" id="email" autoComplete="off" required
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="Email Address"
                    className={inputClass('email')}
                  />
                  <label htmlFor="email" className={labelClass('email')}>Email Address</label>
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel" name="phone" id="phone" autoComplete="off"
                  value={formState.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  placeholder="Phone Number"
                  className={inputClass('phone')}
                />
                <label htmlFor="phone" className={labelClass('phone')}>Phone Number</label>
              </div>

              {/* Service Select */}
              <div className="relative">
                <select
                  name="service" id="service" required
                  value={formState.service}
                  onChange={handleChange}
                  onFocus={() => setFocused('service')}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass('service')} cursor-pointer`}
                  style={{ WebkitAppearance: 'none', background: 'transparent' }}
                >
                  <option value="" disabled className="text-black bg-white">Select a Service</option>
                  {services.map(s => (
                    <option key={s} value={s} className="text-black bg-white">{s}</option>
                  ))}
                </select>
                <label htmlFor="service" className={labelClass('service')}>I'm Interested In</label>
                {/* Custom arrow */}
                <svg className="absolute right-0 bottom-4 text-white/30 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message" id="message" rows={4} required
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Your Message"
                  className={`${inputClass('message')} resize-none`}
                />
                <label htmlFor="message" className={labelClass('message')}>Your Message</label>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-6 pt-2">
                <button
                  type="submit"
                  className="group relative flex items-center gap-5 bg-[#6CAFBF] text-black font-bold text-sm tracking-widest uppercase px-10 py-5 rounded-sm overflow-hidden transition-all duration-500 hover:bg-white"
                >
                  <span className="relative z-10">Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10 -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="text-white/20 text-xs leading-relaxed">
                  We respond within<br />24 hours.
                </span>
              </div>

            </form>
          ) : (
            // Success State
            <div className="flex flex-col gap-8 py-16 items-start">
              <div className="w-16 h-16 rounded-full bg-[#6CAFBF]/15 border border-[#6CAFBF]/40 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6CAFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-[magtis] uppercase font-extrabold text-white text-[4vh] md:text-[5vh] leading-tight">
                  Message Sent!
                </h3>
                <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed max-w-md">
                  Thank you for reaching out to Mayuri Landmarks. Our team will get back to you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setSubmitted(false); setFormState({ name:'', email:'', phone:'', service:'', message:'' }); gsap.fromTo(formRef.current, { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' }); }}
                className="text-[#6CAFBF] text-sm tracking-widest uppercase font-bold border-b border-[#6CAFBF]/40 hover:border-[#6CAFBF] pb-1 transition-colors duration-300"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          MAP SECTION — In-page Location
      ════════════════════════════════════════════════ */}
      <div id="section-map" className="relative w-full" style={{ height: '55vh' }}>
        {/* Styled iframe — dark/grayscale filter to match #0A0A0A theme */}
        <iframe
          title="Mayuri Adhinathpuram Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.789069337!2d73.87740637504766!3d18.463598282617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac965f7fcdb%3A0xc7fcb59ea0c26888!2sMayuri%20Adhinathpuram!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.75)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Overlay info card — top-left corner */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 rounded-sm p-5 md:p-7 flex flex-col gap-3 max-w-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-pulse" />
            <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">Our Location</span>
          </div>
          <p className="text-white font-bold text-sm md:text-base leading-snug">
            Mayuri Adhinathpuram
          </p>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed">
            53/8, Wadachi Wadi Road, Undri,<br />Pune – 411 060, Maharashtra
          </p>
          <a
            href="https://maps.google.com/?q=Mayuri+Adhinathpuram+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#6CAFBF] text-xs tracking-widest uppercase font-bold hover:gap-4 transition-all duration-300 mt-1"
          >
            Open in Maps
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Thin top border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/8 z-10 pointer-events-none" />
      </div>

    </section>
  );
};

export default Contact;

