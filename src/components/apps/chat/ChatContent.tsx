import { Icon } from '@iconify/react';
import { Badge, Button, Drawer, HR } from 'flowbite-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
// import SimpleBar from "simplebar-react";
import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatContext } from 'src/context/ChatContext/index.tsx';
import { getSingleChatInfo } from 'src/redux/slices/chatSlice';
import { AppDispatch } from 'src/redux/store.ts';
import ChatInsideSidebar from './ChatInsideSidebar';
import user2 from '/src/assets/images/profile/user-2.jpg';

type Props = {
  onClickMobile: (event: React.MouseEvent<HTMLElement>) => void;
};
const ChatContent = ({ onClickMobile }: Props) => {
  const { selectedChat }: any = useContext(ChatContext);
  const [isRightSide, setIsRightSide] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([]);
  console.log('message', messages);

  const handleButtonClick = () => {
    setIsRightSide(!isRightSide);
  };

  // Function to scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isOpenMedia, setIsOpenMedia] = useState(false);
  const handleClose = () => setIsOpenMedia(false);
  // const [loading, setLoading] = useState(false);
  // const dispatch: AppDispatch = useDispatch();

  const getChatContents = async () => {
    setLoading(true);
    const content = await dispatch(
      getSingleChatInfo({
        id: selectedChat?.id,
      }),
    );
    setMessages(content.payload);

    // setLoading(false);
  };
  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [messages]);
  console.log(selectedChat, 'selected chat');
  useEffect(() => {
    if (selectedChat?.id && !selectedChat?.isNewChat) {
      getChatContents();
    }
  }, [selectedChat]);
  useEffect(() => {
    setMessages([]);
  }, [selectedChat?.isNewChat]);
  return (
    <div>
      {false ? (
        <div></div>
      ) : (
        <>
          <div className="px-5">
            <div>
              {selectedChat ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 p-3">
                    <Button
                      color={'lightprimary'}
                      className="btn-circle p-0 lg:hidden flex"
                      onClick={onClickMobile}
                    >
                      <Icon icon="solar:hamburger-menu-outline" height={18} />
                    </Button>
                    <div className="relative sm:min-w-12 min-w-9">
                      <img
                        src={user2}
                        height={48}
                        width={48}
                        alt="user"
                        className="rounded-full sm:h-12 sm:w-12 h-9 w-9"
                      />
                      {selectedChat?.status == 'online' ? (
                      {selectedChat?.status == 'online' ? (
                        <Badge
                          color={'success'}
                          className="p-0 h-2 w-2 absolute bottom-1 end-0"
                        ></Badge>
                      ) : selectedChat?.status == 'busy' ? (
                      ) : selectedChat?.status == 'busy' ? (
                        <Badge
                          color={'error'}
                          className="p-0 h-2 w-2 absolute bottom-1 end-0"
                        ></Badge>
                      ) : selectedChat?.status == 'away' ? (
                      ) : selectedChat?.status == 'away' ? (
                        <Badge
                          color={'warning'}
                          className="p-0 h-2 w-2 absolute bottom-1 end-0"
                        ></Badge>
                      ) : (
                        <Badge
                          color={'primary'}
                          className="p-0 h-2 w-2 absolute bottom-1 end-0"
                        ></Badge>
                      )}
                    </div>
                    <div>
                      <h5 className="text-base sm:mb-1">{selectedChat?.name}</h5>
                      <h5 className="text-base sm:mb-1">{selectedChat?.name}</h5>
                      <div className="text-sm text-ld opacity-90 line-clamp-1">
                        {selectedChat?.status}
                        {selectedChat?.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:gap-2 gap-1">
                    <div className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10">
                      <Icon
                        icon="solar:phone-rounded-linear"
                        height={25}
                        className="sm:h-10 h-5 "
                      />
                    </div>
                    <div className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10">
                      <Icon icon="solar:videocamera-outline" height={25} className="sm:h-10 h-5 " />
                    </div>
                    <div
                      className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10 xl:flex hidden"
                      onClick={handleButtonClick}
                    >
                      <HiOutlineDotsVertical size={18} className="sm:h-10 h-5 " />
                    </div>
                    <div
                      className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10 xl:hidden flex"
                      onClick={() => setIsOpenMedia(true)}
                    >
                      <HiOutlineDotsVertical size={20} className="sm:h-10 h-5 " />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <HR className="my-0" />
          <div className="flex max-h-[800px] h-[650px] ">
            <div
              className={`transition-all ${
                !isRightSide ? 'lg:w-[calc(100%_-_0px)]' : 'xl:w-[calc(100%_-_300px)] w-full'
              } `}
            >
              <div
                className={`${
                  !isRightSide ? 'border-none ' : 'lg:border-e'
                } border-ld h-full py-5 px-5`}
              >
                <div
                  className="max-h-[800px] h-[620px]"
                  style={{ flexDirection: 'column-reverse', overflowY: 'auto' }}
                >
                  <div>
                    <>
                      {messages?.length > 0 &&
                        messages
                          ?.sort(
                            (a: any, b: any) =>
                              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                          )
                          ?.map((msg: any) => (
                            <div className="flex gap-3 mb-[30px]" key={msg.id + msg.createdAt}>
                              {!(user.username === msg.senderId?.username) ? (
                                <div
                                  className="flex gap-3"
                                  style={{
                                    flexDirection: 'column',
                                  }}
                                >
                                  <div className="w-10">
                                    <img
                                      src={user2}
                                      height={40}
                                      width={40}
                                      alt="user"
                                      className="rounded-full"
                                    />
                                  </div>
                                  <div>
                                    {msg.type === 'image' ? (
                                      <img
                                        src={msg.attachments}
                                        height={150}
                                        width={150}
                                        alt="user"
                                        className="rounded-md"
                                      />
                                    ) : null}
                                  </div>

                                  <div>
                                    <div className="text-xs text-ld opacity-60 font-medium mb-1 block">
                                      {selectedChat.name},{' '}
                                      {formatDistanceToNowStrict(new Date(msg.createdAt), {
                                        addSuffix: false,
                                      })}
                                      ago
                                    </div>
                                    <div className="p-2 bg-muted dark:bg-darkmuted text-ld rounded-md">
                                      {msg.msg || msg.content}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-end w-full">
                                  <div>
                                    {msg.createdAt ? (
                                      <div className="text-xs text-ld opacity-60 font-medium mb-1 block text-end">
                                        {msg?.createdAt &&
                                          formatDistanceToNowStrict(new Date(msg?.createdAt), {
                                            addSuffix: false,
                                          })}{' '}
                                        ago
                                      </div>
                                    ) : null}
                                    {msg.type === 'text' ? (
                                      <div className="p-2 bg-lightinfo text-ld dark:bg-lightinfo rounded-md">
                                        {msg.content}
                                      </div>
                                    ) : null}
                                    {msg.type === 'image' ? (
                                      <img
                                        src={msg.msg}
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
            </div>
            {isRightSide && (
              <>
                <div
                  className={`shrink-0 ${!isRightSide ? 'max-w-[0]' : 'xl:max-w-[300px] max-w-0'}`}
                >
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
      )}
    </div>
  );
};

export default ChatContent;
