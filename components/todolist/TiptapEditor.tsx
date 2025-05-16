'use client';

import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export default function TiptapEditor({
  content,
  onChange,
  isEditable = true,
}: {
  content?: any;
  onChange?: (json: any) => void;
  isEditable?: boolean;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: '내용을 입력하세요...' }),
    ],
    content,
    editable: isEditable,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getJSON()); // onChange가 있을 때만 호출
      }
    },
  });

  useEffect(() => {
    if (editor && content) editor.commands.setContent(content);
  }, [content]);

  return (
    <div
      className='border rounded p-2 min-h-[300px]'
      onClick={() => editor?.commands.focus()}
    >
      <EditorContent
        className='min-h-[300px] max-h-[500px] focus:outline-none overflow-y-auto'
        editor={editor}
      />
      {editor && isEditable && (
        <div className='flex gap-2 mb-2'>
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            Underline
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            Left
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            Center
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            Right
          </button>
        </div>
      )}
    </div>
  );
}
