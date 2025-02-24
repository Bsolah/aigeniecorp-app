
import { Badge, Table, Dropdown, Progress, Checkbox } from "flowbite-react";
import TitleCard from "src/components/shared/TitleBorderCard.tsx";
import { IconDotsVertical } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyContent() {

  const {drafts} = useSelector((state: any ) => state.article);
  const navigate = useNavigate();

  const handleClick = (id: any) => {
    navigate(`/id/repository/${id}`);
  }

  return (
    <>
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
                      >
                        {"Reviewed"}
                      </Badge>
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