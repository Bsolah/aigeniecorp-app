import ChatsApp from 'src/components/apps/chat/index.tsx';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp.tsx';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Chat',
  },
];
const ChatPage = () => {
  return (
    <>
      <BreadcrumbComp title="Chat App" items={BCrumb} />
      <ChatsApp />
    </>
  );
};

export default ChatPage;
