import * as React from "react";
import { ChildItem } from "../Sidebaritems.ts";
import { Sidebar } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { DashboardContext } from "src/context/DashboardContext/DashboardContext.tsx";
import { Switch } from "@headlessui/react";
import { useContext, useState } from "react";

interface NavItemsProps {
  item: ChildItem;
}


const enabled: any = {
  "oai": false,
  "gai": false,
  "dai": false,
  "knb": false,
  "oth": false,
} 


const NavItems: React.FC<NavItemsProps> = ({ item }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  const [enable, setEnabled] = useState<{ [key: string]: boolean }>(enabled);

  const { setIsMobileSidebarOpen } = useContext(DashboardContext);
  return (
    <>
      <Sidebar.Item
        to={item.url}
        as={Link}
        onClick={() => setIsMobileSidebarOpen(false)}
        className={`${item.url == pathname
          ? "text-white bg-primary rounded-xl  hover:text-white hover:bg-primary dark:hover:text-white shadow-btnshdw active"
          : "text-link bg-transparent group/link "
          } `}
      >
        <span className="flex gap-3 align-center items-center">

          {item.selector ? (<Switch
            checked={item.tag ? enable[item.tag] : false}
            onChange={(checked) => item.tag ? setEnabled(prevState => ({ ...prevState, [item.tag as string]: checked })) : undefined}
            className="group inline-flex h-4 w-7 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
          >
            <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-3.5" />
          </Switch>) :
            <>  {item.icon ? (
              <Icon icon={item.icon} className={`${item.color}`} height={18} />
            ) : (
              <span
                className={`${item.url == pathname
                  ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]"
                  : "h-[6px] w-[6px] bg-black/40 dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"
                  } `}
              ></span>
            )}</>
          }

          <span
            className={`max-w-36 overflow-hidden`}
          >
            {t(`${item.name}`)}
          </span>

        </span>
      </Sidebar.Item>
    </>
  );
};

export default NavItems;
