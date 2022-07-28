import { Box, Flex, Heading } from '@chakra-ui/react';
import { CanvasList } from './canvas-list/canvas-list';
import CreateCanvasButton from './create-canvas-button';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
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

export default Dashboard;
