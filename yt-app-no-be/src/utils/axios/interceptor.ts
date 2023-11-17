import _axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import cookie from 'cookie-cutter';
import { getCookie } from 'cookies-next';
import onRefreshToken from './refreshToken';
import {
  identityToken,
  identityRefreshToken,
  tokenMaxAge,
  refreshTokenMaxAge,
} from '@constant/token';
import { ModeProd } from '@helpers/isProd';

const axiosInstance = _axios.create();

const API_BASE_URL = process.env['NEXT_PUBLIC_API_URL'];

export const isClientSide = typeof window !== 'undefined';

export interface FetchTokenResponse {
  token: string;
}

interface QueueItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
}

let isRefreshing = false;

// Store requests that waiting for refresh token
let failedQueue: QueueItem[] = [];

function processQueue(err: Error | null, token = '') {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getCookie(identityToken);
  config.headers['Content-Type'] = 'application/json';

  config.headers.Accept = 'application/json';
  if (config?.params?.isFormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  config.baseURL = `${API_BASE_URL}/api`;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * this handle if request have error
 */
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

/**
 * this handle if request have response
 */
const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

/**
 * this handle if response have error
 */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalRequest: any = error.config;

  // If error from refresh token api we immediately return error
  if (originalRequest.url === `${API_BASE_URL}/api/auth-refresh-token`) {
    return Promise.reject(error);
  }

  if (error?.response?.status !== 401) {
    // Other error not 401 we can safely return error
    return Promise.reject(error);
  }

  if (!isRefreshing && !originalRequest._retry) {
    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      onRefreshToken(`${API_BASE_URL}/api`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (res: any) => {
          // For demo purpose, using query token. If your request require Bearer in the header
          // you can check the line below
          // originalRequest.headers.Authorization = 'Bearer ' + res.data.token;

          // If you are using default header. Make sure set default token again
          // or every next request have to call refresh token
          // axios.defaults.headers.common.Authorization = res.data.token;

          cookie.set(identityToken, res?.data?.data?.token, {
            maxAge: tokenMaxAge,
            secure: ModeProd(),
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          });
          cookie.set(identityRefreshToken, res?.data?.data?.refresh_token, {
            maxAge: refreshTokenMaxAge,
            secure: ModeProd(),
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          });
          originalRequest.headers.Authorization =
            'Bearer ' + res?.headers?.token;
          await axiosInstance(originalRequest);
          processQueue(null, res?.headers?.token);
          resolve(res);
        })
        .catch((err: Error | null) => {
          // If can't get new token when we might need force user logout
          // Ex: store.dispatch(usersActions.logout());
          processQueue(err);
          reject(err);
        })
        .then(() => {
          isRefreshing = false;
        });
    });
  }

  if (isRefreshing) {
    return new Promise(function (resolve, reject) {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest.headers.Authorization = 'Bearer ' + token;
        return axiosInstance(originalRequest);
      })
      .catch((err) => {
        return err;
      });
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
