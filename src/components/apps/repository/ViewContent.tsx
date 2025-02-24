import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { AIAssistPopup } from './AIAssistPopup.tsx';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { AppDispatch } from 'src/redux/store.ts';
import { updateArticle, deleteArticle, getArticleById } from 'src/redux/slices/articleSlice.ts';
import TextStyle from "@tiptap/extension-text-style";
import { Button } from 'flowbite-react';
import { Input } from '@headlessui/react';


const ViewContent = () => {
    const aiResponse = useSelector((state: any) => state.ai)
    const { article } = useSelector((state: any) => state.article);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const idParams = pathSegments[pathSegments.length - 1];
    const item = article.data;

    // const { isEditMode, setIsEditMode } = useContext(ChatContext) || false;

    const [isEditMode, setIsEditMode] = useState(false);
    

    const [title, setTitle] = useState(item?.name || "");
    const previousTitle = useRef(title); // A ref to store the previous value of title
    const [content, setContent] = useState(item?.content || "Start typing...");
    const aiSolution = aiResponse.content


    // console.log('article item 1 ', article)
    // console.log('article item 2 ', item.name)

    useEffect(() => {
        dispatch(getArticleById(idParams))
    }, [])

    useEffect(() => {
        setIsEditMode((params.get('edit') === 'true'))
    }, [params.get('edit')])


    useEffect(() => {
        if (title !== previousTitle) {
            dispatch(updateArticle({ id: item?._id, name: title }));
        }
    }, [title])

    useEffect(() => {
        setTitle(item?.name); // Sync when `item.name` changes
        setContent(item?.content); // Sync when `item.name` changes
    }, [item]);



    useEffect(() => {
        editor?.commands.insertContent(`<p> ${aiSolution} </p>`)
    }, [aiSolution])

    // Initialize editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }), // Align text
            TextStyle
        ],
        content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            dispatch(updateArticle({ id: item?._id, content: html }));
            setContent(html);
        },
    });

    // Load content into editor when it initializes
    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content);
        }
    }, [editor, content]);

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditMode);
        }
    }, [editor, isEditMode]);

    const handleClose = () => {
        params.set('edit', 'false');
        navigate(`?${params.toString()}`);
    };

    const handlePublish = () => {
        // dispatch(publishArticle(content));
        handleClose();
    };

    const handlePageEdit = () => {
        params.set('edit', 'true');
        navigate(`?${params.toString()}`);
    }

    const handleDelete = () => {
        dispatch(deleteArticle({ id: item?._id }));
        navigate("/id/repository/drafts");
    }

    return (
        <div className='bg-white' >
            <div className="p-2">
                <div className='flex gap-5 justify-between text-center'>
                    <span className='flex gap-5 justify-between items-center'>
                        {isEditMode ? <Button size="xs" onClick={handleClose} className="ui-button hover:text-white hover:bg-error bg-lighterror text-error">Close</Button>
                            : <span  >Created By: {item?.createdBy?.email}</span>}
                        <div>Last Edit was {item?.createdBy?.updatedAt}</div>
                    </span>

                    <span className='flex gap-5 p-2 justify-between items-center'>
                        <Icon icon="solar:user-plus-broken" width="20" className='cursor-pointer' />
                        {isEditMode ? <Button size="xs" className="ui-button bg-lightprimary hover:bg-lightprimary text-primary rounded-md">Save Draft</Button>
                            : <Button size="xs" onClick={handlePageEdit} className="ui-button bg-secondary text-white">Edit</Button>}

                        {isEditMode ? <Button size="xs" className="ui-button bg-primary" onClick={handlePublish} >Publish</Button>
                            : <Button size="xs" onClick={handleDelete} disabled className="ui-button bg-error text-white">Delete</Button>
                        }
                    </span>
                </div>
                <div style={{ height: 36 }}>
                    {isEditMode && <div >
                        <div className="flex gap-3  justify-center flex-wrap p-1" style={{ borderTop: "0.5px solid #d9d9d9", borderBottom: "0.5px solid #d9d9d9" }}>
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
                            <Button onClick={() => setIsOpen(true)} color='lightprimary' size='xxs' className="me-1 px-1" style={{fontSize: 10}}>AI Assist</Button>
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
                    </div>}
                </div>
                <Input
                    type="text"
                    placeholder="Page Title"
                    disabled={!isEditMode}
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    style={{ backgroundColor: 'transparent', borderWidth: 0, fontSize: 22 }}
                    className="mb-2 focus:bg-transparent focus:ring-0 focus:ring-transparent w-full text-gray-600 placeholder-gray-300"
                />
                <EditorContent editor={editor} className="editorContent" />
            </div>
            <AIAssistPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        </div >
    );

};

export default ViewContent;