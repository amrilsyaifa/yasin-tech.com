import { ISWRState } from '@interfaces/index';
import { PostProps } from '../usePosts/interface';

export interface IPost extends ISWRState {
  post: PostProps;
}

export interface Params {
  id: string;
  isFetch: boolean;
}
