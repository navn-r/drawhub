import { Flex, HStack, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';

export function CanvasSkeleton() {
  return (
    <VStack borderRadius={20} bg={'gray.100'} p={5} spacing={5}>
      <HStack alignItems={'center'} w={'100%'}>
        <SkeletonCircle mr={2} />
        <Skeleton w={150} h={5} />
        <Flex flex={'1 1 auto'} />
        <Skeleton w={5} h={5} />
      </HStack>
      <Skeleton w={'300px'} h={'225px'} />
      <SkeletonText noOfLines={3} fontSize={'xl'} w={'100%'}></SkeletonText>
      <Flex justify={'space-between'} w={'100%'} alignItems={'center'}>
        <Skeleton w={10} h={5} />
        <SkeletonCircle />
      </Flex>
    </VStack>
  );
}

export default CanvasSkeleton;
