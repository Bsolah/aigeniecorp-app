
import { Tooltip } from "flowbite-react";
import logo from "/src/assets/images/front-pages/background/white-icon-logo.svg";
import FullLogo from "../../../../assets/images/front-pages/background/aigenie_logo.svg"; // Ensure this path is correct and the file exists
import { Link } from "react-router";
import linkedIn from "/src/assets/images/front-pages/background/linkedIn.png"

export const Footer = () => {
  const navLinks1 = [
    {
      key: "link1",
      title: "Contact Us",
      link: "#contact",
    },
    {
      key: "link2",
      title: "About us",
      link: "#about",
    }
  ];

  const navLinks2 = [
    {
      key: "link2",
      title: "Privacy Policy",
      link: "/privacy-policy",
    }
  ]

  return (
    <>
      <div className="bg-sky">
        <div className="container-1218 mx-auto ">
          <div className="border-b border-darkborder lg:py-24 py-12">
            <div className="grid grid-cols-12 gap-30 ">
              <div className="lg:col-span-6 sm:col-span-6">
                <img src={FullLogo} alt="logo" color="white" className="mb-1" width="50" />
                <div className="flex flex-col gap-4">
                  {navLinks1.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="text-sm text-lightmuted hover:text-primary block"
                        onClick={(e: any) => {
                          e.preventDefault();
                          const targetElement = document.querySelector(item.link);
                          if (targetElement) {
                            // targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            const offset = 210; // Adjust to stop scrolling above the element-150
                            const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      
                            window.scrollTo({ top: topPosition, behavior: 'smooth' });
      
                          }
                        }}
                      >
                        {item.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-3 sm:col-span-3 col-span-12">
                <h4 className="text-17 text-white font-semibold mb-8" >
                  Legal
                </h4>
                <div className="flex flex-col gap-4">
                  {navLinks2.map((item) => {
                    return (
                      <Link
                        key={item.key}
                        to={item.link}
                        className="text-sm text-lightmuted hover:text-primary block"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
              {/* <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <h4 className="text-17 text-white font-semibold mb-8">
                  Resources
                </h4>
                <div className="flex flex-col gap-4">
                  {navLinks3.map((item) => {
                    return (
                      <Link
                        key={item.key}
                        to={item.link}
                        className="text-sm text-lightmuted hover:text-primary block"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div> */}
              <div className="lg:col-span-3 sm:col-span-3 col-span-12 flex flex-col items-end">
                <h4 className="text-17 text-white font-semibold mb-8">
                  Follow us
                </h4>
                <div className="flex items-center gap-5">
                  <Tooltip
                    content="LinkedIn"
                    placement="bottom"
                    className="shrink-0"
                  >
                    <Link to="https://www.linkedin.com/company/ai-genie-corp/posts/">
                      <img
                        src={linkedIn}
                        height={22}
                        width={22}
                        alt="icon"
                      />
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-1218 mx-auto ">
          <div className="flex md:justify-between justify-center items-center flex-wrap md:py-10 py-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" height={24} />
              <p className="text-15 text-lightmuted ">
                All rights reserved by Aigenie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
