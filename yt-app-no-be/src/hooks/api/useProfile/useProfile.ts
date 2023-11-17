import { ISWRState } from '@interfaces/index';
import axios from '@utils/axios';
import useSWR from 'swr';
import camelcaseKeys from 'camelcase-keys';
import { IMyProfile } from '@stores/myProfile/myProfile';

interface IUserTempExist extends ISWRState {
  profile: IMyProfile;
}

const fetcher = async (url: string) => {
  try {
    const resp = await axios.get(url);
    return camelcaseKeys(resp.data.data);
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};

const useProfile = (): IUserTempExist => {
  const { data, error, isLoading } = useSWR(`/profile/my-profile`, fetcher);
  return { profile: data, error, isLoading };
};

export default useProfile;
