import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';

export interface DeleteDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({isOpen, isDeleting, onClose, onDelete}) => {
  const {t} = useTranslation();
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('todo.deleteTitle')}
          </AlertDialogHeader>
          <AlertDialogBody>{t('todo.areYouSure')}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t('todo.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              ml={3}
              rightIcon={isDeleting ? <Spinner color="white" /> : <></>}
            >
              {t('todo.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteDialog;
