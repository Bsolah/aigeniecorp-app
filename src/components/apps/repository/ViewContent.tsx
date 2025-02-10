import { Input, Textarea } from '@headlessui/react';
import { useRef } from 'react';
import { Icon } from "@iconify/react";
import { useSelector } from 'react-redux';


const ViewContent = () => {
    const {article} = useSelector((state: any) => state.article);
    const textareaRef = useRef(null);
    const item = article.data;

    console.log('final log ', item, item.title)

    // const handleInput = () => {
    //     const textarea: any = textareaRef.current;
    //     if (textarea && textarea.style) {
    //         // Reset height to auto before calculating scrollHeight
    //         textarea.style.height = 'auto';
    //         // Set the height to match scrollHeight
    //         textarea.style.height = `${textarea.scrollHeight}px`;
    //     }
    // };

    return (
        <div >
            <div className="flex px-5 mb-4 justify-between">
                <span  >Created By: {item?.createdBy?.email}</span>
                <span className='flex gap-3'>
                    <Icon icon="mdi:edit" className="cursor-pointer" width="15"/>
                    <Icon icon="mdi:share" className="cursor-pointer" width="15"/>
                    <Icon icon="mdi:delete" className="cursor-pointer" width="15"/>
                </span>
            </div>

            <div className="flex flex-col p-2 mb-4">
                <Input
                    type="text"
                    placeholder="Page Title"
                    disabled
                    value={item.title}
                    // onChange={(e) => setNewContentTitle(e.target.value)}
                    style={{ backgroundColor: 'transparent', borderWidth: 0, fontSize: 22 }}
                    className="mb-2 focus:bg-transparent focus:ring-0 focus:ring-transparent text-gray-600 placeholder-gray-300"
                />
                <Textarea
                    placeholder="Start typing..."
                    disabled
                    ref={textareaRef}
                    // onInput={handleInput}
                    value={item.content}
                    // onChange={(e: any) => setNewContent(e.target.value)}
                    style={{
                        minHeight: '50px', // Initial height
                        height: 'auto',    // Dynamic height
                    }}
                    className="mb-2 p-2 border-none bg-transparent focus:ring-0 outline-none text-gray-600 placeholder-gray-300 resize-none overflow-hidden"
                />
            </div>
        </div>
    );
};

export default ViewContent;