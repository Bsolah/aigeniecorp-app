import { useState, useRef, useContext, useEffect } from 'react';
import { Drawer, HR } from 'flowbite-react';
import ChatInsideSidebar from './ChatInsideSidebar.tsx';
import { formatDistanceToNowStrict } from 'date-fns';
import user2 from '/src/assets/images/profile/user-2.jpg';
import { useSelector } from 'react-redux';
import { formatChatMessage } from '../../../utils/commonFunctions.ts';
import { DashboardContext } from "src/context/DashboardContext/DashboardContext";
import { ChatContext } from 'src/context/ChatContext/index.tsx';
// import CopyableText from './CopyableText';

const ChatContent = () => {
  const [isRightSide] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { selectedChat } = useSelector((state: any) => state.chat);
  const chatRoomList = useSelector((state: any) => state.chat.data)
  const { isChildSwitch } = useContext(DashboardContext);
  const { newMessage, setNewMessage } = useContext(ChatContext);
  // const [ cloneSelectedChat, setCloneSelectedChat ] = useState<any>( JSON.parse(JSON.stringify(selectedChat)));

  const cloneSelectedChat = JSON.parse(JSON.stringify(selectedChat));
  useEffect(() => {
    // console.log('new messgae ', newMessage)
    setNewMessage('')
  }, [selectedChat])

  if (newMessage) {
    cloneSelectedChat.push(newMessage)
  }

  useEffect(() => {
    if (cloneSelectedChat) {
      scrollToBottom();
    }

  }, [cloneSelectedChat]);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const translateModelName = (obj: any) => {
    return Object.keys(obj)
      .filter(key => obj[key] === true)
      .join(', ');
  }

  const [isOpenMedia, setIsOpenMedia] = useState(false);
  const handleClose = () => setIsOpenMedia(false);

  return (
    <>
      <div className="p-5">
        <div>
          {cloneSelectedChat ? (
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2 mx-auto">
                Selected Models : ({translateModelName(isChildSwitch)})
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <HR className="my-0" />
      <div className="flex h-[calc(100vh_-_300px)] overflow-y-auto scrollbar-hide">
        {(!chatRoomList?.length || cloneSelectedChat?.length <= 1) ? <div className="m-auto text-center text-3xl">
          What can I help with?
        </div> :
          <div
            className={`transition-all ${!isRightSide ? 'lg:w-[calc(100%_-_0px)]' : 'xl:w-[calc(100%_-_300px)] w-full'
              } `}
          >
            <div
              className={`${!isRightSide ? 'border-none' : 'lg:border-e'} border-ld h-full py-5 px-5`}
            >
              <div
                className="max-h-[700px]"
                style={{ flexDirection: 'column-reverse', overflowY: 'auto' }}
              >
                <div>
                  <>
                    {cloneSelectedChat && cloneSelectedChat?.map((msg: any) => (
                      <div className="flex gap-3 mb-[30px]" key={msg.id + msg.createdAt}>
                        {!(user.username === msg?.senderId?.username) ? (
                          <div className="flex gap-3">
                            <div className="w-10">
                              <img
                                src={user2}
                                height={40}
                                width={40}
                                alt="user"
                                className="rounded-full"
                              />
                            </div>
                            {msg.type === 'text' ? (
                              <div>
                                <div className="text-xs text-ld opacity-60 font-medium mb-1 block">
                                  {cloneSelectedChat.name},{' '}
                                  {formatDistanceToNowStrict(new Date(msg.createdAt), {
                                    addSuffix: false,
                                  })}{' '}
                                  ago
                                </div>
                                <div className="p-2 bg-muted dark:bg-darkmuted text-ld rounded-md">
                                {/* <CopyableText text="This is the AI's response text." /> */}
                                  <div className='confidential-container' dangerouslySetInnerHTML={{ __html: formatChatMessage(msg.content) }} />
                                </div>
                              </div>
                            ) : null}
                            {msg.attachments ? (

                              <img
                                src={msg.attachments}
                                height={150}
                                width={150}
                                alt="user"
                                className="rounded-md"
                              />
                            ) : null}
                          </div>
                        ) : (
                          <div className="flex  justify-end w-full">
                            <div>
                              {/* {msg.timestamp ? ( */}
                              <div className="text-xs text-ld opacity-60 font-medium mb-1 block text-end">
                                {formatDistanceToNowStrict(new Date(msg.createdAt), {
                                  addSuffix: false,
                                })}{' '}
                                ago
                              </div>
                              {/* // ) : null} */}
                              {msg.type === 'text' ? (
                                <div className="p-2 bg-lightinfo text-ld dark:bg-lightinfo rounded-md">
                                  {msg.content}

                                </div>
                              ) : null}
                              {msg.attachments ? (

                                <img
                                  src={msg.attachments}
                                  height={150}
                                  width={150}
                                  alt="user"
                                  className="rounded-md"
                                />
                              ) : null}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                  <div ref={chatEndRef} />
                </div>
              </div>
            </div>
          </div>}
        {isRightSide && (
          <>
            <div className={`shrink-0 ${!isRightSide ? 'max-w-[0]' : 'xl:max-w-[300px] max-w-0'}`}>
              <ChatInsideSidebar />
            </div>
            <Drawer
              open={isOpenMedia}
              onClose={handleClose}
              className="max-w-[300px] "
              position="right"
            >
              <div>
                <ChatInsideSidebar />
              </div>
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};

export default ChatContent;
