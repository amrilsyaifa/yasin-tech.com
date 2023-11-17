import Illustration from '@components/Icons/forgot_illustration.svg';
import Image from 'next/image';

const IllustrationLogin = () => {
  return (
    <div className='flex h-[calc(100vh-4rem)] w-full flex-col justify-center'>
      <Image
        className='h-[100vh] w-full'
        src={Illustration}
        alt='illustration-login'
      />
    </div>
  );
};

export default IllustrationLogin;
