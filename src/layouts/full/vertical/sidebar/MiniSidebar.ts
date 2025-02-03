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
    icon: "solar:text-underline-cross-broken",
    tooltip: "Genie Chat",
    url: "/chats",
  },
  {
    id: 2,
    icon: "solar:mirror-left-line-duotone",
    tooltip: "Knowledge Base",
    url: "/repository",
  },
  {
    id: 3,
    icon: "solar:palette-round-line-duotone",
    tooltip: "Agents",
    url: "/agents",
  },
  {
    id: 4,
    icon: "solar:tuning-square-2-line-duotone",
    tooltip: "Projects",
    url: "/projects",
  },
  {
    id: 5,
    icon: "solar:chart-line-duotone",
    tooltip: "Analytics",
    url: "analytics"
  },

];

export default Miniicons;
