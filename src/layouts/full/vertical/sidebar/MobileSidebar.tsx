
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
import {
  Description,
  Field,
  Label,
  Switch
} from "@headlessui/react";

const MobileSidebar = () => {
  const { selectedIconId } = useContext(CustomizerContext) || {};
  console.log({selectedIconId})
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );
    
  const sidebarSelection = (item: any) => {
    if (item.heading === 'AI Models') {

      return <>
        {item.children?.map((child: any) => (
          <Field key={child.name} className="flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-md mb-2 ">
            <Switch
              checked={true}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
            <div>
              <Label className="text-ld cursor-pointer">{child.name}</Label>
              <Description className="text-bodytext text-xs">
                {child.description}
              </Description>
            </div>
          </Field>
        ))}
      </>
    }
    else if (item.heading === 'Knowledge Base') {
      // addPopover = true; 
    }
    return defaultSidebar(item);
  }

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
                      {sidebarSelection(item)}
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
