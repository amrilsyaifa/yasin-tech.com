import { TagsProps } from '@hooks/api/useTags/useTags';

export interface CreateFormProps {
  title: string;
}

export interface TagSelect extends TagsProps {
  value: string;
  label: string;
}

export interface Payload {
  title: string;
  description: string;
  tag_ids: string[];
  status: string;
  temp_images: string[] | undefined;
  thumbnail: string | undefined;
  slug: string;
}
