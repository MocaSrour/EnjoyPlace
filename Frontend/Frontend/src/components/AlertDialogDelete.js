import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
  } from '@chakra-ui/react';
import { useRef } from 'react';

function AlertDialogDelete( { onConfirm, title, message }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const handleConfirm = () => {
      onConfirm()
      onClose()
    }
    return (
      <>
        <label colorScheme='red' onClick={onOpen}>
          {title}
        </label>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {title}
              </AlertDialogHeader>
  
              <AlertDialogBody>
               {message}
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={handleConfirm} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  export default AlertDialogDelete;