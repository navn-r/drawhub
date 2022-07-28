import { Box, Code, Flex, Heading, Skeleton } from '@chakra-ui/react';
import { useGetCanvas } from '@drawhub/client/home/api';
import { useParams } from 'react-router-dom';
import CanvasBoard from './canvas-board/canvas-board';

/* eslint-disable-next-line */
export interface ClientHomeDrawProps {}

export function ClientHomeDraw(props: ClientHomeDrawProps) {
  const { canvasId } = useParams();
  const { isLoading, data } = useGetCanvas(canvasId);

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Skeleton isLoaded={!isLoading && data}>
          <Heading>{data?.name ?? 'Draw'}</Heading>
          Canvas ID: <Code as={'pre'}>{canvasId}</Code>
        </Skeleton>
      </Flex>
      {canvasId ? <CanvasBoard width={1250} height={800} canvasId={canvasId} /> : null}
    </Box>
  );
}

export default ClientHomeDraw;
