// src/components/Search.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '../../assets/send.svg?react';
// import { ReactComponent as VoiceIcon } from '../../assets/voice_chat.svg';
import AttachFileIcon from '../../assets/attach_file.svg?react';
import ChatWindow from './ChatWindow'
import { getChatByRoomId, saveChat, clearChat } from '../../redux/slices/chatSlice';
import { getChatsByUserId } from '../../redux/slices/chatRoomSlice';
import { formatText, stringToDocument } from '../../utils/commonFunction';
import { ObjectId } from "bson";
import axios from 'axios';
import '../../styles/styles.css';

let chatRoomId = new ObjectId(); // Generate a new BSON ObjectId

function Search() {
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState('');
  const [followUpPrompts, setFollowUpPrompts] = useState([]);
  const dispatch = useDispatch();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.target.value = '';
      await sendMessages()
    }
  };

  const handleSearch = async (e) => {
    try {
      await sendMessages()
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    console.log('clearing chat ', user);
    dispatch(clearChat());
    chatRoomId = new ObjectId();
    await dispatch(getChatsByUserId(user._id));
  }

  const sendMessages = async () => {
    await dispatch(saveChat({ chatRoomId, userId: user._id, sender: user.email, content: query }));
    setQuery(''); // clear the input field
    const { data } = await axios.post(`/api/ai/ask`, { query });
    const parts = data.result.split(/r1\.response:|r2\.followUpQuestions:/).map(part => part.trim());

    const responsePart = parts[1]; // Content of r1.response
    const followUpQuestionsPart = parts[2]; // Content of r2.followUpQuestions

    const dataToRenderData = formatText(responsePart);
    const formattedData = stringToDocument(dataToRenderData);
    setFollowUpPrompts(followUpQuestionsPart);
    await dispatch(saveChat({ chatRoomId, userId: user._id, sender: 'agent', content: formattedData.getHTML() }));
    await dispatch(getChatByRoomId(chatRoomId.toString()));
  }

  return (
    <>
      <div id='template-commands'>
        <button onClick={handleClick}>New Chat</button>
      </div>
      <div id='ai-prompt-template-section'>
        <ChatWindow />
      </div>
      <div id='ai-chat-bar-section'>
        <div className="prompt-card-container">{followUpPrompts && followUpPrompts.length > 0 && followUpPrompts.split('\n').map((prompt, index) => (
          <div key={index} className='prompt-card'>{prompt.replace(/^\d+\.\s/gm, '')}</div>
        ))}

          <div id='view-prompt'> View prompts </div>
        </div>
        <div id='input-bar'>
          <textarea rows="3" id='text-area' onKeyDown={handleKeyDown} onChange={e => setQuery(e.target.value)} value={query} placeholder='Ask me anything...'></textarea>
          <div style={{ textAlign: 'end' }}>
            <label>  <AttachFileIcon fill='#666' />  <input type="file" hidden /> </label>
            <label> <SendIcon onClick={handleSearch} fill='#666' /></label>
          </div>
        </div>
      </div>
    </>
  )
}
export default Search;
