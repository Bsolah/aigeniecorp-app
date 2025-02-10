
import { twMerge } from "tailwind-merge";
import { Switch } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "src/context/DashboardContext/DashboardContext";

const CustomCollapse: React.FC<{
  label: string;
  open: boolean;
  children: any;
  selector: boolean;
  onClick: () => void;
  icon: string;
  className?: string;
}> = ({ label, open, onClick, icon, children, className, selector }) => {

  const {
    isParentSwitch,
    setIsParentSwitch,
    setIsChildSwitch
  } = useContext(DashboardContext);


  useEffect(() => {
      if (isParentSwitch['External']) {
        setIsChildSwitch((prevState: any) => ({ ...prevState, ["oai"]: true, ["gai"]: true, ["dai"]: true }))
      } 
      if (isParentSwitch['Internal']) {
        setIsChildSwitch((prevState: any) => ({ ...prevState, ["knb"]: true, ["oth"]: true }))

      } 

  }, [isParentSwitch])

  return (
    <div className={twMerge("transition-all duration-300")}>
      <div
        className={twMerge("flex cursor-pointer mb-1 items-center justify-between rounded-lg px-4 py-[11px] gap-3 text-[15px] leading-[normal] font-normal text-link  hover:text-primary dark:text-white  dark:hover:text-primary", className)}
      >
        <div className="flex items-center gap-3">
          {!selector ? <Icon icon={icon} height={18} /> :
            <Switch
              checked={isParentSwitch[label]}
              onClick={() => setIsParentSwitch((prevState: any) => ({ ...prevState, [label]: !prevState[label] }))}
              className="group inline-flex h-4 w-7 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
            >
              <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-3.5" />
            </Switch>}
          <span className="truncate text-bold text-xs max-w-28"  >{label}</span>
        </div>
        <Icon icon="ri:arrow-down-s-fill" onClick={onClick}
          className={twMerge("transform transition-transform", open ? "rotate-180" : "rotate-0")}
        />
      </div>
      <div
        className={twMerge(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-screen" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { CustomCollapse }