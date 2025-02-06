
import * as React from "react";
import  { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import axios from "../../utils/axios.js";
import { FolderType, ArticleType } from '../../types/apps/repository.js';
import { useSelector } from 'react-redux';

// Define context props interface
export interface RepositoryContextProps {
    repositoryData: FolderType[];
    repositoryContent: any[];
    repositorySearch: string;
    selectedRepository: FolderType | null;
    loading: boolean;
    activeRepositoryId: number | null;
    setRepositoryContent: Dispatch<SetStateAction<any[]>>;
    setRepositorySearch: Dispatch<SetStateAction<string>>;
    setSelectedRepository: Dispatch<SetStateAction<FolderType | null>>;
    setActiveRepositoryId: Dispatch<SetStateAction<any | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

// Create the context
export const RepositoryContext = createContext<RepositoryContextProps>({
    repositoryData: [],
    repositoryContent: [],
    repositorySearch: '',
    selectedRepository: null,
    loading: true,
    activeRepositoryId: null,
    setRepositoryContent: () => { },
    setRepositorySearch: () => { },
    setSelectedRepository: () => { },
    setActiveRepositoryId: () => { },
    setLoading: () => { },
});

// Create the provider component
export const RepositoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [repositoryData, setRepositoryData] = useState<FolderType[]>([]);
    const [repositoryContent, setRepositoryContent] = useState<any[]>([]);
    const [repositorySearch, setRepositorySearch] = useState<string>('');
    const [selectedRepository, setSelectedRepository] = useState<FolderType | null>(null);
    const [activeRepositoryId, setActiveRepositoryId] = useState<number | null>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const { repositoryRooms } = useSelector((state: any) => state.repositoryRoom);

    // useEffect(() => {
    //     setSelectedRepository(repositoryRooms?.repositorys[0]);
    //     setActiveRepositoryId(repositoryRooms?.repositorys[0]?.id);
    // }, [])

    useEffect(() => {
        setRepositoryData(repositoryRooms?.repositorys);
    }, [repositoryData, repositoryContent, repositorySearch, repositoryRooms])
                
           
    useEffect(() => {

        const newUpdatedRepository: any = repositoryData?.find(item => item?.id === selectedRepository?.id)

        setSelectedRepository(newUpdatedRepository);
        setActiveRepositoryId(newUpdatedRepository?.id);
    }, [repositoryData])

    

    const value: RepositoryContextProps = {
        repositoryData,
        repositoryContent,
        repositorySearch,
        selectedRepository,
        loading,
        activeRepositoryId,
        setRepositoryContent,
        setRepositorySearch,
        setSelectedRepository,
        setActiveRepositoryId,
        setLoading,
    };
    return <RepositoryContext.Provider value={value}>{children}</RepositoryContext.Provider>;
};
export type { FolderType };

