import { Drawer, HR } from 'flowbite-react';
import { useState } from 'react';
import CardBox from 'src/components/shared/CardBox.tsx';
import { ChatProvider } from 'src/context/ChatContext/index.tsx';
import ChatContent from './ChatContent.tsx';
import ChatListing from './ChatListing.tsx';
import ChatMsgSent from './ChatMsgSent.tsx';

const ChatsApp = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const handleClose = () => setIsOpenChat(false);

  return (
    <>
      <ChatProvider>
        <CardBox className="p-0 overflow-hidden">
          <div className="flex">
            {/* ------------------------------------------- */}
            {/* Left Part */}
            {/* ------------------------------------------- */}
            <Drawer
              open={isOpenChat}
              onClose={handleClose}
              className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent max-w-[350px] w-full  lg:z-[0] "
            >
              <ChatListing />
            </Drawer>
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
