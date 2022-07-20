import { Center, Image, Text, VStack } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface EmptyDisplayProps {}

export function EmptyDisplay(props: EmptyDisplayProps) {
  return (
    <Center w={'100%'}>
      <VStack spacing={10} align={'center'} mt={'10'}>
        <Image w={'2xs'} alt={'team drawing'} src={'/assets/undraw_void.svg'} />
        <Text fontSize={'xl'}>There's nothing here.</Text>
      </VStack>
    </Center>
  );
}

export default EmptyDisplay;
