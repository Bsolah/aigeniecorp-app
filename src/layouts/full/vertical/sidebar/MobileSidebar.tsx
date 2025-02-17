
import  { useContext } from "react";
import { Sidebar } from "flowbite-react";
import { IconSidebar } from "./IconSidebar.js";
import SidebarContent from "./Sidebaritems.ts";
import NavItems from "./NavItems/index.tsx";
import NavCollapse from "./NavCollapse/index.tsx";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css";
import { CustomizerContext } from "../../../../context/CustomizerContext.tsx";
import React from "react";

const MobileSidebar = () => {
  const { selectedIconId } = useContext(CustomizerContext) || {};
  console.log({selectedIconId})
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );
    
  const defaultSidebar = (item: any) => {

    return item?.children?.map((child: any, index: any) => (
      <React.Fragment key={child.id && index}>
        {child.children ? (
          <NavCollapse item={child} />
        ) : (
          <NavItems item={child} />
        )}
      </React.Fragment>
    ))
  }
  
  return (
    <>
      <div>
        <div className="minisidebar-icon border-e border-ld bg-white dark:bg-darkgray fixed start-0 z-[1] ">
          <IconSidebar />
        </div>
        <Sidebar
          className="fixed menu-sidebar pt-8 bg-white dark:bg-darkgray transition-all"
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="h-[calc(100vh_-_85px)]">
            <Sidebar.Items className="ps-4 pe-4">
              <Sidebar.ItemGroup className="sidebar-nav">
                {selectedContent &&
                  selectedContent.items?.map((item, index) => (
                    <React.Fragment key={index}>
                      <h5 className="text-link font-semibold text-sm caption">
                        {item.heading}
                      </h5>
                      {defaultSidebar(item)}
                    </React.Fragment>
                  ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default MobileSidebar;
