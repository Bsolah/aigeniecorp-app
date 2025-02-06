// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useRef } from 'react';
import ViewContent from './ViewContent.tsx';
import NewContent from './NewContent.tsx';
import WelcomeContent from './WelcomeContent.tsx';
import { useSelector } from 'react-redux';

const Repository = () => {

    const [newPage, setNewPages] = useState<any>("");
    const {article} = useSelector((state: any) => state.article);

    console.log({article})


    if(newPage) {
        return <NewContent />
    }
    if(article && article.length) {
        return <ViewContent />
    }

    return (
        <WelcomeContent/>
    );
};

export default Repository;
