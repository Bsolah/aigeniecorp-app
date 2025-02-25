
import { Icon } from "@iconify/react";
import { Button } from "flowbite-react";
// import SimpleBar from "simplebar-react";
import { Link } from "react-router";
import CardBox from "src/components/shared/CardBox";
const ColorboxData = [
  {
    bg: "primary-gradient",
    icon: "hugeicons:gitbook",
    color: "bg-primary",
    title: "Blocked AI Data Leaks",
    price: "98%",
    link: "#",
  },
  {
    bg: "warning-gradient",
    icon: "solar:recive-twice-square-linear",
    color: "bg-warning",
    title: "High-Risk Employees",
    price: "16%",
    link: "#",
  },
  {
    bg: "secondary-gradient",
    icon: "ic:outline-backpack",
    color: "bg-secondary",
    title: "Sensitive Data Attempts",
    price: "39%",
    link: "#",
  },
  {
    bg: "error-gradient",
    icon: "ic:baseline-sync-problem",
    color: "bg-error",
    title: "Behavior Change After Warning",
    price: "53%",
    link: "#",
  }
];

const ColorBoxes = () => {
  return (
    <>
      <CardBox>
        <div className="overflow-x-auto">
          {/* <SimpleBar> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ColorboxData.map((item, index) => (
                <div className="w-full" key={index}>
                  <div
                    className={`text-center px-5 py-30 rounded-tw ${item.bg}`}
                  >
                    <span
                      className={`mx-auto flex items-center justify-center  rounded-tw ${item.color}`}
                    >
                      <Icon
                        icon={item.icon}
                        className="text-white"
                        height={24}
                      />
                    </span>
                    <p className="text-ld font-normal mt-4 mb-2">
                      {item.title}
                    </p>
                    <h4 className="text-22">{item.price}</h4>
                    <Button
                      as={Link}
                      to={item.link}
                      
                     className="w-fit mx-auto mt-5 bg-white hover:bg-dark text-ld font-semibold hover:text-white shadow-sm py-1 px-1 dark:bg-darkgray dark:hover:bg-dark"
                      size="xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          {/* </SimpleBar> */}
        </div>
      </CardBox>
    </>
  );
};

export default ColorBoxes;
