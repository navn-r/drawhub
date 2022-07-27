import { Box, Code, Flex, Heading, Skeleton } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import CanvasBoard from './canvas-board/canvas-board';
import InviteUserButton from './invite-user-button.tsx/invite-user-button';
import { useGetCanvas } from '@drawhub/client/home/api';

/* eslint-disable-next-line */
export interface ClientHomeDrawProps {}

export function ClientHomeDraw(props: ClientHomeDrawProps) {
  const { canvasId } = useParams();
  const { isLoading, data } = useGetCanvas(canvasId ?? '');

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Heading>Draw</Heading>
        <Skeleton isLoaded={!isLoading}>{!data?.isPublic ? <InviteUserButton /> : null}</Skeleton>
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
