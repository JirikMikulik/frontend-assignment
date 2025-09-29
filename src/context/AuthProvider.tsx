import {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

type LoginType = {
  userName: string;
  token: string;
  refreshToken: string;
};

interface ProviderProps {
  auth: LoginType | null;
  login(data: LoginType): void;
  refreshToken(newToken: string): void;
  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  auth: null,
  login: () => {},
  refreshToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({...props}) => {
  const storedInfo = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;
  const [auth, setAuth] = useState<LoginType | null>(storedInfo);
  const navigate = useNavigate();

  const login = (data: LoginType) => {
    setTimeout(() => {
      setAuth(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/todos');
    }, 1000);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('user');
  };

  const refreshToken = (newToken: string) => {
    if (auth === null) {
      return;
    }
    setAuth({userName: auth.userName, token: newToken, refreshToken: auth.refreshToken});
  };

  return <AuthContext.Provider value={{auth, login, refreshToken, logout}} {...props} />;
};

export default AuthContext;
