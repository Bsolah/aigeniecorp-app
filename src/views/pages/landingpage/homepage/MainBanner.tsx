import { Button, } from "flowbite-react";
import { useEffect } from "react";
import ColorBoxes from "../layout/ColorBoxes";

let index = 0;

const messages = [
  " Enterprise Security",
  " Zero Data Leaks",
  " Faster Decisions",
  " AI-Powered Precision",
  " Continuous Compliance",
  " Always Audit-Ready",
  " Centralized Knowledge",
  " Instant Access",
  " Seamless Integration",
  " Secure AI Access",
  " Regulatory Updates",
  " Always in Sync",
  " Accurate Insights",
  " Every Single Time",
  " Smarter Searches",
  " Maximum Efficiency",
];

let banner: any = null;

const MainBanner = () => {

  useEffect(() => {
    banner = document.getElementById("bannerL");
    banner.innerText = messages[0];
    setInterval(rotateBanner, 6000); // Change text every 3 seconds
  }, [])


  const rotateBanner = () => {
    banner.style.opacity = 0;  // Fade out effect
    banner.style.width = 60;

    setTimeout(() => {
      index = (index + 1) % messages.length; // Rotate messages
      banner.innerText = messages[index];
      banner.style.opacity = 1;  // Fade in effect
    }, 100); // Match transition duration
  }

  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto sm:pt-10 pt-6 xl:pb-0 pb-10">
          <div className="grid grid-cols-12 gap-30  items-center ">
            <div className="xl:col-span-6 col-span-12 lg:text-start text-center md:mb-28">
              <h2 className="lg:text-30 text-2xl text-darklink dark:text-white leading-[50px] ">
                The AI Model That
              </h2>
              <h2 className="lg:text-39 text-3xl text-darklink dark:text-white leading-[50px]">
                Knows. Protects. Complies.
              </h2>
              <div className=" py-6">
                <h5 className="text-17 text-ldfont-medium opacity-80 md:pt-0 pt-3">
                  <span style={{ fontSize: 'small' }}>With AI Genie, you get: </span>
                </h5>
                <div className="lg:mx-0 trapezoid mx-auto  p-2 text-dark mt-2 w-45" id="bannerL"></div>
              </div>
              <ul className="flex flex-wrap lg:justify-start justify-center gap-5 pb-7 md:pt-4 ml-0">
                {/* {Technology.map((item, index) => (
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
                ))} */}
              </ul>
              <div className="flex lg:justify-start justify-center">
                <Button
                  color={'primary'}
                  as="button"
                  onClick={(e: any) => {
                    e.preventDefault();
                    const targetElement = document.querySelector('#contact');
                    if (targetElement) {
                      // targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      const offset = 210; // Adjust to stop scrolling above the element-150
                      const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

                      window.scrollTo({ top: topPosition, behavior: 'smooth' });

                    }
                  }}
                  className="px-4 font-bold sm:w-fit w-full"
                >
                  Get Early Access
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 xl:block hidden">
              {/* <div className="xl:col-span-6 col-span-12">
                <WelcomeBox />
                <div className="grid grid-cols-12 mt-30 gap-30">
                  <div className="md:col-span-6 col-span-12">
                    <Customer />
                  </div>
                  <div className="md:col-span-6 col-span-12">
                    <Project />
                  </div>
                </div>
              </div> */}
              <div className="col-span-6 mb-8">
                <ColorBoxes />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default MainBanner;
