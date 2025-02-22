import { Drawer, HR } from 'flowbite-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CardBox from 'src/components/shared/CardBox.tsx';
import { ChatProvider } from 'src/context/ChatContext/index.tsx';
import ChatContent from './ChatContent.tsx';
import ChatListing from './ChatListing.tsx';
import ChatMsgSent from './ChatMsgSent.tsx';

const ChatsApp = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const handleClose = () => setIsOpenChat(false);
  const chatRoomList = useSelector((state: any) => state?.chat?.data)

  console.log('send verifi ', chatRoomList)

  return (
    <>
      <ChatProvider>
        <CardBox className="p-0">
          <div className="flex">
            {/* ------------------------------------------- */}
            {/* h-[calc(100vh_-_158px)]  */}
            {/* Left Part */}
            {/* ------------------------------------------- */}
            
            {chatRoomList?.length ?
            <Drawer
              open={isOpenChat}
              onClose={handleClose}
              className="lg:relative lg:transform-none h-[calc(100vh_-_150px)] lg:bg-transparent max-w-[300px] w-full lg:z-[0] "
            >
              <ChatListing />
            </Drawer> : ""}
            {/* ------------------------------------------- */}
            {/* Right part */}
            {/* ------------------------------------------- */}
            <div className="grow w-[70%]">
              <ChatContent />
              <HR className="my-0" />
              <ChatMsgSent />
            </div>
          </div>
        </CardBox>
      </ChatProvider>
    </>
  );
};

export default ChatsApp;
