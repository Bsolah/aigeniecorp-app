// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import CardBox from '../../shared/CardBox.tsx';
import { Card } from "flowbite-react";
import { Button as Btn, Input, Textarea } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";


const NewContent = () => {

    const [pages, setPages] = useState<any>([]);
    const [newContentTitle, setNewContentTitle] = useState("");
    const [newContent, setNewContent] = useState(localStorage.getItem("documentContent")   || "");
    const [content, setContent] = useState(localStorage.getItem("documentContent")   || "");
    const textareaRef = useRef(null);

    // Initialize editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }), // Align text
        ],
        content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
            localStorage.setItem("documentContent", html); // Auto-save
        },
    });

    // Load content into editor when it initializes
    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content);
        }
    }, [editor]);


    const handleCreatePage = () => {
        if (newContentTitle.trim()) {
            setPages([...pages, { title: newContentTitle, content: newContent }]);
            setNewContentTitle("");
            setNewContent("");
        }
    };

    const handleInput = () => {
        const textarea: any = textareaRef.current;
        if (textarea && textarea.style) {
            // Reset height to auto before calculating scrollHeight
            textarea.style.height = 'auto';
            // Set the height to match scrollHeight
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <CardBox >
            <div className="p-2">
                <div className='flex gap-5 p-2 justify-between text-center'>
                    <span className='flex gap-5 p-2 justify-between items-center'>
                        <Btn className="ui-button bg-lightsecondary text-secondary">Draft</Btn>
                        {/* <div>Last Edit was ...</div> */}
                    </span>

                    <span className='flex gap-5 p-2 justify-between items-center'>
                        <Icon icon="solar:user-plus-broken" width="20" className='cursor-pointer' />
                        <Btn className="ui-button border border-primary text-primary rounded-md">Close</Btn>
                        <Btn className="ui-button bg-primary" onClick={handleCreatePage} >Publish</Btn>
                    </span>
                </div>
                <div >
                    <div className="flex gap-3  justify-center flex-wrap p-4" style={{ borderTop: "0.5px solid", borderBottom: "1px solid" }}>
                        <Icon onClick={() => editor?.chain().focus().toggleBold().run()} icon="material-symbols:undo" width="20" className="cursor-pointer" />
                        <Icon icon="material-symbols:redo" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <div className="me-2">Paragraph</div>
                        <Icon icon="mdi:format-align-left" width="20" className="cursor-pointer" />
                        <Icon icon="mdi:format-align-center" width="20" className="cursor-pointer" />
                        <Icon icon="mdi:format-align-right" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleBold().run()} icon="bx:bold" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleItalic().run()} icon="ri:italic" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleUnderline().run()}  icon="ri:underline" width="20" className="cursor-pointer" />
                        <Icon icon="ri:strikethrough" width="20" className="cursor-pointer" />
                        <Icon icon="tdesign:code" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <div className="me-2">Genie Assist</div>
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Icon icon="uiw:picture" width="20" className="cursor-pointer" />
                        <Icon icon="uil:table" width="20" className="cursor-pointer" />
                        <Icon icon="uil:edit" width="20" className="cursor-pointer" />
                        <Icon icon="solar:paperclip-bold" width="20" className="cursor-pointer" />
                        <Icon icon="il:url" width="20" className="cursor-pointer" />
                        <Icon icon="streamline:new-file" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Icon icon="solar:question-circle-outline" width="20" className="cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col p-2 mb-4">
                    <Input
                        type="text"
                        placeholder="Page Title"
                        value={newContentTitle}
                        onChange={(e) => setNewContentTitle(e.target.value)}
                        style={{ backgroundColor: 'transparent', borderWidth: 0, fontSize: 22 }}
                        className="mb-2 focus:bg-transparent focus:ring-0 focus:ring-transparent text-gray-600 placeholder-gray-300"
                    />
                    <Textarea
                        placeholder="Start typing..."
                        ref={textareaRef}
                        onInput={handleInput}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        style={{
                            minHeight: '50px', // Initial height
                            height: 'auto',    // Dynamic height
                        }}
                        className="mb-2 p-2 border-none bg-transparent focus:ring-0 outline-none text-gray-600 placeholder-gray-300 resize-none overflow-hidden"
                    />
                </div>

                <EditorContent editor={editor} />

                {pages.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Pages</h2>
                        {pages.map((page: any, index: any) => (
                            <Card key={index} className="mb-3">
                                {/* <CardContent> */}
                                <h3 className="text-xl font-bold">{page.title}</h3>
                                <p>{page.content}</p>
                                {/* </CardContent> */}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </CardBox>
    );
};

export default NewContent;
