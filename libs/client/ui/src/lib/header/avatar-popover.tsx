import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  AvatarBadge,
  Button,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { TbLogout } from 'react-icons/tb';

export const AvatarPopover: React.FC = () => {
  const { user, logout, isLoading, isAuthenticated } = useAuth0();

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar as={'button'} name={user?.name} src={user?.picture} size={'sm'} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <Stack spacing={0} alignItems={'center'}>
            <Avatar name={user?.name} src={user?.picture} w={'80px'} h={'80px'} mb={4} mt={4}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text as={'strong'}>{user?.name}</Text>
            <Text>{user?.email}</Text>
          </Stack>
        </PopoverHeader>
        <PopoverFooter display={'flex'} justifyContent={'center'}>
          <Button onClick={() => logout()} leftIcon={<TbLogout />} colorScheme="red" mb={2} mt={2}>
            Log Out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarPopover;
