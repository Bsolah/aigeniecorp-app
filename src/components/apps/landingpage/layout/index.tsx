import { Flowbite } from 'flowbite-react';
import { Outlet } from 'react-router';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import customTheme from 'src/utils/theme/custom-theme';

import FrontHeader from './Header';
import { Footer } from './Footer';

function LandingPageLayouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="frontend-page bg-white dark:bg-dark">
        <Flowbite theme={{ theme: customTheme }}>
          <FrontHeader />
          {children}
          <ScrollToTop>
            <Outlet />
          </ScrollToTop>
          <Footer />
        </Flowbite>
      </div>
    </>
  );
}
export default LandingPageLayouts;
