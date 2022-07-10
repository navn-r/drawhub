import { Box, Code, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ClientHomeDrawProps {}

export function ClientHomeDraw(props: ClientHomeDrawProps) {
  const { canvasId } = useParams();

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Draw</Heading>
      </Flex>
      Data: <Code as={'pre'}>{canvasId}</Code>
    </Box>
  );
}

export default ClientHomeDraw;
