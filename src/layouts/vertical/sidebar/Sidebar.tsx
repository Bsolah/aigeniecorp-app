
import { useContext, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { IconSidebar } from "./IconSidebar.tsx";
import SidebarContent from "./Sidebaritems.ts";
import NavItems from "./NavItems/index.tsx";
import NavCollapse from "./NavCollapse/index.tsx";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css";
import { CustomizerContext } from "../../../context/CustomizerContext.tsx";
import { useLocation } from "react-router";
import FullLogo from "../../shared/logo/FullLogo.tsx";
import React from "react";
import { useSelector } from "react-redux";
import { structureFolder } from "src/utils/commonFunctions.ts";
import ChatListing from "src/components/apps/chat/ChatListing.tsx";

const SidebarLayout = () => {
  const { selectedIconId, setSelectedIconId } =
    useContext(CustomizerContext) || {};
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );
  console.log('selected content ', selectedContent?.items);
  console.log('selected selectedIconId ', selectedIconId);

  const { folder } = useSelector((state: any) => state.folders);

  // if (folder && folder.length > 0 ) {
    const resultFolders = structureFolder(folder);
    selectedContent?.items?.forEach((item: any) => {
      if (item.heading === 'Knowledge Base') {

        
        item.children = [resultFolders];
      }
      return item;
    })
  // }

  const location = useLocation();
  const pathname = location.pathname;

  function findActiveUrl(narray: any[], targetUrl: string, parentId: any = null): any {
    for (const item of narray) {
      // If we're at the top level, set the parentId
      const currentParentId = parentId ?? item.id;

      // Check if the current item's URL matches the target
      if (item.url === targetUrl) {
        return currentParentId; // Return the top parent ID
      }

      // Search recursively in `children`
      if (item.children) {
        const foundId = findActiveUrl(item.children, targetUrl, currentParentId);
        if (foundId) return foundId;
      }

      // Search recursively in `items`
      if (item.items) {
        const foundId = findActiveUrl(item.items, targetUrl, currentParentId);
        if (foundId) return foundId;
      }
    }

    return null; // URL not found
  }

  const defaultSidebar = (item: any) => {
    return item?.children?.map((child: any, index: any) => {
      return(
      <React.Fragment key={child.id && index}>
        {child.children ? (
          <NavCollapse item={child} tab={item.heading} />
        ) : (
          <NavItems item={child} tab={item.heading} />
        )}
      </React.Fragment>
    )})
  }

  useEffect(() => {
    const result = findActiveUrl(SidebarContent, pathname);
    if (result) {
      setSelectedIconId(result);
    }
  }, [pathname, setSelectedIconId]);

  return (
    <>
      <div className="xl:block hidden">
        <div className="minisidebar-icon border-e border-ld  fixed start-0 z-[1]">
          <IconSidebar />
        </div>
        <Sidebar
          className="fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 "
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="px-6 py-4 flex items-center sidebarlogo">
            <FullLogo />
          </div>
          <div className="h-[calc(100vh_-_85px)]">
            <Sidebar.Items className="pe-4 rtl:pe-0 rtl:ps-4 px-5 mt-2">
              <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                {selectedContent &&
                  selectedContent.items?.map((item, index) => {
                    return (
                      <div className="caption" key={item.heading}>
                        <React.Fragment key={index}>
                          <h5 className="text-link dark:text-white/70 font-semibold caption font-semibold leading-6 tracking-widest text-xs text-sm  pb-2 uppercase">
                            {item.heading}
                          </h5>
                          {item?.heading === 'Conversations' && (<ChatListing />)}
                          {defaultSidebar(item)}
                        </React.Fragment>
                      </div>
                    )
                  })}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </div >
    </>
  );
};

export default SidebarLayout;
