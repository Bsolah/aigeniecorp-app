import { Badge, Label } from "flowbite-react";
import { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { formatDistanceToNowStrict } from "date-fns";
import { ChatContext, ChatsType } from "src/context/ChatContext/index.tsx";
import { useSelector, useDispatch } from "react-redux"
import profileImg from "/src/assets/images/profile/user-1.jpg"
import user2 from '/src/assets/images/profile/user-2.jpg';
import { getChatByRoomId, startNewChat, deleteChatByRoomId } from "src/redux/slices/chatSlice";
import { AppDispatch } from "src/redux/store";
import { MessageType } from "src/types/apps/chat";

const ChatListing = () => {

  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedChat, data, loading } = useSelector((state: any) => state.chat);
  // console.log('selected Chat ', selected)
  // const { data, loading } = useSelector((state: any) => state.chatRoom);

  if (loading || !data) {
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500">Loading...</div>
    </div>
  }

  const {
    // chatData,
    chatSearch,
    setActiveChatId,
    activeChatId,
  } = useContext(ChatContext);

  const filteredChats = data?.filter((chat: any) =>
    chat.name.toLowerCase().includes(chatSearch.toLowerCase())
  );

  useEffect(() => {

    const defaultSelectedChat = filteredChats[0]?.id;
    dispatch(getChatByRoomId({ chatRoomId: defaultSelectedChat }))
    setActiveChatId(defaultSelectedChat);
  }, [])

  useEffect(() => {
    const defaultSelectedChat = filteredChats[0]?.id;
    dispatch(getChatByRoomId({ chatRoomId: defaultSelectedChat }))
    setActiveChatId(defaultSelectedChat);
  }, [user])


  const agentChats = filteredChats?.filter((item: any) => item.type === 'Agent');
  // const nonAgentChats = filteredChats?.filter((item: any) => item.type !== 'Agent');

  const handleChatSelect = (chat: ChatsType) => {
    const chatId = chat?.id;
    dispatch(getChatByRoomId({ chatRoomId: chatId }))
    setActiveChatId(chatId);
  };

  const handleNewBotChat = () => {
    dispatch(startNewChat())
  }
  const handleDeleteChatRoom = (chat: MessageType) => {
    dispatch(deleteChatByRoomId({ room: chat.id }))
  }

  const chatListMapping = (arrItems: any) => {

    const isAgent = arrItems?.find((item: any) => item.type === 'Agent');
    let newArrItems = arrItems;
    if (isAgent) {
      const cbndAgentById = agentChats?.reduce((acc: any, obj: any) => {

        const existingObj = acc.find((item: any) => item.userId === obj.userId);



        // If the id doesn't exist in the accumulator, initialize it
        if (existingObj) {
          existingObj.lastMessage.push({ content: obj.lastMessageContent, date: obj.lastMessageDate, id: obj.id }); // [{content: item.lastMessageContent, date: item.lastMessageDate, id: item.id}],
        } else {

          // Push the item to the corresponding id group
          acc.push({ ...obj, lastMessage: [{ content: obj.lastMessageContent, date: obj.lastMessageDate, id: obj.id }] })
        }

        return acc;
      }, [])

      newArrItems = cbndAgentById;
    }


    return <>
      {/* <Label className="flex justify-start h-8 mt-4 p-2 bg-lightprimary text-ld dark:bg-lightprimary">{isAgent ? 'Agents' : ''}</Label> */}
      {newArrItems?.map((chat: any) => (<>
        <div
          key={`${chat.id}/${chat.lastMessageDate}-parent`}
          className={`cursor-pointer py-4 px-3 gap-0 flex justify-between group bg-hover ${activeChatId === chat.id
            ? "bg-lighthover dark:bg-darkmuted"
            : "initial"
            }`}
          onClick={() => isAgent ? () => { } : handleChatSelect(chat)}
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
                {!isAgent && chat.lastMessageContent}
              </div>
            </div>
          </div>
          <div className="text-xs pt-1">
            {!isAgent && formatDistanceToNowStrict(new Date(chat.lastMessageDate), {
              addSuffix: false,
            })}
            {isAgent &&
              <div onClick={() => handleNewBotChat()} className="pt-1 text-sm text-ld opacity-90 line-clamp-1 flex justify-end" >
                <Icon icon="ri:chat-new-fill" height="20" />
              </div>}
          </div>
          {/* } */}
        </div>
        {isAgent && chat.lastMessage.map((item: any) => {
          return (<div key={`${item.id}-child`} onClick={() => handleChatSelect(item)} className={`flex justify-between p-2 text-xs text-ld opacity-90 cursor-pointer px-1 ${activeChatId === item?.id
            ? "bg-lightsecondary dark:bg-lightsecondary"
            : "initial"} hover:bg-lightsecondary hover:dark:bg-lightsecondary bg-gray-50 border-gray-100 border-t  delete-icon-container`}>
            <div className="truncated ">
              {item?.content}
            </div>
            {chat.lastMessage.length > 1 && (selectedChat && selectedChat[0]?.chatRoomId !== item.id) && <div onClick={() => handleDeleteChatRoom(item)} className="delete-icon" >
              <Icon color="text-error" icon="ri:delete-bin-6-line" height="16" />
            </div>}
            <div>
              {formatDistanceToNowStrict(new Date(item.date), {
                addSuffix: false,
              }).replace('second', 'sec').replace('minute', 'min')}
            </div>
          </div>)
        })}
      </>
      ))} </>
  }

  return (
    <>
      <div className="w-full px-0 ">
        {/* <div className="flex justify-between items-center px-6">
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
              <p className="text-darklink dark:text-bodytext text-xs">{user?.role}</p>
            </div>
          </div>
        </div> */}

        {/* Listing */}
        <div className="max-h-[1250px] h-[calc(100vh_-_270px)]">
          {chatListMapping(agentChats)}
          {/* {chatListMapping(nonAgentChats)} */}
        </div>
      </div>
    </>
  );
};
export default ChatListing;
