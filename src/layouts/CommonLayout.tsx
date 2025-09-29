import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import {useContext} from 'react';
import {Outlet} from 'react-router';
import {useNavigate} from 'react-router-dom';
import Zentask from '../components/Zentask';
import AuthContext from '../context/AuthProvider';

const CommonLayout = () => {
  const {auth, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box padding={{base: 4, md: 30, lg: 30}}>
      <Flex justifyContent="space-between" paddingBottom={10}>
        <Zentask />
        <Menu>
          <MenuButton as={Button} colorScheme="grey">
            <HStack>
              <Avatar width={6} height={6} name={auth?.userName} />
              <Text fontSize={16} fontWeight={400}>
                {auth?.userName}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList border="solid 1px #CAD1DE" borderRadius={16}>
            <MenuItem onClick={() => handleLogout()}>
              <HStack>
                <Text>Logout</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default CommonLayout;
