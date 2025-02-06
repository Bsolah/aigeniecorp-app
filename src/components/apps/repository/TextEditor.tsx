import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

const TiptapEditor = () => {
  // Load saved content from localStorage
  const [content, setContent] = useState(localStorage.getItem("documentContent") || "<p>Start writing...</p>");

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg p-6 rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Tiptap Rich Text Editor</h1>

        {/* Toolbar */}
        <div className="flex gap-2 mb-4 p-2 bg-gray-200 rounded-md shadow-sm">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`px-3 py-1 rounded-md ${editor?.isActive("bold") ? "bg-gray-800 text-white" : "bg-gray-300"}`}>B</button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`px-3 py-1 rounded-md ${editor?.isActive("italic") ? "bg-gray-800 text-white" : "bg-gray-300"}`}>I</button>
          <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={`px-3 py-1 rounded-md ${editor?.isActive("underline") ? "bg-gray-800 text-white" : "bg-gray-300"}`}>U</button>
          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-3 py-1 rounded-md ${editor?.isActive("heading", { level: 1 }) ? "bg-gray-800 text-white" : "bg-gray-300"}`}>H1</button>
          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-1 rounded-md ${editor?.isActive("heading", { level: 2 }) ? "bg-gray-800 text-white" : "bg-gray-300"}`}>H2</button>
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`px-3 py-1 rounded-md ${editor?.isActive("bulletList") ? "bg-gray-800 text-white" : "bg-gray-300"}`}>• List</button>
          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`px-3 py-1 rounded-md ${editor?.isActive("orderedList") ? "bg-gray-800 text-white" : "bg-gray-300"}`}>1. List</button>
          <button onClick={() => editor?.chain().focus().setTextAlign("left").run()} className="px-3 py-1 rounded-md bg-gray-300">⬅</button>
          <button onClick={() => editor?.chain().focus().setTextAlign("center").run()} className="px-3 py-1 rounded-md bg-gray-300">⏺</button>
          <button onClick={() => editor?.chain().focus().setTextAlign("right").run()} className="px-3 py-1 rounded-md bg-gray-300">➡</button>
          <button onClick={() => editor?.chain().focus().undo().run()} className="px-3 py-1 rounded-md bg-gray-300">↩ Undo</button>
          <button onClick={() => editor?.chain().focus().redo().run()} className="px-3 py-1 rounded-md bg-gray-300">↪ Redo</button>
        </div>

        {/* Editor Content */}
        <div className="border p-4 min-h-40 bg-white rounded-md shadow-sm">
          <EditorContent editor={editor} />
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">💾 Auto-saving enabled. Refreshing won't delete your work.</p>
      </div>
    </div>
  );
};

export default TiptapEditor;
