import * as React from "react";
import { ChildItem } from "../Sidebaritems.ts";
import { Sidebar } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { DashboardContext } from "src/context/DashboardContext/DashboardContext.tsx";
import { Switch } from "@headlessui/react";
import { useContext, useState } from "react";
import dispatch from "src/redux/store.ts";
import { getArticleById, getDraftArticles, updateArticle } from "src/redux/slices/articleSlice.ts";
import MorePopover from "src/components/apps/popover/MorePopover"; // Adjust the import path as necessary
import { getSubFolders } from "src/redux/slices/folderSlice.ts";


interface NavItemsProps {
  item: ChildItem;
  tab?: any;
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

  const [updateLabel, setUpdateLabel] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(item?.name);

  const handleClick = () => {
    // setIsMobileSidebarOpen(false);

    if (tab === 'Knowledge Base') {
      dispatch(getArticleById(item?.id))
    }
    if (tab === 'More') {
      dispatch(getDraftArticles())
    }
  }

  const handleKeyDown = (event: any) => {
    // Check if Enter key is pressed
    if (event.key === 'Enter') {
      // Dispatch the input value to Redux when Enter is pressed
      dispatch(updateArticle({ id: item?.id, name: event.target.value }));
      dispatch(getSubFolders({ id: item?.parentId }));
      // Optionally, reset input after dispatching
      setUpdateLabel(false);
    }
  };

  return (
    <>
      <Sidebar.Item
        to={item.url}
        as={Link}
        style={{ padding: "8px 0 8px 32px" }}
        onClick={() => setIsMobileSidebarOpen(false)}
        className={`${item.url == pathname
          ? "bg-lightprimary shadow-btnshdw active"
          : "text-link bg-transparent group/link "
          } rounded-sm hover:bg-lightprimary`}
      >
        <span className="flex align-center items-center group w-full justify-between">

          <span className="flex gap-3">
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
                    ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-lightprimary !bg-lightprimary h-[6px] w-[6px]"
                    : "h-[6px] w-[6px] bg-black/40 dark:bg-white rounded-full mx-1.5 group-hover/link:bg-lightprimary"
                    } `}
                ></span>
              )}</>
            }

            {updateLabel ?
              <input type="text" onKeyDown={handleKeyDown} onChange={(e: any) => setInputValue(e.target.value)} style={{ backgroundColor: 'transparent', borderWidth: 1 }} className="flex  text-bold text-xs w-30 focus:bg-transparent focus:ring-0 focus:ring-transparent rounded-md p-1" value={inputValue} /> :

              <span onClick={handleClick}
                style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", display: "inline-block" }}
                className={`w-34  group-hover:w-28 text-xs`}
              >
                {t(`${item.name}`)}
              </span>}
          </span>
          {tab === 'Knowledge Base' && <span className={`flex opacity-0 group-hover:opacity-100`}>
            <MorePopover children={<Icon className="ml-auto" icon='tabler:dots' height={18} />} onRename={() => setUpdateLabel(true)} parentId={item?.parentId} id={item?.id} />
          </span>}

        </span>
      </Sidebar.Item>
    </>
  );
};

export default NavItems;