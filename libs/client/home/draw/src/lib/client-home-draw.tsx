import { Box, Code, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import CanvasBoard from './canvas-board/canvas-board';

/* eslint-disable-next-line */
export interface ClientHomeDrawProps {}

export function ClientHomeDraw(props: ClientHomeDrawProps) {
  const { canvasId } = useParams();

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Draw</Heading>
      </Flex>
      {canvasId ? (
        <>
          Data: <Code as={'pre'}>{canvasId}</Code>
          <CanvasBoard width={1250} height={800} canvasId={canvasId} />
        </>
      ) : null}
    </Box>
  );
}

export default ClientHomeDraw;
