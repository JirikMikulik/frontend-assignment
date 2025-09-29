import {
  Button,
  HStack,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as IconDelete} from '../assets/icons/icon-delete.svg';
import {ReactComponent as IconEdit} from '../assets/icons/icon-edit.svg';
import {ReactComponent as IconMore} from '../assets/icons/icon-more.svg';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {complete, deleteTodo, incomplete} from '../service/todoService';
import Circle from './Circle';
import DeleteDialog from './DeleteDialog';

export interface TodoListItemProps {
  todo: Todo;
  completed?: boolean;
  onRefreshList: () => void;
}

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  createdAt: string;
};

const TodoListItem: React.FunctionComponent<TodoListItemProps> = ({todo, onRefreshList}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompletedChanging, setIsCompletedChanging] = useState(false);

  const handleEdit = (id: string) => {
    navigate(id);
  };

  const handleToggleCompleted = (todo: Todo) => {
    setIsCompletedChanging(true);
    if (todo.completed) {
      incomplete(axiosInstance, todo.id).then(() => {
        setIsCompletedChanging(false);
      });
    } else {
      complete(axiosInstance, todo.id).then(() => {
        setIsCompletedChanging(false);
      });
    }
    onRefreshList();
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTodo(axiosInstance, todo.id).then(() => {
      setIsDeleting(false);
      onRefreshList();
      onClose();
    });
  };

  return (
    <>
      <ListItem marginBottom={10}>
        <HStack justifyContent="space-between" align="start">
          <Circle checked={todo.completed} />
          <VStack
            gap={1}
            width="full"
            alignItems="start"
            onClick={() => handleEdit(todo.id)}
            _hover={{cursor: 'pointer'}}
          >
            <Text fontSize={18} fontWeight={500} align="left" marginTop={1}>
              {todo.title}
            </Text>
            <Text fontSize={16} fontWeight={400} color="#7A869A">
              {todo.description}
            </Text>
          </VStack>
          <Menu>
            <MenuButton as={Button} colorScheme="menu" disabled={isCompletedChanging}>
              {isCompletedChanging ? <Spinner /> : <IconMore fill="black" />}
            </MenuButton>
            <MenuList border="solid 1px #CAD1DE" borderRadius={16}>
              <MenuItem onClick={() => handleEdit(todo.id)}>
                <HStack>
                  <IconEdit />
                  <Text>{t('todo.edit')}</Text>
                </HStack>
              </MenuItem>
              <MenuItem onClick={() => handleToggleCompleted(todo)}>
                <HStack>
                  <IconEdit />
                  <Text>
                    {t(`todo.${todo && todo.completed ? 'setToIncomplete' : 'setToComplete'}`)}
                  </Text>
                  {isCompletedChanging && <Spinner />}
                </HStack>
              </MenuItem>
              <MenuItem onClick={onOpen}>
                <HStack>
                  <IconDelete fill="red" />
                  <Text color="red">{t('todo.delete')}</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </ListItem>
      <DeleteDialog
        isOpen={isOpen}
        isDeleting={isDeleting}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default TodoListItem;
