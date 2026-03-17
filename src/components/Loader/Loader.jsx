import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const termRef = useRef(null);
  const progressLineRef = useRef(null);
  const gridLinesRef = useRef(null);
  const upperPartRef = useRef(null);
  const lowerPartRef = useRef(null);

  const [counter, setCounter] = useState(0);
  const terms = ["VISION", "PRECISION", "STRUCTURE", "LEGACY", "EXCELLENCE"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Final split reveal
          gsap.to(upperPartRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: "power4.inOut"
          });
          gsap.to(lowerPartRef.current, {
            y: '100%',
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: onComplete
          });
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1.2,
            delay: 0.5,
            ease: "none"
          });
        }
      });

      // 1. Initial State
      gsap.set([upperPartRef.current, lowerPartRef.current], { y: '0%' });
      gsap.set(progressLineRef.current, { scaleX: 0 });
      gsap.set(gridLinesRef.current, { opacity: 0 });

      // 2. Grid reveal
      tl.to(gridLinesRef.current, {
        opacity: 0.15,
        duration: 1.5,
        ease: "power2.out"
      });

      // 3. Counter & Progress Animation (simulated over 4s)
      const countObj = { value: 0 };
      tl.to(countObj, {
        value: 100,
        duration: 4,
        ease: "none",
        onUpdate: () => {
          setCounter(Math.floor(countObj.value));
        }
      }, 0.5);

      tl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 4,
        ease: "none"
      }, 0.5);

      // 4. Terms cycling
      terms.forEach((term, index) => {
        tl.to(termRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          onStart: () => {
            termRef.current.innerText = term;
          }
        }, index * 0.8 + 0.5)
        .to(termRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4
        }, index * 0.8 + 1.1);
      });

      // 5. Final tension pause
      tl.to({}, { duration: 0.5 }); // Buffer

    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black font-[magtis]">
      {/* Background Parts for Split Reveal */}
      <div ref={upperPartRef} className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A] z-10" />
      <div ref={lowerPartRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A] z-10" />

      {/* Grid Pattern */}
      <div ref={gridLinesRef} className="absolute inset-0 z-0 pointer-events-none opacity-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:10vw_10vh]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Term cycling */}
        <div className="h-8 overflow-hidden mb-4">
          <span ref={termRef} className="block text-[#6CAFBF] text-xs md:text-sm tracking-[0.4em] font-bold opacity-0 translate-y-4">
            VISION
          </span>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-2 mb-8">
          <span ref={percentRef} className="text-white text-[12vw] md:text-[8vw] font-extrabold leading-none tracking-tighter">
            {counter < 10 ? `0${counter}` : counter}
          </span>
          <span className="text-[#6CAFBF] text-[4vw] md:text-[2vw] font-bold">%</span>
        </div>

        {/* Progress Line */}
        <div className="w-[80vw] md:w-[40vw] h-[1px] bg-white/10 relative overflow-hidden">
          <div ref={progressLineRef} className="absolute inset-0 bg-[#6CAFBF] origin-left" />
        </div>

        {/* Brand */}
        <div className="mt-12">
          <span className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-bold">
            Mayuri Landmarks
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
