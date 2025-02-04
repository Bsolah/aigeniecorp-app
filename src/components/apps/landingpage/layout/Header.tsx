import 'flowbite';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';

const FrontHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

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
        <Button
          as="button"
          onClick={(e) => {
            e.preventDefault();
            const targetElement = document.querySelector('#contact');
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="font-bold xl:flex hidden"
          color="primary"
        >
          Contact Us
        </Button>

        <MobileMenu />
      </div>
    </header>
  );
};

export default FrontHeader;
