import Card from '../Home/Card';

const AnotherArticle = () => {
  return (
    <div className='w-full bg-gray-100'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col flex-wrap py-4'>
        <div className='mt-12 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default AnotherArticle;
