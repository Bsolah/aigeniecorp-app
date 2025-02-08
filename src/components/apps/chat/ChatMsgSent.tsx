import { Icon } from '@iconify/react';
import EmojiPicker from 'emoji-picker-react';
import { TextInput } from 'flowbite-react';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatContext } from 'src/context/ChatContext/index.tsx';
import { saveChat, saveChatWithMedia } from 'src/redux/slices/chatSlice.ts';
import { AppDispatch } from 'src/redux/store.ts';
import VoiceRecorder from './VoiceRecorder';

const ChatMsgSent = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showRecording, setShowRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { selectedChat, chatData, activeChatId } = useContext(ChatContext);
  const user = useSelector((state: any) => state.auth.user);
  const [msg, setMsg] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [type, setType] = useState<string>('text');
  // const initialPrompts = selectedChat?.messages[selectedChat?.messages.length - 1]?.prompts ?? null;
  // const [showPrompts, setShowPrompts] = useState(true);
  const [emoji, setEmoji] = useState('');

  const handleEmojiClick = (emojiObject: any) => {
    setEmoji(emojiObject.emoji);
  };
  const selectedCartData: any = chatData?.find((cur) => cur.id === activeChatId) || [];

  // useEffect(() => {
  //   if (selectedChat?.messages[selectedChat?.messages.length - 1]?.prompts) {
  //     setShowPrompts(true);
  //   }
  // }, [selectedChat]);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleChatMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim() || !selectedChat) return;
    sendMessages({});
    // setShowPrompts(false);
    setMsg('');
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    sendMessages({ type: type });
    // setShowPrompts(false);
    setMsg('');
  };

  const handleFileSelect = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'image' | 'file' | 'text',
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setType(type);
      scrollToBottom();
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };
  // console.log('selected file', selectedFile);
  const sendMessages = async ({ media, type }: { media?: any; type?: any }) => {
    const messageToSend = msg;
    dispatch(
      type === 'text' || !selectedFile
        ? saveChat({
            receiverId: selectedCartData?.receiverId,
            senderId: user._id,
            content: messageToSend,

            chatRoomId: selectedCartData?.id,
            type: type,
          })
        : saveChatWithMedia({
            receiverId: selectedCartData?.receiverId,
            senderId: user._id,
            content: messageToSend,
            chatRoomId: selectedCartData?.id,
            type: type,
            media: media || selectedFile,
          }),
    );
    setSelectedFile(null);
  };

  return (
    <div ref={chatEndRef}>
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
            console.log('response coming from audio', e);
            setSelectedFile(e);
            setType('audio');
            scrollToBottom();
          }}
          onClose={() => {
            setShowRecording(false);
          }}
        />
      )}

      {selectedFile && (
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

      <form onSubmit={onChatMsgSubmit} className="mb-0">
        <div className="flex gap-3 items-center py-5 px-5 mb-0">
          <div className="relative">
            <div
              className="btn-circle-hover cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Icon icon="solar:sticker-smile-circle-2-linear" height="20" />
            </div>
          </div>
          <TextInput
            placeholder="What can I help with?"
            className="form-control-chat border-0 w-full"
            sizing="md"
            required
            value={`${msg} + ${emoji}`}
            onChange={handleChatMsgChange}
          />
          <div className="flex gap-3 items-center">
            <button
              disabled={!msg || (!selectedFile && !msg)}
              className="btn-circle-hover cursor-pointer "
              onClick={handleSubmit}
            >
              <Icon icon="solar:plain-linear" height="20" />
            </button>
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
            <div onClick={() => setShowRecording(true)} className="btn-circle-hover cursor-pointer">
              <Icon icon="solar:microphone-2-outline" height="20" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMsgSent;
