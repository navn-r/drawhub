import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Code, Flex, Heading, Skeleton } from '@chakra-ui/react';
import { useGetCanvas } from '@drawhub/client/api';
import { useParams } from 'react-router-dom';
import { InviteUserButton } from '../invite-user-button/invite-user-button';
import CanvasBoard from './canvas-board/canvas-board';

/* eslint-disable-next-line */
export interface DrawProps {}

export function Draw(props: DrawProps) {
  const { canvasId } = useParams();
  const { isLoading, data } = useGetCanvas(canvasId ?? '');

  if (data?.errors?.length) {
    return (
      <Box w={'100%'} h={'10%'}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>403 Forbidden.</AlertTitle>
          <AlertDescription>You do not have access to the private canvas.</AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={5}>
        <Skeleton isLoaded={!isLoading}>
          <Heading>{data?.canvas?.name ?? 'Draw'}</Heading>
          Canvas ID: <Code as={'pre'}>{canvasId}</Code>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          {!data?.canvas?.isPublic && canvasId ? <InviteUserButton canvasId={canvasId} /> : null}
        </Skeleton>
      </Flex>
      {canvasId ? <CanvasBoard width={1250} height={800} canvasId={canvasId} /> : null}
    </Box>
  );
}

export default Draw;
