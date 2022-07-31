import { useAuth0 } from '@auth0/auth0-react';
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useStitchCanvas } from '@drawhub/client/api';
import { useState } from 'react';
import { FaCodeBranch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface StitchCanvasButtonProps {
  canvasId: string;
}

export function StitchCanvasButton(props: StitchCanvasButtonProps) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading } = useStitchCanvas();
  const [name, setName] = useState('');
  const [value, setValue] = useState('1');

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target?.value);
  };

  const stitchCanvas = async () => {
    const { _id: canvasId } = await mutateAsync({ _id: props.canvasId, name: name.trim(), isPublic: value === '1' });
    navigate('draw/' + canvasId);
    onClose();
  };

  return (
    <>
      <IconButton aria-label={'Edit canvas'} icon={<FaCodeBranch />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stitch Canvas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <Alert status="info">
                <AlertIcon />
                You cannot stitch a stitched canvas again.
              </Alert>
              <FormControl isRequired>
                <FormLabel htmlFor={'name'}>Name</FormLabel>
                <Input
                  id={'name'}
                  type={'text'}
                  placeholder={`eg. ${user?.given_name}'s copied masterpiece`}
                  value={name}
                  onChange={onChangeName}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor={'name'}>Canvas Visibility</FormLabel>
                <Center>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack direction="row">
                      <Radio value="1">Public</Radio>
                      <Radio value="2">Private</Radio>
                    </Stack>
                  </RadioGroup>
                </Center>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} colorScheme={'green'} mr={3} isDisabled={!name.trim()} onClick={stitchCanvas}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StitchCanvasButton;
