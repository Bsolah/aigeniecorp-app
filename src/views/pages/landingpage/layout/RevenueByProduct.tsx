
import { useState } from "react";
import CardBox from "../../../../components/shared/CardBox";
import { Badge, Select, Table } from "flowbite-react";
import { Icon } from "@iconify/react";
import React from "react";
import product1 from "/src/assets/images/products/dash-prd-1.jpg";
import product2 from "/src/assets/images/products/dash-prd-2.jpg";
import product3 from "/src/assets/images/products/dash-prd-3.jpg";
import product4 from "/src/assets/images/products/dash-prd-4.jpg";


import SimpleBar from "simplebar-react";

const RevenueByProduct = () => {
  const dropdownItems = ["Sep 2024", "Oct 2024", "Nov 2024"];
  // Custom Tab
  const [activeTab, setActiveTab] = useState("App");
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const ProductTableData = [
    {
      img: product1,
      project: "Procedure Alpha",
      name: "Jason Roy",
      progrsss: "73",
      statuscolor: "lightwarning",
      statustextcolor: "text-warning",
      statustext: "Approved",
      money: "Jan 25th, 2025",
    },
    {
      img: product2,
      project: "Procedure Beta",
      name: "Mathew Flintoff",
      progrsss: "80",
      statuscolor: "lightsecondary",
      statustextcolor: "text-secondary",
      statustext: "Pending",
      money: "Feb 2nd, 2025",
    },
    {
      img: product3,
      project: "Procedure Delta",
      name: "Anil Kumar",
      progrsss: "47",
      statuscolor: "lightsuccess",
      statustextcolor: "text-success",
      statustext: "Published",
      money: "Dec 31st, 2024",
    },
    {
      img: product4,
      project: "Procedure Gamma",
      name: "George Cruize",
      progrsss: "21",
      statuscolor: "lighterror",
      statustextcolor: "text-error",
      statustext: "Rejected",
      money: "Jan 17th, 2025",
    },
  ];

  const ProductTableData2 = [
    {
      img: product2,
      project: "Procedure Epsilon",
      name: "Mathew Flintoff",
      progrsss: "100",
      statuscolor: "lightsecondary",
      statustextcolor: "text-secondary",
      statustext: "Pending",
      money: "Feb 11th, 2025",
    },
    {
      img: product3,
      project: "Procedure Zeta",
      name: "Anil Kumar",
      progrsss: "73",
      statuscolor: "lightsuccess",
      statustextcolor: "text-success",
      statustext: "Published",
      money: "Jan 4th, 2025",
    },
    {
      img: product1,
      project: "Procedure Lambda",
      name: "Jason Roy",
      progrsss: "73",
      statuscolor: "lightwarning",
      statustextcolor: "text-warning",
      statustext: "Approved",
      money: "Feb 17th, 2025",
    },

    {
      img: product4,
      project: "Procedure Eta",
      name: "George Cruize",
      progrsss: "73",
      statuscolor: "lighterror",
      statustextcolor: "text-error",
      statustext: "Rejected",
      money: "Aug 15th, 2024",
    },
  ];

  return (
    <>
      <CardBox className="pb-3">
        <div className="sm:flex justify-between align-baseline">
          <div>
            <h5 className="card-title">Knowledge Hub Overview by Team</h5>
          </div>
          <Select required className="form-control select-md w-fit sm:my-0 my-4">
            {dropdownItems.map((items, index) => {
              return <option key={index}>{items}</option>;
            })}
          </Select>
        </div>
        {/* Tabs */}
        <div className="overflow-x-auto">
          <SimpleBar>
            <div className="flex gap-4">
              <div
                onClick={() => handleTabClick("App")}
                className={`py-3 px-6 rounded-tw cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary ${activeTab == "App"
                  ? "text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis"
                  : "dark:text-white"
                  }`}
              >
                <Icon
                  icon="solar:widget-linear"
                  className={`${activeTab == "App" ? "opacity-100" : "opacity-50"
                    }`}
                  height={16}
                />
                Product
              </div>
              <div
                onClick={() => handleTabClick("Mobile")}
                className={`py-3 px-6 rounded-tw cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary ${activeTab == "Mobile"
                  ? "text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis"
                  : "dark:text-white"
                  }`}
              >
                <Icon
                  icon="solar:smartphone-line-duotone"
                  className={`${activeTab == "Mobile" ? "opacity-100" : "opacity-50"
                    }`}
                  height={16}
                />{" "}
                Support
              </div>
              <div
                onClick={() => handleTabClick("SasS")}
                className={`py-3 px-6 rounded-tw cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark  hover:bg-lightprimary dark:hover:bg-lightprimary ${activeTab == "SasS"
                  ? "text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis"
                  : "dark:text-white"
                  }`}
              >
                <Icon
                  icon="solar:calculator-linear"
                  className={`${activeTab == "SasS" ? "opacity-100" : "opacity-50"
                    }`}
                  height={16}
                />{" "}
                Sales
              </div>
              <div
                onClick={() => handleTabClick("Others")}
                className={`py-3 px-6 rounded-tw cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary  ${activeTab == "Others"
                  ? "text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis"
                  : "dark:text-white"
                  }`}
              >
                <Icon
                  icon="solar:folder-open-outline"
                  className={`${activeTab == "Others" ? "opacity-100" : "opacity-50"
                    }`}
                  height={16}
                />{" "}
                HR
              </div>
            </div>
          </SimpleBar>
        </div>

        {/* Tabs Content */}
        {activeTab === "App" && (
          <>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head className="border-b border-bordergray dark:border-darkborder">
                  <Table.HeadCell className="py-2 px-3  ps-0 text-ld font-normal">
                    Article
                  </Table.HeadCell>
                  <Table.HeadCell className="text-ld font-normal">
                    Monthly Views
                  </Table.HeadCell>
                  <Table.HeadCell className="text-ld font-normal">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell className="text-ld font-normal">
                    Last Edit
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-bordergray dark:divide-darkborder ">
                  {ProductTableData.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap ps-0">
                        <div className="flex gap-3 items-center">
                          <img
                            src={item.img}
                            alt="icon"
                            className="h-12 w-12 rounded-tw"
                          />
                          <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                            <h6 className="text-sm">{item.project}</h6>
                            <p className="">{item.name}</p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap ">
                        <p className="text-sm">{item.progrsss}</p>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap ">
                        <Badge
                          color={item.statuscolor}
                          className={`${item.statustextcolor}`}
                        >
                          {item.statustext}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap ">
                        <p className="text-ld">{item.money}</p>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </>
        )}
        {activeTab === "Mobile" && (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head className="border-b border-bordergray dark:border-darkborder">
                <Table.HeadCell className="py-2 px-3  ps-0 text-ld font-normal">
                  Article
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Monthly Views
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Last Edit
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-bordergray dark:divide-darkborder ">
                {ProductTableData2.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-0">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.img}
                          alt="icon"
                          className="h-12 w-12 rounded-tw"
                        />
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.project}</h6>
                          <p className="">{item.name}</p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <p className="text-sm">{item.progrsss}</p>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <Badge
                        color={item.statuscolor}
                        className={`${item.statustextcolor}`}
                      >
                        {item.statustext}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <p className="text-ld">{item.money}</p>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
        {activeTab === "SasS" && (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head className="border-b border-bordergray dark:border-darkborder">
                <Table.HeadCell className="py-2 px-3  ps-0 text-ld font-normal">
                  Article
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Monthly Views
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Last Edit
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-bordergray dark:divide-darkborder ">
                {ProductTableData.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-0">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.img}
                          alt="icon"
                          className="h-12 w-12 rounded-tw"
                        />
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.project}</h6>
                          <p className="">{item.name}</p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <p className="text-sm">{item.progrsss}</p>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <Badge
                        color={item.statuscolor}
                        className={`${item.statustextcolor}`}
                      >
                        {item.statustext}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <p className="text-ld">{item.money}</p>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
        {activeTab === "Others" && (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head className="border-b border-bordergray dark:border-darkborder">
                <Table.HeadCell className="py-2 px-3  ps-0 text-ld font-normal">
                  Article
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Monthly Views
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="text-ld font-normal">
                  Last Edit
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-bordergray dark:divide-darkborder ">
                {ProductTableData2.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-0">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.img}
                          alt="icon"
                          className="h-12 w-12 rounded-tw"
                        />
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.project}</h6>
                          <p className="">{item.name}</p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <p className="text-sm">{item.progrsss}</p>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <Badge
                        color={item.statuscolor}
                        className={`${item.statustextcolor}`}
                      >
                        {item.statustext}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ">
                      <p className="text-ld">{item.money}</p>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </CardBox>
    </>
  );
};

export default RevenueByProduct;
