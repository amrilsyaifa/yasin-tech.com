import React, {
  ChangeEvent,
  FC,
  createRef,
  useCallback,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import classNames from 'classnames';
import {
  useEditor,
  EditorContent,
  Editor,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import History from '@tiptap/extension-history';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { FiRotateCcw, FiRotateCw } from 'react-icons/fi';
import { BsCode, BsCardImage } from 'react-icons/bs';
import {
  AiOutlineLink,
  AiOutlineBold,
  AiOutlineUnderline,
  AiOutlineItalic,
  AiOutlineStrikethrough,
} from 'react-icons/ai';
import { BsJustifyLeft, BsJustify, BsJustifyRight } from 'react-icons/bs';
import { TipTapProps } from './interface';
import { LinkModal } from './LinkModal';
import useDisclosure from '@hooks/useDisclosure';
import axios from '@utils/axios/axios';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { isEmpty } from 'lodash';

// Load all highlight.js supported languages
import { lowlight } from 'lowlight';

const TipTap: FC<TipTapProps> = ({
  content = '',
  defaultValue = '',
  placeholder = 'Write something...',
  editable = true,
  withFloatingMenu = false,
  withBubleMenu = false,

  onChange,
  onUploadImageUrl,
}) => {
  const [value, setValue] = useState<string>('');

  const t = useTranslations('Components');
  const errorToast = () =>
    toast(t('rich_editor.error_upload_image'), { type: 'error' });

  const extensions = [
    Document,
    History,
    Paragraph,
    Text,
    Bold,
    Underline,
    Italic,
    Strike,
    Code,
    CodeBlockLowlight.extend().configure({ lowlight }),
    TextAlign.configure({
      defaultAlignment: 'right',
    }),
    Link.configure({
      openOnClick: false,
    }),
    Placeholder.configure({
      placeholder,
    }),
    Image.configure({
      inline: true,
      HTMLAttributes: {
        class: 'image-tiptap',
      },
    }),
  ];

  const fileRef = createRef<HTMLInputElement>();

  const editor = useEditor({
    extensions: extensions,
    content,
    editable,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
      onChange?.(editor.getHTML(), editor.getText());
    },
  }) as Editor;

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      editor?.commands?.setContent(defaultValue);
    }
  }, [defaultValue]);

  const modal = useDisclosure();
  const [url, setUrl] = useState<string>('');

  const openModal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setUrl(editor.getAttributes('link').href);
      modal.onOpen();
    },
    [editor]
  );

  const closeModal = useCallback(() => {
    modal.onClose();
    setUrl('');
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    editor.commands.blur();
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      closeModal();
    },
    [editor, closeModal]
  );

  const toggleBold = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      editor.chain().focus().toggleBold().run();
    },
    [editor]
  );

  const toggleUnderline = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      editor.chain().focus().toggleUnderline().run();
    },
    [editor]
  );

  const toggleItalic = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      editor.chain().focus().toggleItalic().run();
    },
    [editor]
  );

  const toggleStrike = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      editor.chain().focus().toggleStrike().run();
    },
    [editor]
  );

  const toggleCode = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      editor.chain().focus().toggleCode().run();
    },
    [editor]
  );

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isPrimary = e.target.id === 'select-image-primary';
    if (e?.target?.files?.[0]) {
      const data = new FormData();
      data.append('media', e?.target?.files[0]);
      axios
        .post('/upload/image', data, {
          params: {
            isFormData: true,
          },
        })
        .then((res) => {
          if (res.data.status === 'success') {
            editor.commands.setImage({
              src: res.data.data.url,
              alt: res.data.data.file.slug,
              title: res.data.data.file.name,
            });
            onUploadImageUrl?.(res.data.data.url, isPrimary);
          }
        })
        .catch(() => {
          return errorToast();
        });
    }
  };

  if (!editor) {
    return null;
  }

  const onImageSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileRef.current?.click();
  };

  return (
    <div className='editor editor-mini'>
      <input
        ref={fileRef}
        id='select-image-primary'
        hidden
        type='file'
        onChange={fileChange}
        accept='image/png, image/gif, image/jpeg'
      />
      {withBubleMenu && (
        <BubbleMenu
          pluginKey='bubbleMenuText'
          className='bubble-menu-dark'
          tippyOptions={{ duration: 150 }}
          editor={editor}
          shouldShow={({ from, to }) => {
            // only show if range is selected.
            return from !== to;
          }}
        >
          <button
            className='menu-button'
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().undo()}
          >
            <FiRotateCcw />
          </button>
          <button
            className='menu-button'
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().redo()}
          >
            <FiRotateCw />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('link'),
            })}
            onClick={(e) => {
              e.preventDefault();
              editor.commands.setTextAlign('left');
            }}
          >
            <BsJustifyLeft />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('link'),
            })}
            onClick={(e) => {
              e.preventDefault();
              editor.commands.setTextAlign('center');
            }}
          >
            <BsJustify />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('link'),
            })}
            onClick={(e) => {
              e.preventDefault();
              editor.commands.setTextAlign('right');
            }}
          >
            <BsJustifyRight />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('link'),
            })}
            onClick={openModal}
          >
            <AiOutlineLink />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('bold'),
            })}
            onClick={toggleBold}
          >
            <AiOutlineBold />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('underline'),
            })}
            onClick={toggleUnderline}
          >
            <AiOutlineUnderline />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('intalic'),
            })}
            onClick={toggleItalic}
          >
            <AiOutlineItalic />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('strike'),
            })}
            onClick={toggleStrike}
          >
            <AiOutlineStrikethrough />
          </button>
          <button
            className={classNames('menu-button', {
              'is-active': editor.isActive('code'),
            })}
            onClick={toggleCode}
          >
            <BsCode />
          </button>
          <button className={classNames('menu-button')} onClick={onImageSelect}>
            <BsCardImage />
          </button>
        </BubbleMenu>
      )}

      {withBubleMenu && (
        <BubbleMenu
          pluginKey='bubbleMenuLink'
          className='bubble-menu-dark'
          tippyOptions={{ duration: 150 }}
          editor={editor}
          shouldShow={({ editor, from, to }) => {
            // only show the bubble menu for links.
            return from === to && editor.isActive('link');
          }}
        >
          <button className='button' onClick={openModal}>
            Edit
          </button>
          <button className='button-remove' onClick={removeLink}>
            Remove
          </button>
        </BubbleMenu>
      )}
      {withFloatingMenu && (
        <FloatingMenu
          tippyOptions={{ duration: 150 }}
          className='bubble-menu-dark'
          editor={editor}
          shouldShow={({ editor }) => {
            return !editor.getHTML()?.includes('image-tiptap');
          }}
        >
          <button className={classNames('menu-button')} onClick={onImageSelect}>
            <BsCardImage />
          </button>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} value={value} />

      <LinkModal
        url={url}
        isOpen={modal.isOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Link Modal'
        onClose={closeModal}
        onChange={(e) => setUrl(e.target.value)}
        onOk={saveLink}
        onCancel={removeLink}
      />
    </div>
  );
};

export default TipTap;
