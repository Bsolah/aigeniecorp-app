import { Icon } from "@iconify/react";
import EmojiPicker from 'emoji-picker-react';
import { TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveChat } from "src/redux/slices/chatSlice.ts";
import { AppDispatch } from "src/redux/store.ts";
import VoiceRecorder from './VoiceRecorder';
import { DashboardContext } from "src/context/DashboardContext/DashboardContext";


const ChatMsgSent = () => {
  // const chatEndRef = useRef<HTMLDivElement>(null);
  const [showRecording, setShowRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [msg, setMsg] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const [type, setType] = useState<string>('text');
  const { chat } = useSelector((state: any) => state.chat);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const selectedChat = chat[0];

  const { isChildSwitch } = useContext(DashboardContext);


  const handleChatMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType('text');
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim()
      // || !selectedChat
    ) return;
    setType('text');
    sendMessages();
    // setShowPrompts(false)
    setMsg("");
  };

  const handleSubmit = (selectedPrompt: any) => {

    setType('text');
    sendMessages(selectedPrompt);
    // setShowPrompts(false);
    setMsg("");

  }

  // const scrollToBottom = () => {
  //   chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const handleEmojiClick = (emojiObject: any) => {
    setMsg((prevText) => prevText + emojiObject.emoji);
  };

  const handleFileSelect = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'image' | 'file' | 'text' | 'audio',
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      // setSelectedFile(file);
      // setType(type);
      sendMessages(`${type} attached`, file);
      // scrollToBottom();
      removeFile()
      setMsg("")
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const sendMessages = async (selectedPrompt?: any, selectedAttachment?:any) => {

    const messageToSend = selectedPrompt ? selectedPrompt : msg;
    
    console.log('I am here now ', selectedAttachment)

    dispatch(saveChat({
      receiverId: selectedChat?.receiverId._id,
      senderId: user._id,
      content: messageToSend,
      chatRoomId: selectedChat?.chatRoomId,
      media: selectedAttachment,
      type: type,
      internalAI: isChildSwitch["knb"] ? "knb" : null,
      externalAI: isChildSwitch["dai"] ? "dai": null,
    }));
    // 
    // const currentSelectedId = selectedChat?.chatRoomId;
    // dispatch(getChatByRoomId({ chatRoomId: currentSelectedId }));
  }

  return (
    <>
      {/* {showPrompts && initialPrompts && <div className="flex flex-row mb-[50px] relative -top-[50px] justify-center"> {initialPrompts.map((item: string) =>
        item !== "" && (<Button onClick={() => handleSubmit(item)} size="xs" color="lightinfo" className="rounded-lg mx-[5px]" >
          {item}
        </Button>)
      )}</div>} */}
      <div>
        {showEmojiPicker && (
          <div className="relative">
            <div
              style={{
                position: 'absolute',
                bottom: 0,
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          </div>
        )}

        {showRecording && (
          <VoiceRecorder
            onRecordingStop={(e: any) => {
              setSelectedFile(e);
              setType('audio');
              // scrollToBottom();
            }}
            onClose={() => {
              setShowRecording(false);
              // setSelectedFile(null);
            }}
          />
        )}

        {selectedFile && type != 'audio' && (
          <div className="p-3 border rounded-lg mb-3 flex items-center justify-between">
            <div>
              {selectedFile.type.startsWith('image') ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <p>{selectedFile.name}</p>
              )}
            </div>
            <button onClick={removeFile} className="text-red-500 ml-4">
              <Icon icon="solar:trash-bin-2-linear" height="20" />
            </button>
          </div>
        )}

        <form onSubmit={onChatMsgSubmit}>
          <div className="flex gap-3 items-center py-5 px-5">
            <div>
              <div className="btn-circle-hover cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
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
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file-input-image"
                  onChange={(e) => handleFileSelect(e, 'image')}
                />
                <label htmlFor="file-input-image" className="cursor-pointer">
                  <Icon icon="solar:gallery-add-linear" height="20" />
                </label>
              </div>
              <div className="btn-circle-hover cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="file-input-file"
                  onChange={(e) => handleFileSelect(e, 'file')}
                />
                <label htmlFor="file-input-file" className="cursor-pointer">
                  <Icon icon="solar:paperclip-outline" height="20" />
                </label>
              </div>
              <div className="btn-circle-hover cursor-pointer">
                <Icon icon="solar:microphone-2-outline" height="20" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatMsgSent;

