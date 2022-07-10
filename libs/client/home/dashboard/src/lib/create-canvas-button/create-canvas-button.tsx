import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useCreateCanvas } from '@drawhub/client/home/api';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreateCanvasButtonProps {}

export function CreateCanvasButton(props: CreateCanvasButtonProps) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading } = useCreateCanvas();
  const [name, setName] = useState('');

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target?.value);
  };

  const createCanvas = async () => {
    const { _id: canvasId } = await mutateAsync({ name: name.trim() });
    navigate('draw/' + canvasId);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FaPlus />}
        bgGradient={'linear-gradient(90deg, rgba(131, 58, 180, .9) 0%, rgba(253, 29, 29, .9) 100%)'}
        colorScheme={'light'}
      >
        New
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Canvas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor={'name'}>Name</FormLabel>
              <Input
                id={'name'}
                type={'text'}
                placeholder={`eg. ${user?.given_name}'s new masterpeice`}
                value={name}
                onChange={onChangeName}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} colorScheme={'green'} mr={3} isDisabled={!name.trim()} onClick={createCanvas}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCanvasButton;
