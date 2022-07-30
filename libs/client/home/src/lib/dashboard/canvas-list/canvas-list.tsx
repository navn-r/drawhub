import { useAuth0 } from '@auth0/auth0-react';
import { Heading, HStack, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useGetAllCanvases } from '@drawhub/client/api';
import { EmptyDisplay } from '@drawhub/client/ui';
import { useMemo } from 'react';
import { CanvasCard, CanvasCardProps } from './canvas-card';
import CanvasSkeleton from './canvas-skeleton';

const CanvasSkeletonList: React.FC = () => (
  <HStack spacing={10}>
    <CanvasSkeleton />
    <CanvasSkeleton />
    <CanvasSkeleton />
  </HStack>
);

const CardWithPreview = (props: Omit<CanvasCardProps, 'preview'>) => {
  const preview = process.env['NX_AWS_URL'] + props._id + '.png?dummy=' + Date.now();

  return (
    <WrapItem>
      <CanvasCard {...props} preview={preview} />
    </WrapItem>
  );
};

export function CanvasList() {
  const { user } = useAuth0();
  const { isLoading, data, isRefetching } = useGetAllCanvases();

  const publicData = useMemo(() => {
    if (!data?.length) {
      return [];
    }
    return data.filter(({ isPublic }) => isPublic);
  }, [data]);

  const privateData = useMemo(() => {
    if (!data?.length) {
      return [];
    }
    return data.filter(({ isPublic, contributors }) => !isPublic && contributors.includes(user?.email ?? ''));
  }, [data, user]);

  return isLoading || isRefetching ? (
    <CanvasSkeletonList />
  ) : privateData.length || publicData.length ? (
    <VStack spacing={5} align="flex-start">
      {publicData.length && (
        <VStack spacing={5} align="flex-start">
          <Heading size={'lg'}>Public</Heading>
          <Wrap spacing={10}>
            {publicData.map((canvas) => (
              <CardWithPreview key={canvas._id} {...canvas} />
            ))}
          </Wrap>
        </VStack>
      )}
      {privateData.length && (
        <VStack spacing={5} align="flex-start">
          <Heading size={'lg'}>Private</Heading>
          <Wrap spacing={10}>
            {privateData.map((canvas, i) => (
              <CardWithPreview key={canvas._id} {...canvas} />
            ))}
          </Wrap>
        </VStack>
      )}
    </VStack>
  ) : (
    <EmptyDisplay />
  );
}
