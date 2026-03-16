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

const App = () => {
  return (
    <div>
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
  );
};

export default App;