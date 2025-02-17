// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store.ts';
import { createArticle } from 'src/redux/slices/articleSlice.ts';
import { Card } from 'flowbite-react';
import { Dialog } from '@headlessui/react';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { structureFolder } from 'src/utils/commonFunctions.ts';
import { createFolder } from 'src/redux/slices/folderSlice.ts';

const NewContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    let [isFirstOpen, setIsFirstOpen] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { folder } = useSelector((state: any) => state.folders);

    let resultFolder = structureFolder(folder[0]);
    const [expandedFolders, setExpandedFolders] = useState<any>({});
    const [currentFolder, setCurrentFolder] = useState(folder?.name);
    const [newFolderName, setNewFolderName] = useState("");

    const toggleFolder = (path: any) => {
        setExpandedFolders((prev: any) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const savePage = (path: any) => {
        const Id = path.match(/[^/]+$/);
        dispatch(createArticle({parent: Id}))
        setIsDialogOpen(false);
    };

    const addNewFolder = (path: any) => {
        dispatch(createFolder({name: newFolderName, parent: path}))
        setNewFolderName("");
    };

    const handleSelection = () => {
        setIsDialogOpen(true);
        setIsFirstOpen(false);
    }

    const handleFileImport = () => {
   
        setIsFirstOpen(false);
    }

    if (isFirstOpen) {
        return (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Choose an option:</h2>
                <div className="grid grid-cols-3 gap-2">
                    <Card onClick={handleSelection}
                        className="cursor-pointer p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                        <Icon icon={"ri:file-fill"} className="w-10 h-10 self-center" />
                        <p className="text-xs font-light mt-2">New Page</p>
                    </Card>
                    <Card onClick={() => setIsFirstOpen(false)}
                        className="cursor-pointer p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                        <Icon icon={"ri:file-list-3-line"} className="w-10 h-10 self-center" />
                        <p className="text-xs font-light mt-2">Template</p>
                    </Card>
                    <Card onClick={handleFileImport}
                        className="cursor-pointer p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                        <Icon icon={"ri:import-fill"} className="w-10 h-10 self-center" />
                        <p className="text-xs font-light mt-2">Import</p>
                    </Card>
                </div>
            </div>
        </div>)
    }

    const renderFolders = (folderObj: any, path = "") => {
        return folderObj?.map((folder: any) => {

            console.log('folder id ', folder)
            const currentPath = path ? `${path}/${folder.id}` : folder.id;
            const isExpanded = expandedFolders[currentPath];

            return (
                <div key={currentPath} className="ml-4">
                    <div
                        className={`cursor-pointer p-2 flex items-center ${currentPath === currentFolder ? "bg-blue-200" : "hover:bg-gray-200"} rounded `}
                        onDoubleClick={() => toggleFolder(currentPath)}
                        onClick={() => setCurrentFolder(currentPath)}
                    >
                        <span className="ml-2 text-xs ">📁 {folder?.name}</span>
                        {folder?.children?.length > 0 && (
                            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                        )}
                    </div>
                    {isExpanded && <div className="ml-4">{renderFolders(folder?.children, currentPath)}</div>}
                </div>
            );
        });
    };



    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-xl w-[50vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Create New Page</h2>
                    <button onClick={() => setIsDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <div className="mt-4 border p-4 rounded-md bg-gray-100">
                    <h3 className="text-sm font-semibold">Knowledge Base Explorer</h3>
                    <div className="mt-2">{renderFolders([resultFolder])}</div>
                </div>

                <div className="mt-4 flex text-xs gap-2">
                    <input
                        type="text"
                        placeholder="New Folder Name"
                        className="w-1/4 p-2 border text-xs rounded-sm"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <button
                        className="p-2 bg-secondary text-white  rounded-md hover:bg-primary"
                        onClick={() => addNewFolder(currentFolder)}
                    >
                       <Plus size={20}/>
                    </button>
                    <button
                    className="w-full bg-primary text-white py-2  text-xs rounded-md hover:bg-green-700"
                    onClick={() => savePage(currentFolder)}
                >
                    Create
                </button>
                </div>

             
            </div>
        </Dialog>
    )
};

export default NewContent;
