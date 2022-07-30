import { Box, Code, Flex, Heading, Skeleton } from '@chakra-ui/react';
import { useGetCanvas } from '@drawhub/client/api';
import { useParams } from 'react-router-dom';
import CanvasBoard from './canvas-board/canvas-board';
import { InviteUserButton } from '../invite-user-button/invite-user-button';

/* eslint-disable-next-line */
export interface DrawProps {}

export function Draw(props: DrawProps) {
  const { canvasId } = useParams();
  const { isLoading, data } = useGetCanvas(canvasId ?? '');

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Skeleton isLoaded={!isLoading && data}>
          <Heading>{data?.name ?? 'Draw'}</Heading>
          Canvas ID: <Code as={'pre'}>{canvasId}</Code>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          {!data?.isPublic && canvasId ? <InviteUserButton canvasId={canvasId} /> : null}
        </Skeleton>
      </Flex>
      {canvasId ? <CanvasBoard width={1250} height={800} canvasId={canvasId} /> : null}
    </Box>
  );
}

export default Draw;
