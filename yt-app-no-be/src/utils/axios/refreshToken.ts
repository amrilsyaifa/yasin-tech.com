import _axios, { AxiosResponse } from 'axios';

import { getCookie } from 'cookies-next';
import { identityRefreshToken } from '@constant/token';
import onLogout from './logout';

const axiosInstance = _axios.create();

const onRefreshToken = (url: string): Promise<void | AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const token = getCookie(identityRefreshToken);
    const refreshTokenUrl = `${url}/auth/refresh-token`;
    axiosInstance
      .post(
        refreshTokenUrl,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          onLogout();
          return reject(err);
        }
        return reject(err);
      });
  });
};

export default onRefreshToken;
