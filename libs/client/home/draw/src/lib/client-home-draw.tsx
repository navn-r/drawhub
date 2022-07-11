import { Box, Code, Flex, Heading, Text } from '@chakra-ui/react';
import { useSocket } from '@drawhub/client/home/api';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ClientHomeDrawProps {}

export function ClientHomeDraw(props: ClientHomeDrawProps) {
  const { canvasId } = useParams();
  const { isConnected } = useSocket('example-event');

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Draw</Heading>
      </Flex>
      Data: <Code as={'pre'}>{canvasId}</Code>
      <Text>Connection: {JSON.stringify(isConnected)}</Text>
    </Box>
  );
}

export default ClientHomeDraw;
