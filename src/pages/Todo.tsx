import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import * as yup from 'yup';
import {ReactComponent as IconBackwards} from '../assets/icons/icon-backwards.svg';
import {ReactComponent as IconCheck} from '../assets/icons/icon-check.svg';
import {ReactComponent as IconDelete} from '../assets/icons/icon-delete.svg';
import DeleteDialog from '../components/DeleteDialog';
import {Todo} from '../components/TodoListItem';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {createNewTodo, deleteTodo, getTodo, updateTodo} from '../service/todoService';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Task name must be at least 5 characters')
    .required('This field is mandatory.'),
  description: yup.string(),
});

export type FormData = {
  title: string;
  description?: string;
};

const NewTodo = () => {
  const {t} = useTranslation();
  const axiosInstance = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const {id} = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateOrUpdate, setIsCreateOrUpdate] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    getTodo(axiosInstance, id).then((res) => {
      setIsLoading(false);
      setTodo(res.data as Todo);
      reset({title: res.data.title, description: res.data.description});
    });
  }, []);

  const handleGoBack = () => {
    navigate('/todos');
  };

  const handleCreateOrUpdateTodo = (formData: FormData) => {
    if (!axiosInstance) {
      return;
    }
    if (!id) {
      setIsCreateOrUpdate(true);
      createNewTodo(axiosInstance, formData.title, formData.description)
        .then(() => {
          setIsCreateOrUpdate(false);
          navigate('/todos');
        })
        .catch((error) => {
          setIsCreateOrUpdate(false);
          console.error('There was an error!', error);
        });
    } else {
      setIsCreateOrUpdate(true);
      updateTodo(axiosInstance, id, formData.title, formData.description).then(() => {
        setIsLoading(false);
        navigate('/todos');
      });
    }
  };

  const handleDelete = () => {
    if (!todo) {
      return;
    }
    setIsDeleting(true);
    deleteTodo(axiosInstance, todo.id).then(() => {
      setIsDeleting(false);
      navigate('/todos');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateOrUpdateTodo)}>
        <Card variant="filled" padding={4} borderRadius={24} backgroundColor="#ffffff">
          <CardHeader paddingBottom={10}>
            <Box display={{lg: 'flex', md: 'flex'}} gap={6} alignItems="center">
              <Button colorScheme="gray" onClick={handleGoBack} marginBottom={{base: 2}}>
                <IconBackwards />
              </Button>
              <Heading fontSize={24}>{id ? todo?.title : t('todo.newTaskTitle')}</Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <VStack gap={5}>
              <FormControl isRequired>
                <FormLabel>{t('todo.taskName')}</FormLabel>
                <InputGroup>
                  <Input
                    {...register('title')}
                    colorScheme="gray"
                    isInvalid={!!errors.title}
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <InputRightElement>
                      <Spinner />
                    </InputRightElement>
                  )}
                </InputGroup>
                <Text color="red" paddingTop={2}>
                  {errors.title?.message}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel>{t('todo.description')}</FormLabel>
                <InputGroup>
                  <Textarea
                    {...register('description')}
                    borderColor="#CAD1DE"
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <InputRightElement>
                      <Spinner />
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>
              <Box alignContent="space-between" width="full" display={{lg: 'flex', md: 'flex'}}>
                <Button
                  colorScheme="gray"
                  onClick={handleGoBack}
                  width={{base: 'full', md: 'unset', lg: 'unset'}}
                  marginBottom={{base: 2}}
                >
                  {t('todo.discard')}
                </Button>
                <Spacer />
                <Button
                  colorScheme="red"
                  onClick={onOpen}
                  width={{base: 'full', md: 'unset', lg: 'unset'}}
                  marginBottom={{base: 2}}
                  marginRight={2}
                  rightIcon={<IconDelete fill="white" />}
                >
                  {t('todo.delete')}
                </Button>
                <Button
                  type="submit"
                  rightIcon={
                    isCreateOrUpdate ? <Spinner color="white" /> : <IconCheck fill="#ffffff" />
                  }
                  width={{base: 'full', md: 'unset', lg: 'unset'}}
                  isDisabled={isLoading}
                >
                  {t(`todo.${id ? 'saveChanges' : 'createTask'}`)}
                </Button>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </form>
      <DeleteDialog
        isOpen={isOpen}
        isDeleting={isDeleting}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default NewTodo;
