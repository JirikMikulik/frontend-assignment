import {
  Button,
  Card,
  CardBody,
  CardHeader,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement as ChInputRightElement,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import * as yup from 'yup';
import {ReactComponent as IconForward} from '../assets/icons/icon-forward.svg';
import {ReactComponent as IconHide} from '../assets/icons/icon-hide.svg';
import {ReactComponent as IconShow} from '../assets/icons/icon-show.svg';
import AuthContext from '../context/AuthProvider';
import useToggle from '../hooks/useToggle';
import axiosInstance from '../service/axios';
import {loginUser} from '../service/userService';
import {FormData} from './Register';

const InputRightElement = chakra(ChInputRightElement, {
  baseStyle: {
    backgroundColor: '#ffffff',
    borderTop: 'solid 1px #CAD1DE',
    borderBottom: 'solid 1px #CAD1DE',
    borderRight: 'solid 1px #CAD1DE',
    borderRightRadius: 4,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'User name must be at least 3 characters')
    .required('User name is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const {login, logout} = useContext(AuthContext);
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {on: showPassword, toggle} = useToggle(false);

  const handleShowPassword = () => {
    toggle();
  };

  const handleLoginUser = (formData: FormData) => {
    if (!axiosInstance) {
      return;
    }

    setIsLoading(true);
    loginUser(axiosInstance, formData.username, formData.password)
      .then((response) => {
        setIsLoading(false);
        login({
          userName: formData.username,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        logout();
        if (!error?.response) {
          setError('No server response');
        } else if (error?.response?.status === 400) {
          setError('Missing Username of Password');
        } else if (error?.response?.status === 401) {
          setError('Wrong user name or password');
        } else {
          setError('Login failed');
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLoginUser)} onChange={() => setError('')}>
        <Card maxW={560} variant="filled" padding={4} borderRadius={24} backgroundColor="#ffffff">
          <CardHeader>
            <Heading fontSize={24} fontWeight={700}>
              {t('login.title')}
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={10} w="full">
              <Text fontSize={16}>{t('login.message')}</Text>
              {error && <Text color="red">{error}</Text>}
              <FormControl isRequired>
                <FormLabel>{t('login.userName')}</FormLabel>
                <Input
                  isInvalid={!!errors.username}
                  {...register('username')}
                  type="text"
                  disabled={isLoading}
                />
                <Text color="red" marginTop={1}>
                  {errors.username?.message}
                </Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('login.password')}</FormLabel>
                <InputGroup>
                  <Input
                    isInvalid={!!errors.password}
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.45rem"
                      size="sm"
                      onClick={handleShowPassword}
                      backgroundColor="#ffffff"
                    >
                      {showPassword ? <IconHide /> : <IconShow />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color="red" marginTop={1}>
                  {errors.password?.message}
                </Text>
              </FormControl>
              <Button
                type="submit"
                rightIcon={
                  isLoading ? (
                    <Spinner color="white" />
                  ) : (
                    <IconForward width={20} height={20} fill="#ffffff" />
                  )
                }
              >
                {t('login.login')}
              </Button>
            </Stack>
          </CardBody>
        </Card>
        <Flex alignItems="flex-end" paddingTop={5}>
          <Link to="/register">{t('login.register')}</Link>
        </Flex>
      </form>
    </>
  );
};

export default Login;
