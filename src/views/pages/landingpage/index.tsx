import About from 'src/views/pages/landingpage/homepage/About';
import ContactForm from 'src/views/pages/landingpage/homepage/ContactForm';
import MainBanner from 'src/views/pages/landingpage/homepage/MainBanner';
import Solution from 'src/views/pages/landingpage/homepage/Solutions';
import LandingPageLayouts from 'src/views/pages/landingpage/layout';

const Landingpage = () => {
  return (
    <>
      <LandingPageLayouts>
        <MainBanner />
        <About />
        <Solution />
        <ContactForm />
      </LandingPageLayouts>
    </>
  );
};

export default Landingpage;
