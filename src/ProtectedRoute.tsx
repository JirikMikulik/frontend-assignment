import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from './context/AuthProvider';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const {auth} = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
