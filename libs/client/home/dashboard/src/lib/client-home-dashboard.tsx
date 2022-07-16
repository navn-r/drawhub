import { Box, Flex, Heading } from '@chakra-ui/react';
import CreateCanvasButton from './create-canvas-button/create-canvas-button';

/* eslint-disable-next-line */
export interface ClientHomeDashboardProps {}

export function ClientHomeDashboard(props: ClientHomeDashboardProps) {
  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Dashboard</Heading>
        <CreateCanvasButton />
      </Flex>
      <Heading size={'xs'} as={'h5'} fontWeight={600} color={'gray.600'}>
        MY CANVASSES
      </Heading>
    </Box>
  );
}

export default ClientHomeDashboard;
