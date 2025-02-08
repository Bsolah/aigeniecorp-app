import { Icon } from "@iconify/react";
import { ChatContext } from "src/context/ChatContext/index.tsx";
import { TextInput, Button } from "flowbite-react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveChat } from "src/redux/slices/chatSlice.ts";
import { AppDispatch } from "src/redux/store.ts";



const ChatMsgSent = () => {
  const { selectedChat } = useContext(ChatContext);
  const user = useSelector((state: any) => state.auth.user);
  const [msg, setMsg] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const initialPrompts = selectedChat?.messages[selectedChat?.messages.length - 1]?.prompts ?? null;
  const [ showPrompts, setShowPrompts ] = useState(true);

  useEffect(() => {
    if(selectedChat?.messages[selectedChat?.messages.length - 1]?.prompts) {
      setShowPrompts(true);
    }

  }, [selectedChat])

  const handleChatMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim() || !selectedChat) return;
    sendMessages();
    setShowPrompts(false)
    setMsg("");
  };

  const handleSubmit = (selectedPrompt: any) => {

    sendMessages(selectedPrompt);
    setShowPrompts(false);
    setMsg("");

  }

  const sendMessages = async (selectedPrompt?: any) => {

    const messageToSend = selectedPrompt ? selectedPrompt : msg


    dispatch(saveChat({ receiverId: selectedChat?.id, senderId: user._id, content: messageToSend, chatRoomId: null, type: "text" }));
  }

  return (
    <>
      {showPrompts && initialPrompts && <div className="flex flex-row mb-[50px] relative -top-[50px] justify-center"> {initialPrompts.map((item: string) => 
              item !== "" && (<Button onClick={() => handleSubmit(item)}  size="xs" color="lightinfo" className="rounded-lg mx-[5px]" >
                {item}
              </Button>)
            )}</div>}
      <form onSubmit={onChatMsgSubmit}>
        <div className="flex gap-3 items-center py-5 px-5">
          <div>
            <div className="btn-circle-hover cursor-pointer">
              <Icon icon="solar:sticker-smile-circle-2-linear" height="20" />
            </div>
          </div>
          <TextInput
            className="form-control-chat border-0 w-full"
            sizing="md"
            placeholder="Start typing..."
            required
            value={msg}
            onChange={handleChatMsgChange}
          />
          <div className="flex gap-3 items-center">
            <div className="btn-circle-hover cursor-pointer ">
              <Icon icon="solar:plain-linear"
                height="20"
                onClick={handleSubmit}
              />
            </div>
            <div className="btn-circle-hover cursor-pointer">
              <Icon icon="solar:gallery-add-linear" height="20" />
            </div>
            <div className="btn-circle-hover cursor-pointer">
              <Icon icon="solar:paperclip-outline" height="20" />
            </div>
            <div className="btn-circle-hover cursor-pointer">
              <Icon icon="solar:microphone-2-outline" height="20" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatMsgSent;

