import { Icon } from "@iconify/react";
import { TextInput } from "flowbite-react";
import { ChangeEvent, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveChat } from "src/redux/slices/chatSlice.ts";
import { AppDispatch } from "src/redux/store.ts";
import VoiceRecorder from './VoiceRecorder';
import { DashboardContext } from "src/context/DashboardContext/DashboardContext";
import { ChatContext } from "src/context/ChatContext/index";
import { ObjectId } from "bson";


const ChatMsgSent = () => {
  const [showRecording, setShowRecording] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [msg, setMsg] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const [type, setType] = useState<string>('text');
  const { selectedChat, data: chatRoomList  } = useSelector((state: any) => state.chat);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [isFullSize, setIsFullSize] = useState<any>(null);
  const activeChat = selectedChat[0];
  const chatRoomId = new ObjectId().toString(); // Generate BSON ObjectId
  const { isChildSwitch } = useContext(DashboardContext);
  const { setNewMessage } = useContext(ChatContext);


  const handleChatMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType('text');
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e: any) => {
    if (e.key === 'Enter') {
    e.preventDefault();
    if (!msg.trim() && !selectedFile) return;
    setType('text');
    sendMessages(msg, selectedFile);
    setMsg("");
    }
  };

  const handleSubmit = () => {

    setType('text');
    sendMessages(msg, selectedFile);
    setMsg("");
  }

  const handleFileChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setSelectedFile(uploadedFile);

      // Check if the uploaded file is an image
      if (uploadedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setFullSizeImage(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
      }

      else {
        setPreview(null);
        setFullSizeImage(null);
      }
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setIsFullSize(null);
  };

  const sendMessages = async (selectedPrompt?: any, selectedAttachment?: any) => {

    const messageToSend = selectedPrompt ? selectedPrompt : msg;

    // console.log('selected ', selectedAttachment)
    let newChatRoomId = activeChat?.chatRoomId ?? chatRoomId;
    if(!chatRoomList?.length || selectedChat?.length <= 1) {
      newChatRoomId = new ObjectId().toString(); // Generate BSON ObjectId
    } 
      dispatch(saveChat({
        receiverId: '679f70fa087ddee39b7efc5b',
        senderId: user._id,
        content: messageToSend,
        chatRoomId: newChatRoomId,
        media: selectedAttachment,
        type: type,
        aIModels: isChildSwitch,
      }));

    //Prepopulate the chat before return from server
    setNewMessage({
        receiverId: {_id: '679f70fa087ddee39b7efc5b'},
        senderId: user,
        content: messageToSend,
        createdAt: new Date(Date.now()).toISOString(),
        chatRoomId: activeChat?.chatRoomId ?? chatRoomId,
        media: selectedAttachment,
        type: type
    })// send reponse first
    handleRemove();
  }

  return (
    <>
      <div>
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

        {/* {selectedFile && type != 'audio' && (
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
        )} */}

        <form onKeyDown={onChatMsgSubmit} onSubmit={onChatMsgSubmit}>
          <div className="flex gap-3 items-center py-5 px-5">
            <TextInput
              className="form-control-chat border-0 w-full"
              sizing="md"
              placeholder="Start typing..."
              required
              value={msg}
              onChange={handleChatMsgChange}
            />
            {preview && (
              <div className="relative mt-2">
                <img src={preview} alt="Preview" onClick={() => setIsFullSize(true)} // Click to open full size
                  className="w-12 h-12 object-cover rounded cursor-pointer" />
                <button
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-error text-white text-xs rounded-full shadow-lg hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}

            {isFullSize && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                {/* Full-size image */}
                <img
                  src={fullSizeImage}
                  alt="Full Size"
                  className="max-w-full max-h-full cursor-pointer"
                  onClick={() => setIsFullSize(false)} // Click to close
                />
                {/* Close button */}
                <button
                  onClick={() => setIsFullSize(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white text-black text-lg rounded-full shadow-lg hover:bg-gray-300"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex gap-3 items-center">

              <div className="btn-circle-hover cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="file-input-file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input-file" className="cursor-pointer">
                  <Icon icon="solar:paperclip-outline" height="20" />
                </label>
              </div>
              <div className="btn-circle-hover cursor-pointer ">
                <Icon icon="solar:plain-linear"
                  height="20"
                  onClick={handleSubmit}
                />
              </div>
              {/* <div className="btn-circle-hover cursor-pointer">
                <Icon icon="solar:microphone-2-outline" height="20" />
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatMsgSent;

