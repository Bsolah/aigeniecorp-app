//  Profile Data
interface MiniiconsType {
  id: number;
  icon: string;
  tooltip: string;
  url?: string;
}

const Miniicons: MiniiconsType[] = [
  {
    id: 1,
    icon: "solar:chat-dots-line-duotone",
    tooltip: "Genie Chat",
    url: "/id/chats",
  },
  {
    id: 2,
    icon: "solar:notebook-bookmark-line-duotone",
    tooltip: "Knowledge Base",
    url: "/id/repository",
  },
  // {
  //   id: 3,
  //   icon: "solar:palette-round-line-duotone",
  //   tooltip: "Workflow",
  //   url: "/id/workflow",
  // },
  // {
  //   id: 4,
  //   icon: "solar:tuning-square-2-line-duotone",
  //   tooltip: "Projects Management",
  //   url: "/id/project-management",
  // },
  // {
  //   id: 5,
  //   icon: "solar:chart-line-duotone",
  //   tooltip: "Analytics",
  //   url: "/id/analytics"
  // },

];

export default Miniicons;
