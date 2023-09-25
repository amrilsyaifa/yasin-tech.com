enum StatusPublish {
  publish,
  draft,
}

export type Status = keyof typeof StatusPublish;

export interface ICreatePost {
  title: string;
  description: string;
  author_id: string;
  tag_ids: string[];
  status: Status;
  temp_images?: string[];
  thumbnail?: string;
  slug: string;
}

export interface IUpdatePost {
  id: string;
  title?: string;
  description?: string;
  author_id?: string;
  tag_ids?: string[];
  status?: Status;
  temp_images?: string[];
  thumbnail?: string;
  slug?: string;
}

export interface IUpdateForShowPost {
  for_show: boolean;
}

export interface QueryDataPost {
  author?: string;
  status?: Status;
  for_show?: boolean;
}
