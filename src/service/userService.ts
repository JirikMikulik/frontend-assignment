import {AxiosInstance} from 'axios';

export const registerUser = (axiosInstance: AxiosInstance, userName: string, password: string) =>
  axiosInstance.post('/register', {username: userName, password});

export const loginUser = (axiosInstance: AxiosInstance, userName: string, password: string) =>
  axiosInstance.post('/login', {username: userName, password});

export const refreshUserToken = (axiosInstance: AxiosInstance, refreshToken: string) =>
  axiosInstance.post('/refresh-token', {refreshToken});
