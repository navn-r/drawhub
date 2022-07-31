import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useSaveContributor } from '@drawhub/client/api';
import { useState } from 'react';
import { FaPeopleCarry } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface InviteUserButtonProps {
  canvasId: string;
  contributors?: string[];
}

export function InviteUserButton(props: InviteUserButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading: isLoadingInvite } = useSaveContributor();
  const [email, setEmail] = useState('');

  const onChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target?.value);
  };

  const inviteEmail = async () => {
    await mutateAsync({ _id: props.canvasId, contributors: [email.trim()] });
    onClose();
  };

  const isInvalidEmail = props.contributors?.includes(email.trim());

  return (
    <>
      <Button
        onClick={() => {
          setEmail('');
          onOpen();
        }}
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
            <FormControl isRequired isInvalid={isInvalidEmail}>
              <FormLabel htmlFor={'name'}>Email</FormLabel>
              <Input
                id={'name'}
                type={'email'}
                placeholder={`eg. DreamworkMakesTheTeamwork@gmail.com`}
                value={email}
                onChange={onChangeId}
                required={true}
              />
              {isInvalidEmail ? <FormErrorMessage>Email cannot be an existing contributor.</FormErrorMessage> : null}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingInvite}
              colorScheme={'green'}
              mr={3}
              isDisabled={!email.trim() || isInvalidEmail}
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
