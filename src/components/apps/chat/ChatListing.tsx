import * as React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Badge, Dropdown, TextInput, Label } from "flowbite-react";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import { last } from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
// import * as SimpleBar from "simplebar-react";
import { ChatContext, ChatsType } from "src/context/ChatContext/index.tsx";
import { useSelector } from "react-redux"
import profileImg from "/src/assets/images/profile/user-1.jpg"
import user2 from '/src/assets/images/profile/user-2.jpg';


const ChatListing = () => {

  const { user } = useSelector((state: any) => state.auth);

  const DropdownAction = [
    {
      icon: "solar:settings-outline",
      listtitle: "Setting",
      divider: true,
    },
    {
      icon: "solar:question-circle-outline",
      listtitle: "Help and feedback",
      divider: false,
    },
    {
      icon: "solar:logout-2-outline",
      listtitle: "Sign Out",
      divider: false,
    },
  ];
  const lastActivity = (chat: ChatsType) => last(chat.messages)?.createdAt;

  const getDetails = (conversation: ChatsType) => {
    let displayText = "";

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? "You: " : "";
      const message =
        lastMessage.type === "image" ? "Sent a photo" : lastMessage.msg;
      displayText = `${sender}${message}`;
    }

    return displayText;
  };
  const {
    chatData,
    chatSearch,
    setChatSearch,
    setSelectedChat,
    setActiveChatId,
    activeChatId,
  } = useContext(ChatContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatSearch(event.target.value);
  };

  const filteredChats = chatData?.filter((chat: any) =>
    chat.name.toLowerCase().includes(chatSearch.toLowerCase())
  );

  const agentChats = filteredChats?.filter((item: any) => item.name === 'Genie Bot');
  const nonAgentChats = filteredChats?.filter((item: any) => item.name !== 'Genie Bot');


  const handleChatSelect = (chat: ChatsType) => {
    const chatId = chat.id;
    // typeof chat.id === "string" ? parseInt(chat.id) : chat.id;
    setSelectedChat(chat);
    setActiveChatId(chatId);
  };

  const chatListMapping = (arrItems: any) => {

    const isAgent = arrItems?.find((item: any) => item.name === 'Genie Bot');

    return <>
      <Label className="flex justify-start h-8 p-2 bg-lightprimary text-ld dark:bg-lightprimary">{isAgent ? 'Agents' : 'Employees'}</Label>
      {arrItems?.map((chat: any) => (
        <div
          key={chat.id}
          className={`cursor-pointer py-4 px-6 gap-0 flex justify-between group bg-hover ${activeChatId === chat.id
            ? "bg-lighthover dark:bg-darkmuted"
            : "initial"
            }`}
          onClick={() => handleChatSelect(chat)}
        >
          <div className="flex items-center gap-3 max-w-[235px] w-full">
            <div className="relative min-w-12">
              <img
                src={chat.thumb ?? user2}
                height={48}
                width={48}
                alt="user"
                className="rounded-full"
              />
              {chat.status == "online" ? (
                <Badge
                  color={"success"}
                  className="p-0 h-2 w-2 absolute bottom-1 end-0"
                ></Badge>
              ) : chat.status == "busy" ? (
                <Badge
                  color={"error"}
                  className="p-0 h-2 w-2 absolute bottom-1 end-0"
                ></Badge>
              ) : chat.status == "away" ? (
                <Badge
                  color={"warning"}
                  className="p-0 h-2 w-2 absolute bottom-1 end-0"
                ></Badge>
              ) : (
                <Badge
                  color={"primary"}
                  className="p-0 h-2 w-2 absolute bottom-1 end-0"
                ></Badge>
              )}
            </div>
            <div>
              <h5 className="text-sm mb-1">{chat.name}</h5>
              <div className="text-sm text-ld opacity-90 line-clamp-1">
                {getDetails(chat)}
              </div>
            </div>
          </div>
          <div className="text-xs pt-1">
            {formatDistanceToNowStrict(new Date(lastActivity(chat)), {
              addSuffix: false,
            })}
            {chat.name === 'Genie Bot' &&
              <div className="pt-1 text-sm text-ld opacity-90 line-clamp-1 flex justify-end" >
                <Icon icon="ri:chat-new-fill" height="20" />
              </div>}
          </div>
        </div>
      ))} </>
  }

  return (
    <>
      <div className="left-part  w-full px-0 ">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profileImg}
                height={56}
                width={56}
                alt="user"
                className="rounded-full"
              />
              <Badge
                color={"success"}
                className="p-0 h-2 w-2 absolute bottom-1 end-0"
              ></Badge>
            </div>

            <div>
              <h5 className="text-sm mb-1">{user.username}</h5>
              <p className="text-darklink dark:text-bodytext text-xs">Marketing Director</p>
            </div>
          </div>
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer ">
                <HiOutlineDotsVertical size={22} />
              </span>
            )}
          >
            {DropdownAction.map((items, index) => (
              <React.Fragment key={index}>
                <Dropdown.Item className="flex gap-3">
                  <Icon icon={`${items.icon}`} height={18} />
                  <span>{items.listtitle}</span>
                </Dropdown.Item>
                {items.divider == true ? <Dropdown.Divider /> : null}
              </React.Fragment>
            ))}
          </Dropdown>
        </div>

        <div className="px-6">
          {/* Search box  */}
          <div className="flex gap-3 bg-white dark:bg-transparent  py-5 items-center ">
            <TextInput
              id="search"
              placeholder="Search contacts"
              onChange={handleSearchChange}
              value={chatSearch}
              className="form-control w-full"
              sizing="md"
              required
              icon={() => (
                <Icon icon="solar:magnifer-line-duotone" height={18} />
              )}
            />
          </div>

          {/* Sorting */}
          <div className="sorting mb-3">
            <Dropdown label="Recent Chats">
              <Dropdown.Item>Sort by Time</Dropdown.Item>
              <Dropdown.Item>Sort by Unread</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sort by Pinned</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        {/* Listing */}
        <div className="max-h-[600px] h-[calc(100vh_-_100px)]">
          {chatListMapping(agentChats)}
          {chatListMapping(nonAgentChats)}
        </div>
      </div>
    </>
  );
};
export default ChatListing;
