
import * as React from "react";
import  { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { ChatsType } from '../../types/apps/chat.js';
// import { useSelector } from 'react-redux';

// Define context props interface
export interface ChatContextProps {
    // chatData: ChatsType[];
    chatContent: any[];
    chatSearch: string;
    selectedChat: ChatsType | null;
    activeChatId: number | null;
    setChatContent: Dispatch<SetStateAction<any[]>>;
    setChatSearch: Dispatch<SetStateAction<string>>;
    setSelectedChat: Dispatch<SetStateAction<ChatsType | null>>;
    setActiveChatId: Dispatch<SetStateAction<any | null>>;
}

// Create the context
export const ChatContext = createContext<ChatContextProps>({
    // chatData: [],
    chatContent: [],
    chatSearch: '',
    selectedChat: null,
    activeChatId: null,
    setChatContent: () => { },
    setChatSearch: () => { },
    setSelectedChat: () => { },
    setActiveChatId: () => { },
});

// Create the provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [chatData, setChatData] = useState<ChatsType[]>([]);
    const [chatContent, setChatContent] = useState<any[]>([]);
    const [chatSearch, setChatSearch] = useState<string>('');
    const [selectedChat, setSelectedChat] = useState<ChatsType | null>(null);
    const [activeChatId, setActiveChatId] = useState<number | null>(1);

    // const { data, loading } = useSelector((state: any) => state.chatRoom);
    // console.log({chatRooms})

    // useEffect(() => {
    //     setChatData(chatRooms);
    // }, [chatContent, chatSearch, chatRooms, chatData])
 
    const value: ChatContextProps = {
        // chatData,
        chatContent,
        chatSearch,
        selectedChat,
        activeChatId,
        setChatContent,
        setChatSearch,
        setSelectedChat,
        setActiveChatId
    };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export type { ChatsType };

