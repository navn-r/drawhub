import { Box, Flex, Heading } from '@chakra-ui/react';
import CreateCanvasButton from './create-canvas-button/create-canvas-button';
import { CanvasList } from './canvas-list/canvas-list';

/* eslint-disable-next-line */
export interface ClientHomeDashboardProps {}

export function ClientHomeDashboard(props: ClientHomeDashboardProps) {
  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Dashboard</Heading>
        <CreateCanvasButton />
      </Flex>
      <CanvasList />
    </Box>
  );
}

export default ClientHomeDashboard;
