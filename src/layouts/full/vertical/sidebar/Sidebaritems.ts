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
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

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
            children: [
              {
                id: uniqueId(),
                name: "Open AI",
                tag: "oai",
                selector: true, 
                url: "/#",
              },
              {
                id: uniqueId(),
                name: "Gemini AI",
                tag: "gai",
                selector: true, 
                url: "/#",
              },
              {
                id: uniqueId(),
                name: "Deepseek AI",
                tag: "dai",
                selector: true, 
                url: "/#",
              },
            ],
          },
          {
            name: "Internal",
            // icon: "solar:settings-minimalistic-line-duotone",
            description: "Sources internally",
            selector: true,
            id: uniqueId(),
            url: "/#",
            children: [
              {
                id: uniqueId(),
                name: "Knowledge Base",
                tag: "knb",
                selector: true, 
                url: "/#",
              },
              {
                id: uniqueId(),
                name: "Others",
                tag: "oth",
                selector: true, 
                url: "/#",
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
        children: [
          {
            name: "Root",
            icon: "solar:widget-add-line-duotone",
            id: uniqueId(),
            url: "/repository",
            children: [
              {
                id: uniqueId(),
                name: "Marketing",
                icon: "flat-color-icons:opened-folder",
                url: "/repository/marketing",
              },
              {
                id: uniqueId(),
                name: "Sales",
                icon: "flat-color-icons:opened-folder",
                url: "/repository/sales",
                children: [
                  {
                    id: uniqueId(),
                    name: "Sales Scripts",
                    icon: 'flat-color-icons:file',
                    url: "/repository/sales-scripts",
                  }]
              },
              {
                id: uniqueId(),
                name: "Customers",
                icon: "flat-color-icons:opened-folder",
                url: "/repository/customers",
                children: [
                  {
                    id: uniqueId(),
                    name: "Support",
                    icon: 'flat-color-icons:file',
                    url: "/repository/customers/support",
                  },
                  {
                    id: uniqueId(),
                    name: "Complaints",
                    icon: 'flat-color-icons:file',
                    url: "/repository/customers/complaints",
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        heading: "Add More",
        children: [
          {
            id: uniqueId(),
            url: "/repository/new-page",
            name: "New Page",
            icon: "solar:document-text-outline",
            color: "text-primary",
          }
        ],
      },
      {
        heading: "Integrations",
        children: [
          {
            id: uniqueId(),
            url: "/sample-page",
            name: "Google Docs",
            icon: "solar:google-docs",
            color: "text-primary",
          }
        ],
      },
    ],
  },
];

export default SidebarContent;
