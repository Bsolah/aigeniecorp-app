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

  console.log('initialPrompts ', initialPrompts, selectedChat?.messages[selectedChat?.messages.length - 1])

  const onChatMsgSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim() || !selectedChat) return;
    sendMessages();
    setShowPrompts(false)
    setMsg("");
  };

  const handleSubmit = (selectedPrompt: any) => {

    console.log("pressed the button ", selectedPrompt)
    sendMessages(selectedPrompt);
    setShowPrompts(false);
    setMsg("");

  }

  const sendMessages = async (selectedPrompt?: any) => {

    const messageToSend = selectedPrompt ? selectedPrompt : msg
    console.log('got here 1 ', user)
    console.log('selectedChat ', selectedChat)


    dispatch(saveChat({ receiverId: selectedChat?.id, senderId: user._id, content: messageToSend, chatRoomId: null, type: "text" }));
    // setQuery(''); // clear the input field
    // const { data } = await axios.post(`/api/ai/ask`, { query });
    // const parts = data.result.split(/r1\.response:|r2\.followUpQuestions:/).map(part => part.trim());

    // const responsePart = parts[1]; // Content of r1.response
    // const followUpQuestionsPart = parts[2]; // Content of r2.followUpQuestions

    // const dataToRenderData = formatText(responsePart);
    // const formattedData = stringToDocument(dataToRenderData);
    // setFollowUpPrompts(followUpQuestionsPart);
    // await dispatch(saveChat({ chatRoomId, userId: user._id, sender: 'agent', content: formattedData.getHTML() }));
    // await dispatch(getChatByRoomId(chatRoomId.toString()));
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

