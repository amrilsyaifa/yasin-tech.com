import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';
import { ITestimonies, Params } from './interface';

const fetcher = async (url: string, props: Params) => {
  try {
    const resp = await axios.get(url, { params: props });
    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const useListTestimony = (props: Params): ITestimonies => {
  const { data, error, isLoading, mutate } = useSWR('/testimony', (url) =>
    fetcher(url, props)
  );
  return { testimony: data, error, isLoading, mutate };
};

export default useListTestimony;
