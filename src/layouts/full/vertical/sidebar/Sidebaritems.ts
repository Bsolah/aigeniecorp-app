// import { getFolders } from "src/redux/slices/folderSlice";
import { uniqueId } from "lodash";
import { DocType } from "src/utils/commonFunctions";

export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  description?: string;
  selector?: boolean;
  item?: any;
  url?: any;
  color?: string;
  type?: DocType;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number | string;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  type?: DocType;
}

const SidebarContent: MenuItem[] = [


  {
    id: 1,
    name: "Conversations",
    items: [
      {
        heading: "AI Models",
        children: [
          {
            name: "External",
            // icon: "solar:home-angle-outline",
            description: "Sources from Web",
            selector: true,
            id: uniqueId(),
            url: "/#",
          },
          {
            name: "Internal",
            // icon: "solar:settings-minimalistic-line-duotone",
            description: "Sources internally",
            selector: true,
            id: uniqueId(),
            url: "/#",
          }

        ],
      },
    ],
  },
  {
    id: 2,
    name: "Repositories",
    items: [
      {
        heading: "Knowledge Base",
        children: [],
      },

      {
        heading: "Add More",
        children: [
          {
            id: uniqueId(),
            url: "/id/repository/new-page",
            name: "New Page",
            icon: "solar:document-text-outline",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/new-folder",
            name: "New Folder",
            icon: "whh:addfolderalt",
            color: "text-primary",
          }
        ],
      },
      {
        heading: "Integrations",
        children: [
          {
            id: uniqueId(),
            url: "/id/repository/google-docs",
            name: "Google Docs",
            icon: "arcticons:google-docs",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/google-sheets",
            name: "Google Sheets",
            icon: "arcticons:google-docs",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/google-slides",
            name: "Google Slides",
            icon: "arcticons:google-docs",
            color: "text-primary",
          }
        ],
      },
    ],
  },
];

export default SidebarContent;
