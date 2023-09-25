import { Testimony } from '@hooks/api/useListTestimony/interface';
import { PostProps } from '@hooks/api/usePosts/interface';
import '@styles/slick.scss';
import axios from '@utils/axios';
import HomeView from '@views/home';
import camelcaseKeys from 'camelcase-keys';

interface ResponseData {
  insights: PostProps[];
  testimonies: Testimony[];
}

const getData = async (): Promise<ResponseData> => {
  try {
    const { data } = await axios.get('/home');
    return data?.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const Home = async () => {
  const data = await getData();
  return (
    <HomeView
      posts={camelcaseKeys(data.insights)}
      testimonies={camelcaseKeys(data?.testimonies)}
    />
  );
};

export default Home;
