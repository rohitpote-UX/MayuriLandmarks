import React, { useState } from 'react';
import Home from './components/home/Home';
import Broucher from './components/home/Broucher';
import WhyUs from './components/why us/WhyUs';
import Services from './components/services/Services';
import Projects from './components/projects/Projects';
import Amenities from './components/amenities/Amenities';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/Footer/Footer';
import Navbar from './components/Nav/Navbar';
import Loader from './components/Loader/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Navbar/>
        <div id="section-home"><Home /></div>
        <Broucher />
        <div id="section-why-us"><WhyUs /></div>
        <div id="section-services"><Services /></div>
        <div id="section-projects"><Projects /></div>
        <div id="section-amenities"><Amenities /></div>
        <div id="section-testimonials"><Testimonials /></div>
        <div id="section-contact"><Contact /></div>
        <Footer />
      </div>
    </>
  );
};

export default App;