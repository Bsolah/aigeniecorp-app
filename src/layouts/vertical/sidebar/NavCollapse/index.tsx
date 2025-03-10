
import  { useEffect, useState } from "react";
import { ChildItem } from "../Sidebaritems.ts";
import NavItems from "../NavItems/index.tsx";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { CustomCollapse } from "../CustomCollapse.tsx";
import React from "react";
import dispatch from "src/redux/store.ts";
import { getSubFolders } from "src/redux/slices/folderSlice";

interface NavCollapseProps {
  item: ChildItem;
  tab?: string
}


const NavCollapse: React.FC<NavCollapseProps> = ({ item, tab }: any) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine if any child matches the current path
  const activeDD = item.children.find((t: { url: string }) => t.url === pathname);
  

  const { t, i18n } = useTranslation();
  const [translatedLabel, setTranslatedLabel] = useState<string | null>(null);

  // Manage open/close state for the collapse
  const [isOpen, setIsOpen] = useState<boolean>((tab === 'AI Models'|| item.parentId ==='123')  ? !activeDD : activeDD);

  useEffect(() => {
    const loadTranslation = async () => {
      const label = t(`${item.name}`);
      setTranslatedLabel(label);
    };
    loadTranslation();
  }, [i18n.language, item.name, t]);

  // Toggle the collapse
  const handleToggle = () => {

    if(tab === 'Knowledge Base'){
      // console.log('i am here ', item)
      dispatch(getSubFolders({id: item?.id}))
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <CustomCollapse
      label={translatedLabel || `${item.name}`}
      id={`${item.id}`}
      parentId={`${item.parentId}`}
      open={isOpen}
      tab={tab}
      onClick={handleToggle}
      icon={item.icon} 
      selector={item.selector}
      className={
        Boolean(activeDD)
          ? "rounded-sm text-primary"
          : "rounded-sm dark:text-white/80"
      }
    >
      {/* Render child items */}
      {item.children && (
        <div className="sidebar-dropdown">
          {item.children.map((child: any) => {
            return (
            <React.Fragment key={child.id}>
              {child.children ? (
                <NavCollapse item={child} tab={tab} /> // Recursive call for nested collapse
              ) : (
                <NavItems item={child} tab={tab}  /> 
              )}
            </React.Fragment>
          )})}
        </div>
      )}
    </CustomCollapse>
  );
};

export default NavCollapse;