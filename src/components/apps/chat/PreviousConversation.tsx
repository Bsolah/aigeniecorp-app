import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import API from 'src/api/api';
import { ChatContext, ChatsType } from 'src/context/ChatContext';
import { getChatsByUser } from 'src/redux/slices/chatRoomSlice';
import { AppDispatch } from 'src/redux/store';

function PreviousConversation({ data }: { data: any }) {
  const { setSelectedChat, setActiveChatId, activeChatId } = useContext(ChatContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleChatSelect = (chat: ChatsType) => {
    const chatId = chat.id;
    // typeof chat.id === "string" ? parseInt(chat.id) : chat.id;
    setSelectedChat(chat);
    setActiveChatId(chatId);
  };
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteConversation = async () => {
    try {
      console.log(data);
      const res = await API.delete(`/api/chat/delete/${data?.id}`);
      dispatch(getChatsByUser());
      setShowConfirm(false);
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };
  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    handleDeleteConversation();
    // Add delete logic here
    console.log('Conversation deleted');
  };

  return (
    <div>
      <div
        onClick={() => {
          handleChatSelect(data);
        }}
        className={`px-6 py-3 rounded-sm  ${
          activeChatId === data?.id && 'bg-[#dddd]'
        } hover:bg-[#dddd] group  cursor-pointer  `}
      >
        <div className="flex items-center gap-2 justify-between w-[100%]">
          <p className="text-[#333]">{data?.messages?.msg?.slice(0, 30)}...</p>
          <Icon
            icon="material-symbols:delete"
            style={{ fontSize: 20 }}
            className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleDelete}
          />
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  ">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="text-lg mb-6 text-[#000]">
              Are you sure you want to delete this conversation?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviousConversation;
