import {useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import axiosInstance from '../service/axios';
import {refreshUserToken} from '../service/userService';

const useRefreshToken = () => {
  const {auth, refreshToken} = useContext(AuthContext);

  if (!auth) {
    return;
  }
  const refresh = async () => {
    const response = await refreshUserToken(axiosInstance, auth?.refreshToken);
    refreshToken(response.data.accessToken);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
