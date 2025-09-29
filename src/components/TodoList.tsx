import {Box, HStack, List, SkeletonCircle, SkeletonText, Text, VStack} from '@chakra-ui/react';
import TodoListItem, {Todo} from './TodoListItem';

export interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  listTitle: string;
  onRefreshList: () => void;
}

const TodoList: React.FunctionComponent<TodoListProps> = ({
  todos,
  isLoading,
  listTitle,
  onRefreshList,
}) => {
  const ListItemSkeleton = () => (
    <HStack width="full" gap={5}>
      <SkeletonCircle />
      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" width="full" />
    </HStack>
  );

  const ListSkeleton = () => (
    <VStack width="full" gap={10}>
      <ListItemSkeleton />
      <ListItemSkeleton />
    </VStack>
  );

  return (
    <VStack>
      <Box marginBottom={5} borderBottom="solid 1px #E8E9F0" width="full">
        <Text marginBottom={5} fontSize={20} fontWeight={600}>
          {listTitle}
        </Text>
      </Box>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        todos && (
          <List spacing={3} width="full">
            {todos?.map((todo) => (
              <TodoListItem todo={todo} onRefreshList={onRefreshList} key={todo.id} />
            ))}
          </List>
        )
      )}
    </VStack>
  );
};

export default TodoList;
