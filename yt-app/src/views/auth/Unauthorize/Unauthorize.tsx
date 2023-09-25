import Link from '@components/Link';

const Unauthorize = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <h1 className='text-6xl text-yt-gray-600'>401</h1>
      <p className='mt-16 text-2xl text-yt-gray-600'>
        You are not authorize for access this page
      </p>
      <p className='mt-8 text-2xl text-yt-gray-600'>
        Go to
        <Link
          href='/auth/signin'
          className='cursor-pointer pl-2 text-yt-blue-600'
        >
          Login Page
        </Link>
      </p>
    </div>
  );
};

export default Unauthorize;
