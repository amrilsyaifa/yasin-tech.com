import { ISWRState } from '@interfaces/index';
import { IMyProfile } from '@stores/myProfile/myProfile';

enum StatusPublish {
  publish,
  draft,
}

export type Status = keyof typeof StatusPublish;

export interface Testimony {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  descId: string;
  descEn: string;
  rating: string;
  image: string;
  status: Status;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: IMyProfile;
}

export interface ITestimonies extends ISWRState {
  testimony: Testimony[];
}

export interface Params {
  status?: Status;
}
