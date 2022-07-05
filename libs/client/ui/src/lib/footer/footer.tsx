import { Stack, Text } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} p={5} flex={'0 1 auto'}>
      <Text>© 2022 Project The Cho-sen Ones. All rights reserved</Text>
    </Stack>
  );
}

export default Footer;
