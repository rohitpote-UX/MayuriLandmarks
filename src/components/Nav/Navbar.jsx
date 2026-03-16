import { ArrowRightIcon, LocateIcon } from 'lucide-react'
import React, { useState } from 'react'
import Menu from './Menu'

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = () => {
    // State to handle the full-screen menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className='flex w-full h-[12vh] items-center justify-between px-4 md:px-10 py-6 md:py-12 relative z-40'>
                <div className="logo z-50">
                    <img src="https://www.mayurilandmarks.com/assets/images/logo/logo.png" alt="Mayuri Logo" className='w-24 md:w-34 ml-0 md:ml-[2vw]' />
                </div>

                <div className="buttons flex items-center gap-5">
                    {/* Get in Touch - Hidden on Mobile, Slides to Right on Desktop */}
                    <button onClick={() => scrollTo('section-contact')} className='hidden md:flex group relative bg-[#6CAFBF] text-white px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03]'>
                        {/* Invisible Placeholder to maintain button size */}
                        <div className="opacity-0 flex items-center gap-2 pointer-events-none">
                            <span className="whitespace-nowrap">Get in Touch</span> <ArrowRightIcon size={16} />
                        </div>
                        {/* Default State - Slides Right (Out) */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] w-full h-full">
                            <span className="whitespace-nowrap">Get in Touch</span> <ArrowRightIcon size={16} />
                        </div>
                        {/* Hover State - Slides Right (In from Left) */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 w-full h-full">
                            <span className="whitespace-nowrap">Get in Touch</span> <ArrowRightIcon size={16} />
                        </div>
                    </button>

                    {/* Location - Hidden on Mobile, Slides to Left (Vice Versa) on Desktop */}
                    <button onClick={() => scrollTo('section-map')} className='hidden md:flex group relative text-[#6CAFBF] border border-[#6CAFBF] px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:bg-[#6CAFBF] hover:border-transparent hover:text-white hover:scale-[1.03]'>
                        {/* Invisible Placeholder to maintain button size */}
                        <div className="opacity-0 flex items-center gap-2 pointer-events-none">
                            <span className="whitespace-nowrap">Location</span> <LocateIcon size={16} />
                        </div>
                        {/* Default State - Slides Left (Out) */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[150%] w-full h-full">
                            <span className="whitespace-nowrap">Location</span> <LocateIcon size={16} />
                        </div>
                        {/* Hover State - Slides Left (In from Right) */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 w-full h-full">
                            <span className="whitespace-nowrap">Location</span> <LocateIcon size={16} />
                        </div>
                    </button>
                    
                    {/* Premium Awwwards Menu Button - Visible on All Sizes */}
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="group flex items-center gap-3 cursor-pointer ml-0 md:ml-4 p-2 overflow-hidden hover:scale-[1.03] transition-transform duration-300 z-50"
                    >
                        <div className="relative w-8 h-[10px] flex flex-col justify-between overflow-hidden">
                            {/* Top Line - Slides Right */}
                            <div className="relative w-full h-[1.5px]">
                                <span className="absolute top-0 left-0 w-full h-full bg-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[101%]"></span>
                                <span className="absolute top-0 right-full w-full h-full bg-[#6CAFBF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[101%]"></span>
                            </div>
                            {/* Bottom Line - Slides Left (Vice Versa) */}
                            <div className="relative w-full h-[1.5px]">
                                <span className="absolute top-0 left-0 w-full h-full bg-black transition-transform duration-500 delay-75 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[101%]"></span>
                                <span className="absolute top-0 left-full w-full h-full bg-[#6CAFBF] transition-transform duration-500 delay-75 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[101%]"></span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Render Full Screen Menu Overlay */}
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    )
}

export default Navbar