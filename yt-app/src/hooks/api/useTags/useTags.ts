import { ISWRState } from '@interfaces/index';
import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';
import { Status } from '../useListTestimony/interface';

export interface TagsProps {
  id: string;
  slug: string;
  name: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

interface ITags extends ISWRState {
  tags: TagsProps[];
}

interface Params {
  status?: Status;
}

const fetcher = async (url: string, props: Params) => {
  try {
    const resp = await axios.get(url, { params: props });
    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const useTag = (props: Params): ITags => {
  const { data, error, isLoading } = useSWR(`/tag`, (url) =>
    fetcher(url, props)
  );
  return { tags: data, error, isLoading };
};

export default useTag;
