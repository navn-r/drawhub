import { useAuth0 } from '@auth0/auth0-react';
import { Heading, HStack, Stack } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import AvatarPopover from './avatar-popover';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const onNavigateHome = () => {
    if (isLoading) {
      return;
    }

    navigate(isAuthenticated ? '/home' : '/');
  };

  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} m={5} flex={'0 1 auto'}>
      <Heading as={'button'} onClick={onNavigateHome} size={'lg'}>
        DrawHub
      </Heading>
      <HStack spacing={5} alignItems={'center'}>
        <AvatarPopover />
      </HStack>
    </Stack>
  );
}

export default Header;
