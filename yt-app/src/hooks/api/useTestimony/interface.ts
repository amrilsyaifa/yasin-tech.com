import { ISWRState } from '@interfaces/index';
import { Testimony } from '../useListTestimony/interface';

export interface ITestimonies extends ISWRState {
  testimony: Testimony;
}

export interface Params {
  id: string;
  isFetch: boolean;
}
