import { ytHeader } from '@constant/header';
import { ISWRState } from '@interfaces/index';
import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';

interface Params {
  id?: string;
  hashId?: string;
}

interface IUserTempExist extends ISWRState {
  user: any;
}

const fetcher = async (url: string, props: Params) => {
  try {
    const resp = await axios.get(url, {
      headers: {
        [ytHeader]: props.hashId,
      },
    });
    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const useUserTempExist = (props: Params): IUserTempExist => {
  const { data, error, isLoading } = useSWR(
    props.id ? `/auth/validate-userid-temp?identify=${props.id}` : null,
    (url) => fetcher(url, props)
  );
  return { user: data, error, isLoading };
};

export default useUserTempExist;
