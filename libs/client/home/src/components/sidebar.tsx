import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Link, useMatch } from 'react-router-dom';

const SidebarItem = ({ name, path, special }: { name: string; path: string; special?: boolean }) => {
  const selected = useMatch('/home/' + path);

  if (!selected && special) {
    return null;
  }

  return (
    <Flex
      w={'80%'}
      ml={'10%'}
      justifyContent={'flex-end'}
      p={4}
      borderLeftRadius={50}
      bgGradient={
        special
          ? 'linear-gradient(90deg, rgba(131, 58, 180, .9) 0%, rgba(253, 29, 29, .9) 100%)'
          : selected
          ? 'linear-gradient(99deg,rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118% )'
          : ''
      }
    >
      {special ? (
        <Text fontWeight={600} color={'white'}>
          {name}
        </Text>
      ) : (
        <Link to={path}>
          <Text fontWeight={600} color={selected ? 'white' : 'black'}>
            {name}
          </Text>
        </Link>
      )}
    </Flex>
  );
};

/* eslint-disable-next-line */
export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  const { user } = useAuth0();

  return (
    <VStack w={'3xs'} borderRadius={5} pt={2} pb={2} pl={2} spacing={2} bgColor={'gray.100'} alignItems={'flex-end'}>
      <HStack
        spacing={2}
        w={'97%'}
        p={2}
        pb={4}
        mb={2}
        mr={'auto'}
        borderBottomWidth={1}
        borderBottomColor={'gray.400'}
      >
        <Avatar name={user?.name} src={user?.picture} size={'sm'} />
        <Text fontWeight={600}>@{user?.given_name?.toLowerCase()}</Text>
      </HStack>
      <SidebarItem name={'Draw'} path={'draw/*'} special />
      <SidebarItem name={'Dashboard'} path={''} />
      <SidebarItem name={'Premium'} path={'premium'} />
    </VStack>
  );
}

export default Sidebar;
