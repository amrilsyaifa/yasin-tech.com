'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface EditorProps {
  placeholder?: string;
}

const Editor: FC<EditorProps> = ({ placeholder }) => {
  const t = useTranslations('Auth');
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>${t('hello')} 🌎️</p>`,
  });

  return <EditorContent editor={editor} placeholder={placeholder} />;
};

export default Editor;
