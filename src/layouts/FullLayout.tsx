import { FC, useContext } from 'react';
import { Outlet } from "react-router";
import { CustomizerContext } from '../context/CustomizerContext.tsx';
import Sidebar from './vertical/sidebar/Sidebar.tsx';
import Header from './vertical/header/Header.tsx';
import ScrollToTop from 'src/components/shared/ScrollToTop.tsx';



const FullLayout: FC = () => {
  const { activeLayout, isLayout } = useContext(CustomizerContext);

  return (
      <>
    <div className="flex w-full min-h-screen dark:bg-darkgray">
      <div className="page-wrapper flex w-full  ">
        {/* Header/sidebar */}

        {activeLayout == "vertical" ? <Sidebar /> : null}
        <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
          {/* Top Header  */}
          {activeLayout == "horizontal" ? (
            <Header layoutType="horizontal" />
          ) : (
            <Header layoutType="vertical" />
          )}

          <div
            className={`bg-lightgray dark:bg-dark  h-[calc(100vh_-_100px)] ${
              activeLayout != "horizontal" ? "rounded-bb" : "rounded-none"
            } `}
          >
            {/* Body Content  */}
            <div
              className={` ${
                isLayout == "full"
                  ? "w-full py-30 md:px-30 px-5"
                  : "container mx-auto  py-30"
              } ${activeLayout == "horizontal" ? "xl:mt-3" : ""}
              `}
            >
              <ScrollToTop>
              <Outlet/>
              </ScrollToTop>
            </div>
            {/* <Customizer /> */}
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default FullLayout;
