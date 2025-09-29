import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Todo} from '../../backend/database/todos';
import {ReactComponent as IconAdd} from '../assets/icons/icon-add.svg';
import Amazing from '../components/Amazing';
import TodoList from '../components/TodoList';
import AuthContext from '../context/AuthProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {getAllTodos} from '../service/todoService';
import {getFormatedDate} from '../utils/helpers';

const TodosHome = () => {
  const {t} = useTranslation();
  const {auth} = useContext(AuthContext);
  const axiosInstance = useAxiosPrivate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    getAllTodos(axiosInstance)
      .then((res) => {
        setIsLoading(false);
        setTodos(res.data.todos as Todo[]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Fetch error: ', err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = () => {
    navigate('newtodo');
  };

  const today = getFormatedDate(new Date());
  const notCompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Card variant="filled" padding={4} borderRadius={24} backgroundColor="#ffffff">
      <CardHeader paddingBottom={10}>
        <Box justifyContent="space-between" display={{md: 'flex', lg: 'flex'}}>
          <VStack alignItems="start" marginBottom={{base: 4}}>
            <Heading fontSize={24}>
              {t('todoshome.hello')} {auth?.userName}!
            </Heading>
            <Text fontSize={16} fontWeight={400} color="#7A869A">
              {today}
            </Text>
          </VStack>
          <Button
            onClick={handleAddTask}
            width={{base: 'full', md: 'unset', lg: 'unset'}}
            rightIcon={<IconAdd fill="#ffffff" />}
          >
            Add task
          </Button>
        </Box>
      </CardHeader>
      <CardBody>
        <>
          {isLoading || notCompletedTodos?.length > 0 ? (
            <TodoList
              listTitle={t('todolist.todo')}
              todos={notCompletedTodos}
              isLoading={isLoading}
              onRefreshList={() => fetchData()}
            />
          ) : (
            <Amazing />
          )}
          {(isLoading || completedTodos?.length > 0) && (
            <>
              <Spacer height={10} />
              <TodoList
                listTitle={t('todolist.completed')}
                todos={completedTodos}
                isLoading={isLoading}
                onRefreshList={() => fetchData()}
              />
            </>
          )}
        </>
      </CardBody>
    </Card>
  );
};

export default TodosHome;
