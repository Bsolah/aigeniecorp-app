// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import CardBox from '../../shared/CardBox.tsx';
import { Button } from "flowbite-react";
// import { Button as Btn } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store.ts';
import { publishArticle } from 'src/redux/slices/articleSlice.ts';
import { AIAssistPopup } from './AIAssistPopup';
import { NewPageTemplate } from './NewPageTemplate'
// import '../../../css/pages/repository.css'

const NewContent = () => {
    const [content, setContent] = useState(localStorage.getItem("documentContent") || "");
    const aiResponse = useSelector((state : any) => state.ai)
    const dispatch = useDispatch<AppDispatch>();
    let [isOpen, setIsOpen] = useState(false);
    let [isFirstOpen, setIsFirstOpen] = useState(true);

    console.log("aiResponse ", aiResponse)
    const aiSolution = aiResponse.content

    useEffect(() => {
        editor?.commands.insertContent(`<p> ${aiSolution} </p>`)
    }, [aiSolution])

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

    if(isFirstOpen) {
       return  <NewPageTemplate isOpen={isFirstOpen} setIsOpen={setIsFirstOpen} />
    }


    const handlePublish = () => {
        dispatch(publishArticle(content));
    };

    return (
        <CardBox >
            <div className="p-2">
                <div className='flex gap-5 p-2 justify-between text-center'>
                    <span className='flex gap-5 p-2 justify-between items-center'>
                        <Button size="xs" className="ui-button bg-lighterror text-error">Close</Button>
                        {/* <div>Last Edit was ...</div> */}
                    </span>

                    <span className='flex gap-5 p-2 justify-between items-center'>
                        <Icon icon="solar:user-plus-broken" width="20" className='cursor-pointer' />
                        <Button size="xs" className="ui-button bg-lightprimary text-primary rounded-md">Save Draft</Button>
                        <Button size="xs" className="ui-button bg-primary" onClick={handlePublish} >Publish</Button>
                    </span>
                </div>
                <div >
                    <div className="flex gap-3  justify-center flex-wrap p-4" style={{ borderTop: "0.5px solid", borderBottom: "1px solid" }}>
                        <Icon onClick={() => editor?.chain().focus().undo().run()} icon="material-symbols:undo" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().redo().run()} icon="material-symbols:redo" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <div onClick={() => editor?.chain().focus().setParagraph().run()} className="me-2 cursor-pointer" >Paragraph</div>
                        <Icon onClick={() => editor?.chain().focus().setTextAlign("left").run()} icon="mdi:format-align-left" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().setTextAlign("center").run()} icon="mdi:format-align-center" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().setTextAlign("right").run()} icon="mdi:format-align-right" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleBold().run()} icon="bx:bold" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleItalic().run()} icon="ri:italic" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleUnderline().run()} icon="ri:underline" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleStrike().run()} icon="ri:strikethrough" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleCodeBlock().run()} icon="tdesign:code" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Button onClick={() => setIsOpen(true)} color='lightprimary' size='xs' className="me-1">AI Assist</Button>
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Icon icon="uil:table" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleBulletList().run()} icon="whh:numberlist" width="20" className="cursor-pointer" />
                        <Icon onClick={() => editor?.chain().focus().toggleOrderedList().run()} icon="whh:numberlist" width="20" className="cursor-pointer" />
                        <Icon icon="fluent:divider-tall-20-regular" width="20" className="cursor-pointer" />
                        <Icon icon="uiw:picture" width="20" className="cursor-pointer" />
                        <Icon icon="solar:paperclip-bold" width="20" className="cursor-pointer" />
                        <Icon icon="il:url" width="20" className="cursor-pointer" />
                        <Icon icon="streamline:new-file" width="20" className="cursor-pointer" />
                        
                    </div>
                </div>
                <EditorContent editor={editor} className="editorContent" />                  
            </div>    
            <AIAssistPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        </CardBox >
    );
};

export default NewContent;
