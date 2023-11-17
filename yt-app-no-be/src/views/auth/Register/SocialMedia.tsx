import Google from '@components/Icons/google.svg';
import Facebook from '@components/Icons/facebook.svg';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import { IGoogleResponse, SocialMediaProps } from './interface';
import useDisclosure from '@hooks/useDisclosure';
import camelcaseKeys from 'camelcase-keys';
import axios from '@utils/axios';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { isEmpty, isFunction } from 'lodash';
import cookie from 'cookie-cutter';
import {
  identityRefreshToken,
  identityToken,
  refreshTokenMaxAge,
  tokenMaxAge,
} from '@constant/token';
import { ModeProd } from '@helpers/isProd';

const SocialMedia: FC<SocialMediaProps> = ({ onStart, onEnd }) => {
  const t = useTranslations('Home');
  const loading = useDisclosure();

  const params = useParams();
  const router = useRouter();

  const successToast = () =>
    toast(t('pages.login.toast.success'), { type: 'success' });
  const errorToast = () =>
    toast(t('pages.login.toast.error'), { type: 'error' });

  const onProcessLoginGoogle = (res: IGoogleResponse) => {
    loading.onOpen();
    axios
      .post('/auth/login-google', { access_token: res.access_token })
      .then((res) => {
        if (res?.data?.status === 'success') {
          loading.onClose();
          onFinished();
          successToast();
          const response = camelcaseKeys(res?.data?.data);

          if (!isEmpty(response.cookieData)) {
            const token = response.cookieData?.token ?? '';
            const refreshToken = response.cookieData?.refreshToken ?? '';
            cookie.set(identityToken, token, {
              maxAge: tokenMaxAge,
              secure: ModeProd(),
              path: '/',
              httpOnly: true,
            });
            cookie.set(identityRefreshToken, refreshToken, {
              maxAge: refreshTokenMaxAge,
              secure: ModeProd(),
              path: '/',
              httpOnly: true,
              sameSite: 'strict',
            });
          }

          const goTo =
            response?.goTo === 'on_completed'
              ? `/${params?.locale}/dashboard`
              : `/${params?.locale}/auth/oauth/${response?.goTo}/${response.userId}`;
          const pageString = goTo?.replace(/_/g, '-');
          return router.push(pageString);
        }
        loading.onClose();
      })
      .catch(() => {
        errorToast();
        onFinished();
        return loading.onClose();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onProcessLoginGoogle(tokenResponse),
  });

  const onFinished = () => {
    if (isFunction(onEnd)) {
      onEnd();
    }
  };

  const onLogin = () => {
    if (isFunction(onStart)) {
      onStart();
    }
    loading.onOpen();
    login();
  };

  return (
    <div className='mt-8 flex w-full flex-row justify-center space-x-6'>
      <button
        disabled={loading.isOpen}
        onClick={onLogin}
        className='flex h-20 w-32 cursor-pointer items-center justify-center rounded-md border-2 border-yt-blue-600 hover:bg-yt-gray-100'
      >
        <Image src={Google} alt='google-icon' />
      </button>

      <div className='flex h-20 w-32 cursor-pointer items-center justify-center rounded-md border-2 border-yt-blue-600 hover:bg-yt-gray-100'>
        <Image src={Facebook} alt='facebook-icon' />
      </div>
    </div>
  );
};

export default SocialMedia;
