import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


const ChatWindow = () => {
    const { chat } = useSelector((state) => state.chat);

    console.log({ chat });

    return (
            <div className="chat-window">
                {(chat && chat?.chats && chat?.chats.length < 1 || !chat) ? (
                    <div className='ai-prompt-card-container'>
                        <div className='ai-prompt-card'>How can I create an SOP?</div>
                        <div className='ai-prompt-card'>Hello, I want a list of of all my team ?</div>
                        <div className='ai-prompt-card'>Hello, What is the weather today?</div>
                        <div className='ai-prompt-card'>Hello, I will like you to make a suggestion to me</div>
                        <div className='ai-prompt-card'>Hello, what is the right way to develop?</div>
                        <div className='ai-prompt-card'>Hello, How are I book a vacation?</div>
                    </div>) : (
                    <>
                        {chat && chat.chats && chat.chats.map((item) => (
                            <div className={item.sender === 'agent' ? 'bot-card' : 'user-card'} key={uuidv4()}>
                                <div style={{ fontSize: 10 }}>{item.sender}</div>
                                {/* {item.query} */}
                                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            </div>
                        ))}
                    </>
                )}
            </div>
    );
};

export default ChatWindow;