import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} m={5} flex={'0 1 auto'}>
      <Heading size={'lg'}>DrawHub</Heading>
      <ButtonGroup spacing={5} variant={'link'} colorScheme={'twitter'}>
        <Link to={'/'}>
          <Button>Home</Button>
        </Link>
        <Link to={'/credits'}>
          <Button>Credits</Button>
        </Link>
      </ButtonGroup>
    </Stack>
  );
}

export default Header;
