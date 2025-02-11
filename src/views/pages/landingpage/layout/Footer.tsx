
import { Tooltip } from "flowbite-react";
import logo from "/src/assets/images/front-pages/background/white-icon-logo.svg";
import FullLogo from "../../../../assets/images/front-pages/background/ai_genie_logo.svg"; // Ensure this path is correct and the file exists
import { Link } from "react-router";
import linkedIn from "/src/assets/images/front-pages/background/linkedIn.png"
import twitter from "/src/assets/images/front-pages/background/twitter.svg"

export const Footer = () => {
  const navLinks1 = [
    {
      key: "link1",
      title: "Contact Us",
      link: "/#",
    },
    {
      key: "link2",
      title: "About us",
      link: "/#",
    }
  ];

  return (
    <>
      <div className="bg-sky">
        <div className="container-1218 mx-auto ">
          <div className="border-b border-darkborder lg:py-24 py-12">
            <div className="grid grid-cols-12 gap-30 ">
              <div className="lg:col-span-6 sm:col-span-6">
                <img src={FullLogo} alt="logo" className="mb-1" width="50" />
                <div className="flex flex-col gap-4">
                  {navLinks1.map((item) => {
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
                  Features
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
              </div> */}
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
              <div className="lg:col-span-6 sm:col-span-6 col-span-12 flex flex-col items-end">
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
                  <Tooltip
                    content="Twitter"
                    placement="bottom"
                    className="shrink-0"
                  >
                    <Link to="/">
                      <img
                        src={twitter}
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
