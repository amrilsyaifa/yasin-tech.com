import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';
import { ITestimonies, Params } from './interface';

const fetcher = async (url: string) => {
  try {
    const resp = await axios.get(url);
    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const useTestimony = (props: Params): ITestimonies => {
  const { data, error, isLoading, mutate } = useSWR(
    props.isFetch ? `/testimony/${props.id}` : null,
    fetcher
  );
  return { testimony: data, error, isLoading, mutate };
};

export default useTestimony;
