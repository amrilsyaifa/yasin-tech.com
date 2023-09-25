import { Status } from "../PostController/interface";

export interface ICreateTestimony {
  name: string;
  company: string;
  job_title: string;
  desc_ID: string;
  desc_EN: string;
  rating: string;
  image: string;
  status: Status;
}

export interface IUpdateTestimony {
  id: string;
  name?: string;
  company?: string;
  job_title?: string;
  desc_ID?: string;
  desc_EN?: string;
  rating?: string;
  image?: string;
  status?: Status;
}
