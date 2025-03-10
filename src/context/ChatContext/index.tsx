
import * as React from "react";
import  { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { ChatsType } from '../../types/apps/chat.js';
import { useSelector } from "react-redux";
import dispatch from "src/redux/store.js";
import { getChatsByCurrentUser } from "src/redux/slices/chatSlice.js";
// import { useSelector } from 'react-redux';

// Define context props interface
export interface ChatContextProps {
    // chatData: ChatsType[];
    chatContent: any[];
    isEditMode: boolean;
    chatSearch: string;
    newMessage: any;
    selectedChat: ChatsType | null;
    activeChatId: number | null;
    setChatContent: Dispatch<SetStateAction<any[]>>;
    setNewMessage: Dispatch<SetStateAction<any>>;
    setChatSearch: Dispatch<SetStateAction<string>>;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
    setSelectedChat: Dispatch<SetStateAction<ChatsType | null>>;
    setActiveChatId: Dispatch<SetStateAction<any | null>>;
}

// Create the context
export const ChatContext = createContext<ChatContextProps>({
    // chatData: [],
    chatContent: [],
    isEditMode: false,
    chatSearch: '',
    selectedChat: null,
    activeChatId: null,
    newMessage: '',
    setChatContent: () => { },
    setNewMessage: () => { },
    setIsEditMode: () => { },
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
    const [newMessage, setNewMessage] = useState<any>({});
    const [activeChatId, setActiveChatId] = useState<number | null>(1);
    const [isEditMode, setIsEditMode] = useState(false);
    const { user } = useSelector((state: any) => state.auth);
    const { data, selectedChat: selChat } = useSelector((state: any) => state.chat);


    // const { data, loading } = useSelector((state: any) => state.chatRoom);
    console.log({data})
    console.log({selChat})

    React.useEffect(() => {
        dispatch(getChatsByCurrentUser());
    }, [user, data.length])
    
    // React.useEffect(() => {
    //     setSelectedChat()
    // }, [])
 
    const value: ChatContextProps = {
        // chatData,
        chatContent,
        chatSearch,
        isEditMode,
        selectedChat,
        newMessage,
        activeChatId,
        setChatContent,
        setIsEditMode,
        setNewMessage,
        setChatSearch,
        setSelectedChat,
        setActiveChatId
    };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export type { ChatsType };

