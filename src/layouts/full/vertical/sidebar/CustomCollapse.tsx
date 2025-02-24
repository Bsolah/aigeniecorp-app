
import { twMerge } from "tailwind-merge";
import { Switch } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "src/context/DashboardContext/DashboardContext";
import AddPopover  from "src/components/apps/popover/AddPopover"; // Adjust the import path as necessary
import MorePopover  from "src/components/apps/popover/MorePopover"; // Adjust the import path as necessary

const CustomCollapse: React.FC<{
  label: string;
  id: string;
  parentId: string;
  open: boolean;
  children: any;
  tab: any;
  selector: boolean;
  onClick: () => void;
  icon: string;
  className?: string;
}> = ({ label, open, onClick, icon, children, className, tab, id, parentId, selector }) => {

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
        className={twMerge(`flex cursor-pointer mb-1 items-center justify-between hover:rounded-sm px-1 py-[8px] gap-3 text-[15px] leading-[normal] font-normal dark:text-white text-link  ${!selector && 'hover:bg-lightprimary dark:hover:bg-lightprimary'} `, className)}
      >
        <div className="flex items-center justify-between w-full group">
          <span className="flex items-center gap-3">
            {!selector ? <span className="flex items-center space-x-3">
              <Icon icon="icon-park:right" onClick={onClick}
                className={twMerge("transform transition-transform", open ? "rotate-90" : "rotate-0")}
              />
              <Icon icon={icon} height={18} />
            </span> :
              <Switch
                checked={isParentSwitch[label]}
                onClick={() => setIsParentSwitch((prevState: any) => ({ ...prevState, [label]: !prevState[label] }))}
                className="group inline-flex h-4 w-7 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
              >
                <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-3.5" />
              </Switch>}
            <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", display: "inline-block" }} className={`flex  text-bold text-xs w-30 group-hover:w-20`}>{label}</span>
          </span>
          {tab === 'Knowledge Base' && <span className={`flex opacity-0 group-hover:opacity-100`}>
            
            <MorePopover children={<Icon className="ml-auto" icon='tabler:dots' height={18} />} type={'folder'} id={id} parentId={parentId} />
            <AddPopover children={<Icon className="ml-auto" icon='mdi:plus' height={18} />} parentId={id} />
          </span>}
        </div>
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