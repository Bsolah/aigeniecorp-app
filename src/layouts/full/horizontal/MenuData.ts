import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: "solar:layers-line-duotone",
    href: "",
    column:1,
    children: [
      {
        id: uniqueId(),
        title: "External",
        icon: "solar:home-angle-outline",
        href: "#",
      },
      {
        id: uniqueId(),
        title: "Internal",
        icon: "solar:settings-minimalistic-line-duotone",
        href: "#",
      },
    ],
  },

];
export default Menuitems;
