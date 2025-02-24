import { Badge } from 'flowbite-react';
import { Link, useNavigate } from 'react-router';

const FrontNav = [
  {
    menu: 'Home',
    link: '/',
    badge: false,
  },
  {
    menu: 'Services',
    link: '#services',
    badge: false,
  },
  {
    menu: 'About',
    link: '#about',
    badge: false,
  },
];

const Navigation = () => {
  const navigate = useNavigate();

  // Smooth scrolling function
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) => {
    if (link === '/') {
      event.preventDefault();
      navigate(link); // Navigate to home
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    } else if (link.startsWith('#')) {
      event.preventDefault();
      const targetElement = document.querySelector(link);
      if (targetElement) {
        const offset = 120; // Adjust to stop scrolling above the element-150
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
        window.scrollTo({ top: topPosition, behavior: 'smooth' });

      //   setTimeout(() => {
      //     window.scrollBy({ top: -100, behavior: "smooth" }); // Adjust -50 to your preferred offset
      //   }, 300); // Delay to ensure the first scroll happens before adjustment
      }
    }
  };

  return (
    <ul className="flex xl:flex-row flex-col xl:gap-9 gap-6 xl:items-center">
      {FrontNav.map((item, index) => (
        <li
          key={index}
          className="rounded-md font-semibold text-15 py-1.5 px-2.5 text-sky dark:text-white"
        >
          <Link
            to={item.link}
            className="flex gap-3 items-center text-primary-ld"
            onClick={(e) => handleScroll(e, item.link)}
          >
            {item.menu}
            {item.badge && <Badge color="lightprimary">New</Badge>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
