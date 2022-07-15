import {
  Box,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { FaEraser, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

export interface CanvasInputProps {
  width: number;
  clearCanvas: () => void;
  setBrushColor: Dispatch<SetStateAction<string>>;
  setBrushSize: Dispatch<SetStateAction<number>>;
}

/**
 * Pre-defined colors
 *
 * @see https://skribbl.io
 */
const COLORS = [
  '#FFFFFF',
  '#C1C1C1',
  '#EF130B',
  '#FF7100',
  '#FFE400',
  '#00CC00',
  '#00B2FF',
  '#231FD3',
  '#A300BA',
  '#D37CAA',
  '#A0522D',
  '#000000',
  '#4C4C4C',
  '#740B07',
  '#C23800',
  '#E8A200',
  '#005510',
  '#00569E',
  '#0E0865',
  '#550069',
  '#A75574',
  '#63300D',
];

export function CanvasInput({ width, setBrushColor, setBrushSize, clearCanvas }: CanvasInputProps) {
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const setColor = useCallback(
    (color: string) => {
      setBrushColor(color);

      const colorPicker = colorPickerRef?.current;
      if (colorPicker) {
        colorPicker.value = color;
      }
    },
    [setBrushColor]
  );

  return (
    <HStack spacing={10} w={width + 11} bg={'gray.100'} p={5} borderRadius={5} justify={'center'}>
      <IconButton
        colorScheme={'pink'}
        onClick={() => setColor(COLORS[0])}
        size={'lg'}
        icon={<FaEraser />}
        aria-label={'Eraser select'}
      />
      <Input
        ref={colorPickerRef}
        type={'color'}
        w={55}
        h={55}
        padding={0}
        border={'none'}
        outline={'none'}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setBrushColor(event.target.value)}
      />
      <SimpleGrid columns={11}>
        {COLORS.map((color) => (
          <Box as={'button'} w={6} h={6} key={color} bg={color} onClick={() => setColor(color)} />
        ))}
      </SimpleGrid>
      <Slider
        min={1}
        max={50}
        defaultValue={1}
        w={'30%'}
        onChangeEnd={(val: SetStateAction<number>) => setBrushSize(val)}
      >
        <SliderTrack bg={'gray.400'}>
          <SliderFilledTrack
            bgGradient={'linear-gradient(90deg, rgba(131, 58, 180, .9) 0%, rgba(253, 29, 29, .9) 100%)'}
          />
        </SliderTrack>
        <SliderThumb boxSize={8}>
          <Box boxSize={4} color={'gray.500'} as={FaPencilAlt} />
        </SliderThumb>
      </Slider>
      <IconButton
        colorScheme={'red'}
        onClick={clearCanvas}
        size={'lg'}
        icon={<FaTrashAlt />}
        aria-label={'Clear canvas'}
      />
    </HStack>
  );
}

export default CanvasInput;
