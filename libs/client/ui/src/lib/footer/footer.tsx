import { Button, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} p={5} flex={'0 1 auto'}>
      <Text>© 2022 Project The Cho-sen Ones. All rights reserved</Text>
      <Link to={'/credits'}>
        <Button variant={'link'} colorScheme={'black'}>
          Credits
        </Button>
      </Link>
    </Stack>
  );
}

export default Footer;
