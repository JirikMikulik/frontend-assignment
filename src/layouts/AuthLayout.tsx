import {Center, VStack} from '@chakra-ui/react';
import {Outlet} from 'react-router';
import {Link} from 'react-router-dom';
import Zentask from '../components/Zentask';

const AuthLayout = () => (
  <Center height="100vh" width="100wv" padding={{sm: 10, md: 30, lg: 30}}>
    <VStack h="90vh" spacing={10}>
      <Link to="/">
        <Zentask />
      </Link>
      <Outlet />
    </VStack>
  </Center>
);

export default AuthLayout;
