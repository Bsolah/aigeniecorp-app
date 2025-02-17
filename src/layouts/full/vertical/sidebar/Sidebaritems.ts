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
  tag?: string;
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
  tag?: string;
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
            url:  "/id/chats",
            children: [
              {
                id: uniqueId(),
                name: "Open AI",
                tag: "oai",
                selector: true, 
                url:  "/id/chats",
              },
              {
                id: uniqueId(),
                name: "Gemini AI",
                tag: "gai",
                selector: true, 
                url:  "/id/chats",
              },
              {
                id: uniqueId(),
                name: "Deepseek AI",
                tag: "dai",
                selector: true, 
                url:  "/id/chats",
              },
            ],
          },
          {
            name: "Internal",
            // icon: "solar:settings-minimalistic-line-duotone",
            description: "Sources internally",
            selector: true,
            id: uniqueId(),
            url:  "/id/chats",
            children: [
              {
                id: uniqueId(),
                name: "Company Test AI",
                tag: "knb",
                selector: true, 
                url: "/id/chats",
              },
              {
                id: uniqueId(),
                name: "Slack",
                tag: "oth",
                selector: true, 
                url: "/id/chats",
              }
            ],
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
            url: "/id/repository/drafts",
            name: "Drafts",
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
            url: "/id/repository/google-drive",
            name: "Google Drive",
            icon: "ri:google-fill",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/sharepoint",
            name: "Sharepoint",
            icon: "ri:windows-fill",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/notion",
            name: "Notion",
            icon: "ri:notion-fill",
            color: "text-primary",
          }
        ],
      },
    ],
  },
];

export default SidebarContent;
