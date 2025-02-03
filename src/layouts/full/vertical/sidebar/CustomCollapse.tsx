
import { twMerge } from "tailwind-merge";
import { Switch } from "@headlessui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const CustomCollapse: React.FC<{
  label: string;
  open: boolean;
  children: any;
  selector: boolean;
  onClick: () => void;
  icon: string;
  className?: string;
}> = ({ label, open, onClick, icon, children, className, selector }) => {
  return (
    <div className={twMerge("transition-all duration-300")}>
      <div
        className={twMerge("flex cursor-pointer mb-1 items-center justify-between rounded-lg px-4 py-[11px] gap-3 text-[15px] leading-[normal] font-normal text-link  hover:text-primary dark:text-white  dark:hover:text-primary", className)}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {!selector ? <Icon icon={icon} height={18} /> :
          <Switch
          checked={true}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch> }
          <span className="truncate max-w-28"  >{label}</span>
        </div>
        <HiOutlineChevronDown
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