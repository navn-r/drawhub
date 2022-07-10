import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface ClientHomeDashboardProps {}

export function ClientHomeDashboard(props: ClientHomeDashboardProps) {
  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Dashboard</Heading>
        <Button
          leftIcon={<FaPlus />}
          bgGradient={'linear-gradient(90deg, rgba(131, 58, 180, .9) 0%, rgba(253, 29, 29, .9) 100%)'}
          colorScheme={'light'}
        >
          New
        </Button>
      </Flex>
      <Heading size={'xs'} as={'h5'} fontWeight={600} color={'gray.600'}>
        MY CANVASSES
      </Heading>
    </Box>
  );
}

export default ClientHomeDashboard;
