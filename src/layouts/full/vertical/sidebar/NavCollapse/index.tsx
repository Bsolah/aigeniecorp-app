
import  { useEffect, useState } from "react";
import { ChildItem } from "../Sidebaritems.ts";
import NavItems from "../NavItems/index.tsx";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { CustomCollapse } from "../CustomCollapse.tsx";
import React from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "src/redux/store";
// import { getArticleById } from "src/redux/slices/articleSlice.ts";

interface NavCollapseProps {
  item: ChildItem;
}

const NavCollapse: React.FC<NavCollapseProps> = ({ item }: any) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine if any child matches the current path
  const activeDD = item.children.find((t: { url: string }) => t.url === pathname);
  // const dispatch = useDispatch<AppDispatch>();  

  const { t, i18n } = useTranslation();
  const [translatedLabel, setTranslatedLabel] = useState<string | null>(null);

  // Manage open/close state for the collapse
  const [isOpen, setIsOpen] = useState<boolean>(!activeDD);

  useEffect(() => {
    const loadTranslation = async () => {
      const label = t(`${item.name}`);
      setTranslatedLabel(label);
    };
    loadTranslation();
  }, [i18n.language, item.name, t]);

  // Toggle the collapse
  const handleToggle = () => {
    setIsOpen((prev) => !prev);

  };

  return (
    <CustomCollapse
      label={translatedLabel || `${item.name}`}
      open={isOpen}
      onClick={handleToggle}
      icon={item.icon} 
      selector={item.selector}
      className={
        Boolean(activeDD)
          ? "!text-white bg-primary rounded-xl hover:bg-primary hover:text-white shadow-btnshdw"
          : "rounded-xl dark:text-white/80 hover:text-primary"
      }
    >
      {/* Render child items */}
      {item.children && (
        <div className="sidebar-dropdown">
          {item.children.map((child: any) => (
            <React.Fragment key={child.id}>
              {child.children ? (
                <NavCollapse item={child} /> // Recursive call for nested collapse
              ) : (
                <NavItems item={child} /> 
              )}
            </React.Fragment>
          ))}
        </div> 
      )}
    </CustomCollapse>
  );
};

export default NavCollapse;
