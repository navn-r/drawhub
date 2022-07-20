import { Wrap, WrapItem } from '@chakra-ui/react';
import { useGetAllCanvases } from '@drawhub/client/home/api';
import { EmptyDisplay } from '@drawhub/client/ui';
import CanvasCard from './canvas-card';
import CanvasSkeleton from './canvas-skeleton';

const CanvasSkeletonList: React.FC = () => (
  <>
    <WrapItem>
      <CanvasSkeleton />
    </WrapItem>
    <WrapItem>
      <CanvasSkeleton />
    </WrapItem>
    <WrapItem>
      <CanvasSkeleton />
    </WrapItem>
  </>
);

export function CanvasList() {
  const { isLoading, data, isRefetching } = useGetAllCanvases();

  return (
    <Wrap spacing={10}>
      {isLoading || isRefetching ? (
        <CanvasSkeletonList />
      ) : data?.length ? (
        data?.map((canvas) => {
          // Prevents canvas preview from being cached
          const preview = process.env['NX_AWS_URL'] + canvas._id + '.png?dummy=' + Date.now();

          return (
            <WrapItem key={canvas._id}>
              <CanvasCard {...canvas} preview={preview} />
            </WrapItem>
          );
        })
      ) : (
        <EmptyDisplay />
      )}
    </Wrap>
  );
}
