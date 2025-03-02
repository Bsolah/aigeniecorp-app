
import { twMerge } from "tailwind-merge";
import { Switch } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "src/context/DashboardContext/DashboardContext";
import AddPopover  from "src/components/apps/popover/AddPopover"; // Adjust the import path as necessary
import MorePopover  from "src/components/apps/popover/MorePopover"; // Adjust the import path as necessary
import dispatch from "src/redux/store";
import { getSubFolders, updateFolder } from "src/redux/slices/folderSlice";

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
  const [updateLabel, setUpdateLabel] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(label);


  useEffect(() => {
    if (isParentSwitch['External']) {
      setIsChildSwitch((prevState: any) => ({ ...prevState, ["oai"]: true, ["gai"]: true, ["dai"]: true }))
    }
    if (isParentSwitch['Internal']) {
      setIsChildSwitch((prevState: any) => ({ ...prevState, ["knb"]: true, ["oth"]: true }))

    }

  }, [isParentSwitch])

  console.log('id ', id, 'label ', label, 'parentId ', parentId)

  const handleKeyDown = (event: any) => {
    // Check if Enter key is pressed
    if (event.key === 'Enter') {
      // Dispatch the input value to Redux when Enter is pressed
      dispatch(updateFolder({ id: id, name: event.target.value }));
      dispatch(getSubFolders({ id: parentId }));
      // Optionally, reset input after dispatching
      setUpdateLabel(false);
    }
  };

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
            {!updateLabel &&  <Icon icon={icon} height={18} />}
            </span> :
              <Switch
                checked={isParentSwitch[label]}
                onClick={() => setIsParentSwitch((prevState: any) => ({ ...prevState, [label]: !prevState[label] }))}
                className="group inline-flex h-4 w-7 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
              >
                <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-3.5" />
              </Switch>}

              {updateLabel ? <input type="text" onKeyDown={handleKeyDown} onChange={(e: any) => setInputValue(e.target.value)} style={{ backgroundColor: 'transparent', borderWidth: 1 }} className="flex  text-bold text-xs w-30 focus:bg-transparent focus:ring-0 focus:ring-transparent rounded-md p-1" value={inputValue} /> :
              <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", display: "inline-block" }} className={`flex  text-bold text-xs w-30 group-hover:w-20`}>{label}</span>
            }
          </span>
          {tab === 'Knowledge Base' &&  <span className={`flex opacity-0 group-hover:opacity-100`}>
            
           {parentId !== '123'  && <MorePopover children={<Icon className="ml-auto" icon='tabler:dots' height={18} />} type={'folder'} onRename={() => setUpdateLabel(true)} id={id} parentId={parentId} />}
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