import axios from 'axios';
import {useContext, useEffect} from 'react';
import AuthContext from '../context/AuthProvider';
import useRefreshToken from './useRefreshToken';

const API_URL = 'http://localhost:3001/api';

const useAxiosPrivate = () => {
  const {auth} = useContext(AuthContext);
  const refresh = useRefreshToken();

  const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = auth?.token
            ? `Bearer ${auth?.token}`
            : config.headers.Authorization;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh?.();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth?.token, refresh]);

  return axiosInstance;
};

export default useAxiosPrivate;
