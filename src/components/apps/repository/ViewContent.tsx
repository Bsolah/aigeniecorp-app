import React from 'react';
import { useSelector } from 'react-redux';
import TextEditor from './TextEditor';

const ViewContent: React.FC = () => {

    return (
        <div>
            <h1>View Content</h1>
            <p>This is the content of the repository.</p>
            <TextEditor/>
        </div>
    );
};

export default ViewContent;