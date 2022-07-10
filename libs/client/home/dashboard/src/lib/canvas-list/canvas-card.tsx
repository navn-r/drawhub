import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';

const DeleteCanvasPopover = () => {
  return (
    <Popover placement={'top-start'}>
      <PopoverTrigger>
        <IconButton aria-label={'Delete canvas'} icon={<FaTrash />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight={600}>Delete Canvas</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to delete this canvas? This action is
          <Text as={'span'} fontWeight={600}>
            {' '}
            irreversable.
          </Text>
        </PopoverBody>
        <PopoverFooter display={'flex'} justifyContent={'flex-end'}>
          <ButtonGroup size={'sm'}>
            <Button colorScheme={'red'}>Delete</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export interface CanvasCardProps {
  name: string;
  contributors: string[];
  preview: string;
}

export function CanvasCard({ name, contributors, preview }: CanvasCardProps) {
  return (
    <VStack borderRadius={20} bg={'gray.100'} p={5} spacing={5}>
      <HStack alignItems={'center'} w={'100%'}>
        <Icon boxSize={6} as={MdPeople} />
        <Text my={'auto'} fontWeight={600} fontSize={'xl'}>
          Team
        </Text>
        <Flex flex={'1 1 auto'} />
        <DeleteCanvasPopover />
        <IconButton aria-label={'Edit canvas'} icon={<FaEdit />} />
      </HStack>
      <Image src={preview} borderRadius={10} />
      <Text noOfLines={1} fontWeight={600} fontSize={'xl'} w={'100%'}>
        {name}
      </Text>
      <Flex justify={'space-between'} w={'100%'} alignItems={'center'}>
        <Button borderRadius={5} size={'xs'} colorScheme={'green'}>
          Design
        </Button>
        <AvatarGroup size={'sm'} max={4}>
          {contributors.map((name) => (
            // No duplicate contributor emails
            <Avatar key={name} name={name} color={'white'}></Avatar>
          ))}
        </AvatarGroup>
      </Flex>
    </VStack>
  );
}

export default CanvasCard;
