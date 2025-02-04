import { Button } from 'flowbite-react';
import { Link } from 'react-router';
import mainbanner from '/src/assets/images/front-pages/background/main-banner.png';

const MainBanner = () => {
  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto sm:pt-10 pt-6 xl:pb-0 pb-10">
          <div className="grid grid-cols-12 gap-30  items-center ">
            <div className="xl:col-span-6 col-span-12 lg:text-start text-center md:mb-28">
              <h1 className="lg:text-56 text-4xl text-darklink dark:text-white lg:leading-[64px] leading-[50px]">
                <b>Your All-in-One </b>AI Assistant
              </h1>
              <div className="   py-6">
                <h5 className="text-17 text-ld font-medium opacity-80 md:pt-0 pt-3">
                  Your virtual AI partner for seamless operations, accurate documentation, and
                  turning hours of work into minutes
                </h5>
              </div>
              {/* <ul className="flex flex-wrap lg:justify-start justify-center gap-5 pb-7 md:pt-4 ml-0">
                {Technology.map((item, index) => (
                  <Tooltip
                    content={item.tooltip}
                    className="!text-xs"
                    placement="bottom"
                    key={index}
                  >
                    <li className="md:h-14 md:w-14 h-10 w-10 bg-white dark:bg-darkmuted rounded-[16px] flex justify-center items-center shadow-elevation1">
                      <img src={item.tech} alt="icon" height={28} className="md:h-7 h-5" />
                    </li>
                  </Tooltip>
                ))}
              </ul> */}
              <div className="flex lg:justify-start justify-center">
                <Button
                  color={'primary'}
                  as={Link}
                  to="/auth/auth2/login"
                  className="px-4 font-bold sm:w-fit w-full"
                >
                  Get Early Access
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 xl:block hidden">
              <div className="min-w-[1300px] max-h-[700px] h-[calc(100vh_-_100px)] overflow-hidden ">
                <img src={mainbanner} className="rtl:scale-x-[-1]" alt="banner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
