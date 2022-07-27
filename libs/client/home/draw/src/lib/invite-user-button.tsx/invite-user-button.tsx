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
import { useCreateCanvas, useSaveContributor } from '@drawhub/client/home/api';
import { useState } from 'react';
import { FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface InviteUserButtonProps {
  canvasId: string;
}

export function InviteUserButton(props: InviteUserButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading } = useCreateCanvas();
  const { mutateAsync, isLoading: isLoadingInvite, isSuccess } = useSaveContributor();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target?.value);
  };

  const inviteEmail = async () => {
    await mutateAsync({ canvasId: props.canvasId, email: email.trim() });
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FaPeopleCarry />}
        bgGradient={'linear-gradient(90deg, rgb(255 89 148 / 90%) 0%, rgb(60 25 84 / 90%) 100%)'}
        colorScheme={'light'}
      >
        Invite
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite Collaborators</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor={'name'}>Email</FormLabel>
              <Input
                id={'name'}
                type={'email'}
                placeholder={`eg. DreamworkMakesTheTeamwork@gmail.com`}
                value={email}
                onChange={onChangeId}
                required={true}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingInvite}
              colorScheme={'green'}
              mr={3}
              isDisabled={!email.trim()}
              onClick={inviteEmail}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InviteUserButton;
