import { Wrap, WrapItem } from '@chakra-ui/react';
import { useGetAllCanvases } from '@drawhub/client/home/api';
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
      ) : (
        data?.map((canvas) => (
          <WrapItem key={canvas._id}>
            <CanvasCard {...canvas} preview={'https://skribbl.io/res/background.png'} />
          </WrapItem>
        ))
      )}
    </Wrap>
  );
}
