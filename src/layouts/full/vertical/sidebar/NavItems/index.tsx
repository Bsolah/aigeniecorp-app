import * as React from "react";
import { ChildItem } from "../Sidebaritems.ts";
import { Sidebar } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { DashboardContext } from "src/context/DashboardContext/DashboardContext.tsx";
import { Switch } from "@headlessui/react";
import { useContext } from "react";
import dispatch from "src/redux/store.ts";
import { getArticleById, getDraftArticles } from "src/redux/slices/articleSlice.ts";

interface NavItemsProps {
  item: ChildItem;
  tab?: string;
}

const NavItems: React.FC<NavItemsProps> = ({ item, tab }: any) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  const {
    isChildSwitch,
    setIsChildSwitch
  } = useContext(DashboardContext);

  const { setIsMobileSidebarOpen } = useContext(DashboardContext);

  const handleClick = () => {
    // setIsMobileSidebarOpen(false);


    if (tab === 'Knowledge Base') {
      dispatch(getArticleById(item?.id))
    }
    if (tab === 'Add More') {
      dispatch(getDraftArticles())
    }
  }

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
            checked={item.tag ? isChildSwitch[item.tag] : false}
            onChange={(checked) => item.tag ? setIsChildSwitch((prevState: any) => ({ ...prevState, [item.tag as string]: checked })) : undefined}
            className="group inline-flex h-4 w-7 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
          >
            <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-3.5" />
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

          <span onClick={handleClick}
            className={`max-w-36 overflow-hidden text-xs`}
          >
            {t(`${item.name}`)}
          </span>

        </span>
      </Sidebar.Item>
    </>
  );
};

export default NavItems;