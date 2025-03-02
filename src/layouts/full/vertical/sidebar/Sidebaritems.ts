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
    name: "AI",
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
                name: "Chat GPT",
                tag: "oai",
                selector: true, 
                url:  "/id/chats",
              },
              {
                id: uniqueId(),
                name: "Gemini",
                tag: "gai",
                selector: true, 
                url:  "/id/chats",  
              },
              {
                id: uniqueId(),
                name: "Deepseek",
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
              }
            ],
          }

        ],
      },
      {
        heading: "Conversations",
        children: [
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
        heading: "More",
        children: [
          {
            id: uniqueId(),
            url: "/id/repository/drafts",
            name: "My Contents",
            icon: "solar:document-text-outline",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "#", //"/id/repository/drafts",
            name: "Templates (coming soon)",
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
            name: "Google (coming soon)",
            icon: "ri:google-fill",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/sharepoint",
            name: "Sharepoint (coming soon)",
            icon: "ri:windows-fill",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "/id/repository/notion",
            name: "Notion (coming soon)",
            icon: "ri:notion-fill",
            color: "text-primary",
          }
        ],
      },
    ],
  },
];

export default SidebarContent;
