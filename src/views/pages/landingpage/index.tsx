import About from 'src/components/apps/landingpage/homepage/About';
import ContactForm from 'src/components/apps/landingpage/homepage/ContactForm';
import MainBanner from 'src/components/apps/landingpage/homepage/MainBanner';
import Solution from 'src/components/apps/landingpage/homepage/Solutions';
import LandingPageLayouts from 'src/components/apps/landingpage/layout';
import { Footer } from 'src/components/apps/landingpage/layout/Footer';

const Landingpage = () => {
  return (
    <>
      <LandingPageLayouts>
        <MainBanner />
        <Solution />
        <About />
        <ContactForm />
        <Footer />
      </LandingPageLayouts>
    </>
  );
};

export default Landingpage;
