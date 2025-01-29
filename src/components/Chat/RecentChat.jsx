import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


const RecentChat = () => {
    const { chatRooms } = useSelector((state) => state.chatRoom);
    
    console.log({ chatRooms });

    return (
        <div id='recent-chat'>
            <div style={{ fontSize: 13, fontWeight: 'bold' }}>Recent Chats</div>

            {
                chatRooms && chatRooms.chatRooms && chatRooms.chatRooms.map((item) => (
                    <div key={uuidv4()} className='chat-room'>
                        <div>{item?.messages[0]?.content}</div>
                    </div> ))
            }
        </div>
    );
};

export default RecentChat;