import { PostProps } from '@hooks/api/usePosts/interface';
import axios from '@utils/axios';
import ArticlesView from '@views/articles';
import camelcaseKeys from 'camelcase-keys';

const getData = async (): Promise<PostProps[]> => {
  try {
    const { data } = await axios.get('/articles/posts');
    return camelcaseKeys(data?.data) || [];
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const Articles = async () => {
  const data = await getData();
  return <ArticlesView data={data} />;
};

export default Articles;
