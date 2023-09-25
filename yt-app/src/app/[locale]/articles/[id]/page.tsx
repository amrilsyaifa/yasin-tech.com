import { PostProps } from '@hooks/api/usePosts/interface';
import axios from '@utils/axios';
import ArticlesIDView from '@views/articles/ArticleID';
import camelcaseKeys from 'camelcase-keys';

const getData = async (id: string): Promise<PostProps> => {
  try {
    const { data } = await axios.get(`/articles/posts/${id}`);
    return camelcaseKeys(data?.data) || [];
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const Articles = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return <ArticlesIDView data={data} />;
};

export default Articles;
