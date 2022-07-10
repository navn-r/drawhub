import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Flex,
  Button,
  Icon,
  Image,
  Text,
  DarkMode,
  useColorModeValue,
  Stack,
  Box,
  Center,
  WrapItem,
  Wrap,
  IconButton,
  useDisclosure,
  Popover,
  ButtonGroup,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';

import { MdPeople } from 'react-icons/md';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { ObjectUnsubscribedError } from 'rxjs';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface canvas {
  name: string;
  memberCount: number;
  contributors: string[];
}

const exampleCanvas = [
  {
    name: 'first canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvasfirst canvas',
    memberCount: 1,
    contributors: [
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
    ],
  },
  {
    name: 'first canvas',
    memberCount: 1,
    contributors: [
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
    ],
  },
  {
    name: 'first canvas',
    memberCount: 1,
    contributors: [
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
    ],
  },
  {
    name: 'first canvas',
    memberCount: 1,
    contributors: [
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
    ],
  },
  {
    name: 'first canvas',
    memberCount: 1,
    contributors: [
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
    ],
  },
  {
    name: 'first canvas',
    memberCount: 1,
    contributors: [
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
      'aryan.patel@mail.utoronto.ca',
      'Navinn.R@mail.utoronto.ca',
      'Samyak.metha@mail.utoronto.ca',
    ],
  },
];

const DeleteConfirmation = () => {
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <IconButton aria-label="Delete canvas" icon={<DeleteIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button colorScheme="red">Apply</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

const CreateCanvasCard = (props: any) => {
  const { name, contributors } = props;
  const boxBg = useColorModeValue('#edf2f7 !important', '#111c44 !important');
  const mainText = useColorModeValue('gray.800', 'white');
  const iconBox = useColorModeValue('gray.100', 'whiteAlpha.200');
  const iconColor = useColorModeValue('brand.200', 'white');

  return (
    <Flex
      borderRadius="20px"
      bg={boxBg}
      p="20px"
      h="345px"
      w={{ base: '315px', md: '345px' }}
      alignItems="center"
      direction="column"
    >
      <Flex w="100%" mb="18px">
        <Flex w="38px" h="38px" align="center" justify="center" borderRadius="50%" me="12px" bg={iconBox}>
          <Icon w="24px" h="24px" as={MdPeople} color={iconColor} />
        </Flex>
        <Text my="auto" fontWeight="600" color={mainText} textAlign="center" fontSize="xl" me="auto">
          Team
        </Text>
        <DeleteConfirmation />
        <IconButton aria-label="Edit canvas" icon={<EditIcon />} />
      </Flex>
      <Image src="https://i.ibb.co/KVwmVGW/Teams-Image.png" maxW="100%" borderRadius="20px" mb="10px" />
      <Text noOfLines={1} fontWeight="600" color={mainText} textAlign="start" fontSize="xl" w="100%">
        {name}
      </Text>
      <Flex mt="auto" justify="space-between" w="100%" align="center">
        <DarkMode>
          <Button
            borderRadius="9px"
            size="xs"
            colorScheme="green"
            color="green.00"
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Design
          </Button>
        </DarkMode>
        <AvatarGroup size="sm" max={4} color={iconColor} fontSize="9px" fontWeight="700">
          {contributors.map((item: string, i: number) => {
            return <Avatar name={item}></Avatar>;
          })}
        </AvatarGroup>
      </Flex>
    </Flex>
  );
};

export function DisplayCanvas() {
  return (
    <Wrap spacing="40px">
      {exampleCanvas.map((item, i) => {
        return (
          <WrapItem id={`${i}`}>
            <Center>
              <CreateCanvasCard name={item.name} contributors={item.contributors} />
            </Center>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
