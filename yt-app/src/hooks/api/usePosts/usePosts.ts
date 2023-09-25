import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';
import { IPosts, Params } from './interface';

const fetcher = async (url: string, props: Params) => {
  try {
    const resp = await axios.get(url, { params: props });
    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const usePosts = (props: Params): IPosts => {
  const { data, error, isLoading, mutate } = useSWR(`/post`, (url) =>
    fetcher(url, props)
  );
  return { posts: data, error, isLoading, mutate };
};

export default usePosts;
