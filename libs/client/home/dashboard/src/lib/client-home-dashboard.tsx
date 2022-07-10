import { Box, Flex, Heading } from '@chakra-ui/react';
import CreateCanvasButton from './create-canvas-button/create-canvas-button';
import { DisplayCanvas } from './display-canvas/display-canvas';

/* eslint-disable-next-line */
export interface ClientHomeDashboardProps {}

export function ClientHomeDashboard(props: ClientHomeDashboardProps) {
  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Dashboard</Heading>
        <CreateCanvasButton />
      </Flex>
      <DisplayCanvas />
    </Box>
  );
}

export default ClientHomeDashboard;
