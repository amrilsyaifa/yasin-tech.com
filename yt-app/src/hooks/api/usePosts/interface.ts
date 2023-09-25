import { ISWRState } from '@interfaces/index';
import { IMyProfile } from '@stores/myProfile/myProfile';
import { Status } from '../useListTestimony/interface';

export interface Tags {
  _id: string;
  slug: string;
  name: string;
  status: Status;
  post_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface PostProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: Status;
  authorId: string;
  author: IMyProfile;
  tagIds: string[];
  tags: Tags[];
  thumbnail?: string;
  forShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPosts extends ISWRState {
  posts: PostProps[];
}

export interface Params {
  status?: Status;
  for_show?: boolean;
}
