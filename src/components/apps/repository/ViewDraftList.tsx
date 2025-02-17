
import { Badge, Table, Dropdown, Progress, Checkbox } from "flowbite-react";
import TitleCard from "src/components/shared/TitleBorderCard.tsx";
import { IconDotsVertical } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ViewDraftList() {

  const {drafts} = useSelector((state: any ) => state.article);
  const navigate = useNavigate();

  console.log('drafts  ', drafts)

  const handleClick = (id: any) => {
    navigate(`/id/repository/${id}`);
  }

  return (
    <>
    {/* Option 1
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">📂 Drafts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> */}

    <TitleCard title="My Draft Pages">
        <div className="border rounded-md border-ld overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="">
              <Table.Head>
                <Table.HeadCell className="text-base font-semibold py-3">
                  #
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Title
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Collaborators
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Progress
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3"></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder  cursor-pointer">
                {drafts?.data?.map((item: any, index: number) => (
                  <Table.Row onClick={() => handleClick(item?.id)} key={index}>
                    <Table.Cell className="whitespace-nowrap">
                      <Checkbox className="checkbox" />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <h6 className="text-sm">{item?.name}</h6>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <Badge
                        color={`lightprimary`}
                        className="capitalize "
                        // icon={() => (
                        //   <item.statusicon size={15} className="me-1" />
                        // )}
                      >
                        {"Reviewed"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.avatar}
                          alt="icon"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="truncat line-clamp-2 max-w-56">
                          <h6 className="text-base">{item.access}</h6>
                          <p className="text-sm text-bodytext">{item.access}</p>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="whitespace-nowrap">
                      <div className="text-bodytext text-sm flex items-center gap-3">
                        <div className="w-full">
                          <Progress
                            progress={80}
                            className="w-full"
                            color="primary"
                            size={"sm"}
                          />
                        </div>
                        {80}%
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <IconDotsVertical size={22} />
                          </span>
                        )}
                      >
                        {/* {tableActionData.map((items, index1) => (
                          <Dropdown.Item key={index1} className="flex gap-3">
                            <Icon icon={`${items.icon}`} height={18} />
                            <span>{items.listtitle}</span>
                          </Dropdown.Item>
                        ))} */}
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </TitleCard>
    </>
  );
}