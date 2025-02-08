
import { useContext, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { IconSidebar } from "./IconSidebar.tsx";
import SidebarContent from "./Sidebaritems.ts";
import NavItems from "./NavItems/index.tsx";
import NavCollapse from "./NavCollapse/index.tsx";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css";
import { CustomizerContext } from "../../../../context/CustomizerContext.tsx";
import { useLocation } from "react-router";
import FullLogo from "../../shared/logo/FullLogo.tsx";
import React from "react";
import { useSelector } from "react-redux";
import { structureFolder } from "src/utils/commonFunctions.ts";
import { getFolders } from "src/redux/slices/folderSlice.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../../../../redux/store.ts';

const SidebarLayout = () => {
  const { selectedIconId, setSelectedIconId } =
    useContext(CustomizerContext) || {};
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );
  const { folder } = useSelector((state: any) => state.folders);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);

  if (folder && folder.length > 1) {
    console.log('I am here ', selectedIconId, folder)
    const resultFolders = structureFolder(folder[0]);
    selectedContent?.items?.forEach((item: any) => {
      if (item.heading === 'Knowledge Base') {

        item.children = [resultFolders];
      }
      return item;
    })
  }

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


  const sidebarSelection = (item: any) => {
    // if (item.heading === 'AI Models') {

    // const switchBars = (child: any) => {

    //   console.log('4 ', {child})

    //   return (<Field key={child.name} className="flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-md mb-2 ">
    //     <Switch
    //       checked={true}
    //       className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
    //     >
    //       <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
    //     </Switch>
    //     <div >
    //       <Label className="text-ld cursor-pointer">{child.name}</Label>
    //       <Description className="text-bodytext text-xs">
    //         {child.description}
    //       </Description>
    //     </div>
    //   </Field>)

    // }

    //   return <div>
    //     {item.children?.map((child: any) => {

    //       console.log({ child })

    //       if (child.children) {
    //         console.log('2 ', { child })
    //         child.children?.map((item: any) => {
    //           console.log('3 ', { item })
    //           return <NavCollapse item={child} />

    //           // return switchBars(item);
    //         })
    //       }

    //       return switchBars(child);
    //     })}
    //   </div>
    // }
    // else if (item.heading === 'Knowledge Base') {
    // addPopover = true; 
    // }
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

  useEffect(() => {
    const result = findActiveUrl(SidebarContent, pathname);
    console.log('find path result ', result)
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
                    // console.log('item ', item)
                    // if(item.heading === 'AI Models') {
                    //   // setSelectedItem(item && item?.children && item?.children[0])
                    // }
                    return (
                      <div className="caption" key={item.heading}>
                        <React.Fragment key={index}>
                          <h5 className="text-link dark:text-white/70 font-semibold caption font-semibold leading-6 tracking-widest text-xs text-sm  pb-2 uppercase">
                            {item.heading}
                          </h5>
                          {sidebarSelection(item)}
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
