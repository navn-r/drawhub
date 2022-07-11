import {
  AspectRatio,
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
import { useDeleteCanvas } from '@drawhub/client/home/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const DeleteCanvasPopover: React.FC<{ deleteCanvas: () => void }> = ({ deleteCanvas }) => {
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
            <Button colorScheme={'red'} onClick={deleteCanvas}>
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export interface CanvasCardProps {
  _id: string;
  name: string;
  contributors: string[];
  preview: string;
}

export function CanvasCard({ _id, name, contributors, preview }: CanvasCardProps) {
  const navigate = useNavigate();
  const { mutate } = useDeleteCanvas();

  return (
    <VStack borderRadius={20} bg={'gray.100'} p={5} spacing={5}>
      <HStack alignItems={'center'} w={'100%'}>
        <Icon boxSize={6} as={MdPeople} />
        <Text my={'auto'} fontWeight={600} fontSize={'xl'}>
          Team
        </Text>
        <Flex flex={'1 1 auto'} />
        <DeleteCanvasPopover deleteCanvas={() => mutate(_id)} />
        <IconButton aria-label={'Edit canvas'} icon={<FaEdit />} />
      </HStack>
      <AspectRatio w={'300px'} ratio={4 / 3}>
        <Image src={preview} borderRadius={10} />
      </AspectRatio>
      <Text noOfLines={1} fontWeight={600} fontSize={'xl'} w={'100%'}>
        {name}
      </Text>
      <Flex justify={'space-between'} w={'100%'} alignItems={'center'}>
        <Button onClick={() => navigate('draw/' + _id)} borderRadius={5} size={'xs'} colorScheme={'green'}>
          Draw
        </Button>
        <AvatarGroup size={'sm'} max={4}>
          {contributors.map((name) => (
            // No duplicate contributor emails
            <Avatar key={name} name={name} color={'white'} />
          ))}
        </AvatarGroup>
      </Flex>
    </VStack>
  );
}

export default CanvasCard;
