import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';
import { IPost, Params } from './interface';

const fetcher = async (url: string) => {
  try {
    const resp = await axios.get(url);

    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const usePost = (props: Params): IPost => {
  const { data, error, isLoading, mutate } = useSWR(
    props.isFetch ? `/post/${props.id}` : null,
    fetcher
  );

  return { post: data, error, isLoading, mutate };
};

export default usePost;
