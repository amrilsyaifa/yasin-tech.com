import { FC } from 'react';

interface RenderTiptapProps {
  content: string;
}

const RenderTiptap: FC<RenderTiptapProps> = ({ content }) => {
  return (
    <div className='rich-editor'>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default RenderTiptap;
