import 'flowbite';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import { Link } from "react-router";


const FrontHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scrolling when navigating to hash links

  return (
    <header
      className={`top-0 z-50 ${
        isSticky
          ? 'bg-white dark:bg-dark shadow-md fixed w-full py-5'
          : 'bg-lightgray dark:bg-darkgray lg:py-9 py-5'
      }`}
    >
      <div className="container-1218 mx-auto flex justify-between items-center">
        <FullLogo />
        <div className="xl:block hidden">
          <Navigation />
        </div>
        <div className="flex gap-4">
       
        <Button
          as={Link}
          to="/auth/login"
          color="primary"
          className="border border-primary text-primary hover:bg-primary hover:text-white rounded-md"
          pill
          outline
        >
          Log in
        </Button>
        <Button
          as="button"
          className="font-bold xl:flex "
          color="primary"
          onClick={(e: any) => {
            e.preventDefault();
            const targetElement = document.querySelector('#contact');
            if (targetElement) {
              // targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              const offset = 210; // Adjust to stop scrolling above the element-150
              const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          
              window.scrollTo({ top: topPosition, behavior: 'smooth' });            }
          }}
         
        >
          Contact Us
        </Button>
        </div>

        {/* <MobileMenu /> */}
      </div>
    </header>
  );
};

export default FrontHeader;
